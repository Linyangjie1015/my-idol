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
    var account = (body.account || '').trim();

    if (!orderNo) {
      return res.status(200).json({ success: false, message: '请输入订单号' });
    }

    if (!process.env.AFDIAN_TOKEN || !process.env.AFDIAN_USER_ID) {
      return res.status(200).json({ success: false, message: '系统配置异常，请联系客服' });
    }

    // Call Afdian API to verify order
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
      })
    });

    var afdianData = await afdianResp.json();

    if (afdianData.ec !== 200) {
      return res.status(200).json({ success: false, message: '订单查询失败，请检查订单号' });
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

    return res.status(200).json({
      success: true,
      tier: tier.key,
      tierName: tier.name,
      amount: parseFloat(order.total_amount),
      orderNo: order.out_trade_no
    });

  } catch (e) {
    // Return more specific error for debugging
    return res.status(200).json({ success: false, message: '验证失败: ' + e.message });
  }
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
