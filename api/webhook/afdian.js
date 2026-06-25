export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(200).json({ ec: 200, em: '' });
  }

  try {
    var body = req.body || {};
    var order = (body.data && body.data.order) ? body.data.order : null;

    if (!order) {
      return res.status(200).json({ ec: 200, em: '' });
    }

    if (order.status === 2) {
      var SUPABASE_URL = process.env.SUPABASE_URL;
      var SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY;

      if (SUPABASE_URL && SUPABASE_KEY) {
        var tier = mapAfdianOrder(order);
        var orderNo = order.out_trade_no || '';
        var amount = order.total_amount || '0';
        var productType = tier ? tier.key : 'unknown';

        var checkResp = await fetch(SUPABASE_URL + '/rest/v1/payments?order_id=eq.' + encodeURIComponent(orderNo) + '&select=order_id', {
          headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': 'Bearer ' + SUPABASE_KEY
          }
        });
        var existing = await checkResp.json();

        var payload = {
          order_id: orderNo,
          product_type: productType,
          amount: parseInt(parseFloat(amount) * 100),
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
        } else {
          await fetch(SUPABASE_URL + '/rest/v1/payments?order_id=eq.' + encodeURIComponent(orderNo), {
            method: 'PATCH',
            headers: {
              'apikey': SUPABASE_KEY,
              'Authorization': 'Bearer ' + SUPABASE_KEY,
              'Content-Type': 'application/json',
              'Prefer': 'return=minimal'
            },
            body: JSON.stringify({
              status: 'paid',
              product_type: productType,
              amount: parseInt(parseFloat(amount) * 100)
            })
          });
        }
      }
    }

    return res.status(200).json({ ec: 200, em: '' });
  } catch (e) {
    return res.status(200).json({ ec: 200, em: '' });
  }
}

function mapAfdianOrder(order) {
  var amount = parseFloat(order.total_amount || '0');
  if (amount >= 9 && amount < 20) return { key: 'monthly', name: '\u6708\u5EA6\u4F1A\u5458' };
  if (amount >= 20 && amount < 50) return { key: 'quarterly', name: '\u5B63\u5EA6\u4F1A\u5458' };
  if (amount >= 50) return { key: 'yearly', name: '\u5E74\u5EA6\u4F1A\u5458' };
  return { key: 'monthly', name: '\u6708\u5EA6\u4F1A\u5458' };
}
