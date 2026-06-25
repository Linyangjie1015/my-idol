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
    var orderId = (body.orderId || body.order_no || '').trim();

    if (!orderId) {
      return res.status(200).json({ success: false, message: '\u8BF7\u8F93\u5165\u8BA2\u5355\u53F7' });
    }

    if (!process.env.AFDIAN_TOKEN || !process.env.AFDIAN_USER_ID) {
      return res.status(200).json({ success: false, message: '\u670D\u52A1\u914D\u7F6E\u9519\u8BEF' });
    }

    var ts = Math.floor(Date.now() / 1000).toString();
    var params = JSON.stringify({ out_trade_no: orderId });
    var signStr = process.env.AFDIAN_TOKEN + 'params' + params + 'ts' + ts + 'user_id' + process.env.AFDIAN_USER_ID;
    var sign = md5Hex(signStr);

    try {
      var afdianResp = await fetch('https://afdian.net/api/open/query-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'MyIdol/2.0'
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
        return res.status(200).json({ success: false, message: '\u8BA2\u5355\u67E5\u8BE2\u5931\u8D25\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5' });
      }

      var orders = (afdianData.data && afdianData.data.list) ? afdianData.data.list : [];
      if (orders.length === 0) {
        return res.status(200).json({ success: false, message: '\u672A\u627E\u5230\u8BE5\u8BA2\u5355\uFF0C\u8BF7\u786E\u8BA4\u8BA2\u5355\u53F7' });
      }

      var order = orders[0];

      if (order.status !== 2) {
        return res.status(200).json({ success: false, message: '\u8BA2\u5355\u5C1A\u672A\u5B8C\u6210\u652F\u4ED8' });
      }

      var tier = mapAfdianOrder(order);

      var SUPABASE_URL = process.env.SUPABASE_URL;
      var SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY;
      if (SUPABASE_URL && SUPABASE_KEY) {
        try {
          var checkResp = await fetch(SUPABASE_URL + '/rest/v1/payments?order_id=eq.' + encodeURIComponent(orderId) + '&select=order_id', {
            headers: {
              'apikey': SUPABASE_KEY,
              'Authorization': 'Bearer ' + SUPABASE_KEY
            }
          });
          var existing = await checkResp.json();
          var payload = {
            order_id: orderId,
            product_type: tier.key,
            amount: parseInt(parseFloat(order.total_amount || '0') * 100),
            status: 'paid'
          };
          if (!existing || existing.length === 0) {
            await fetch(SUPABASE_URL + '/rest/v1/payments', {
              method: 'POST',
              headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': 'Bearer ' + SUPABASE_KEY,
                'Content-Type': 'application/json',
                'Prefer': 'return=minimal'
              },
              body: JSON.stringify(payload)
            });
          }
        } catch (saveErr) {}
      }

      return res.status(200).json({
        success: true,
        tier: tier.key,
        tierName: tier.name,
        amount: parseFloat(order.total_amount || '0'),
        orderNo: orderId,
        source: 'afdian'
      });

    } catch (afdianErr) {
      var SUPABASE_URL2 = process.env.SUPABASE_URL;
      var SUPABASE_KEY2 = process.env.SUPABASE_SERVICE_KEY;
      if (SUPABASE_URL2 && SUPABASE_KEY2) {
        var dbResp = await fetch(SUPABASE_URL2 + '/rest/v1/payments?order_id=eq.' + encodeURIComponent(orderId) + '&select=order_id,product_type,amount,status', {
          headers: {
            'apikey': SUPABASE_KEY2,
            'Authorization': 'Bearer ' + SUPABASE_KEY2
          }
        });
        var dbData = await dbResp.json();
        if (dbData && dbData.length > 0) {
          var row = dbData[0];
          if (row.status === 'paid') {
            return res.status(200).json({
              success: true,
              tier: row.product_type,
              tierName: getTierName(row.product_type),
              amount: (row.amount || 0) / 100,
              orderNo: row.order_id,
              source: 'database'
            });
          }
        }
      }
      return res.status(200).json({ success: false, message: '\u8BA2\u5355\u6682\u672A\u540C\u6B65\uFF0C\u8BF7\u7B491-2\u5206\u949F\u540E\u91CD\u8BD5' });
    }

  } catch (e) {
    return res.status(200).json({ success: false, message: '\u9A8C\u8BC1\u5931\u8D25\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5' });
  }
}

function mapAfdianOrder(order) {
  var amount = parseFloat(order.total_amount || '0');
  if (amount >= 9 && amount < 20) return { key: 'monthly', name: '\u6708\u5EA6\u4F1A\u5458' };
  if (amount >= 20 && amount < 50) return { key: 'quarterly', name: '\u5B63\u5EA6\u4F1A\u5458' };
  if (amount >= 50) return { key: 'yearly', name: '\u5E74\u5EA6\u4F1A\u5458' };
  return { key: 'monthly', name: '\u6708\u5EA6\u4F1A\u5458' };
}

function getTierName(productType) {
  if (productType === 'yearly') return '\u5E74\u5EA6\u4F1A\u5458';
  if (productType === 'quarterly') return '\u5B63\u5EA6\u4F1A\u5458';
  if (productType === 'monthly') return '\u6708\u5EA6\u4F1A\u5458';
  if (productType === 'premium') return '\u5E74\u5EA6\u4F1A\u5458';
  if (productType === 'advanced') return '\u5B63\u5EA6\u4F1A\u5458';
  if (productType === 'basic') return '\u6708\u5EA6\u4F1A\u5458';
  return productType;
}

function md5Hex(str) {
  var crypto = require('crypto');
  return crypto.createHash('md5').update(str).digest('hex');
}
