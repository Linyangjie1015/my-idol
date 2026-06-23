export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    var body = req.body || {};
    var orderNo = (body.order_no || '').trim();

    if (!orderNo) {
      return res.status(200).json({ success: false, message: '请输入订单号' });
    }

    var SUPABASE_URL = process.env.SUPABASE_URL;
    var SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY;

    // Step 1: Check Supabase first (works always, no network issue)
    if (SUPABASE_URL && SUPABASE_KEY) {
      var dbResp = await fetch(SUPABASE_URL + '/rest/v1/payments?order_id=eq.' + encodeURIComponent(orderNo) + '&select=order_id,product_type,amount,status', {
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': 'Bearer ' + SUPABASE_KEY
        }
      });
      var dbData = await dbResp.json();

      if (dbData && dbData.length > 0) {
        var row = dbData[0];
        if (row.status === 'paid') {
          var tierName = getTierName(row.product_type);
          return res.status(200).json({
            success: true,
            tier: row.product_type,
            tierName: tierName,
            amount: (row.amount || 0) / 100,
            orderNo: row.order_id,
            source: 'database'
          });
        } else {
          return res.status(200).json({ success: false, message: '订单尚未完成支付' });
        }
      }
    }

    // Step 2: Not in Supabase, try Afdian API directly (may fail due to network)
    if (!process.env.AFDIAN_TOKEN || !process.env.AFDIAN_USER_ID) {
      return res.status(200).json({ success: false, message: '订单未找到，请确认订单号或联系客服' });
    }

    try {
      var ts = Math.floor(Date.now() / 1000).toString();
      var params = JSON.stringify({ out_trade_no: orderNo });
      var signStr = process.env.AFDIAN_TOKEN + 'params' + params + 'ts' + ts + 'user_id' + process.env.AFDIAN_USER_ID;
      var sign = md5Hex(signStr);

      var afdianResp = await fetch('https://afdian.net/api/open/query-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'MyIdol/1.0'
        },
        body: JSON.stringify({
          user_id: process.env.AFDIAN_USER_ID,
          params: params,
          ts: ts,
          sign: sign
        }),
        signal: AbortSignal.timeout(8000)
      });

      var afdianData = await afdianResp.json();

      if (afdianData.ec !== 200) {
        return res.status(200).json({ success: false, message: '订单查询失败，请稍后再试或联系客服' });
      }

      var orders = (afdianData.data && afdianData.data.list) ? afdianData.data.list : [];
      if (orders.length === 0) {
        return res.status(200).json({ success: false, message: '未找到该订单，请确认订单号是否正确' });
      }

      var order = orders[0];

      if (order.status !== 2) {
        return res.status(200).json({ success: false, message: '订单尚未完成支付' });
      }

      var tier = getTier(order.total_amount, order.plan_id || '');
      if (!tier) {
        return res.status(200).json({ success: false, message: '订单金额不匹配任何档位' });
      }

      // Save to Supabase for future lookups
      if (SUPABASE_URL && SUPABASE_KEY) {
        try {
          await fetch(SUPABASE_URL + '/rest/v1/payments', {
            method: 'POST',
            headers: {
              'apikey': SUPABASE_KEY,
              'Authorization': 'Bearer ' + SUPABASE_KEY,
              'Content-Type': 'application/json',
              'Prefer': 'return=minimal'
            },
            body: JSON.stringify({
              order_id: order.out_trade_no,
              user_id: 0,
              product_type: tier.key,
              amount: parseInt(parseFloat(order.total_amount) * 100),
              status: 'paid'
            })
          });
        } catch (saveErr) {
          // Ignore save errors, verification still succeeds
        }
      }

      return res.status(200).json({
        success: true,
        tier: tier.key,
        tierName: tier.name,
        amount: parseFloat(order.total_amount),
        orderNo: order.out_trade_no,
        source: 'afdian'
      });

    } catch (afdianErr) {
      // Afdian API unreachable (expected from Vercel overseas)
      return res.status(200).json({
        success: false,
        message: '订单验证暂时不可用，请联系客服手动确认（微信：LYJ10152008）'
      });
    }

  } catch (e) {
    return res.status(200).json({ success: false, message: '验证失败，请稍后再试' });
  }
}

function getTierName(productType) {
  if (productType === 'premium') return '完整版';
  if (productType === 'advanced') return '进阶版';
  if (productType === 'basic') return '基础版';
  return productType;
}

function getTier(amount, planId) {
  var a = parseFloat(amount || '0');
  if (a >= 15) return { key: 'premium', name: '完整版' };
  if (a >= 8) return { key: 'advanced', name: '进阶版' };
  if (a >= 5) return { key: 'basic', name: '基础版' };
  return null;
}

function md5Hex(str) {
  var crypto = require('crypto');
  return crypto.createHash('md5').update(str).digest('hex');
}
