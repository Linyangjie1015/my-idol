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

    // Only process paid orders (status=2 means paid)
    if (order.status === 2) {
      var SUPABASE_URL = process.env.SUPABASE_URL;
      var SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY;

      if (SUPABASE_URL && SUPABASE_KEY) {
        var tier = getTier(order.total_amount, order.plan_id || '');
        var orderNo = order.out_trade_no || '';
        var amount = order.total_amount || '0';
        var productType = tier ? tier.key : 'unknown';

        // Check if order already exists
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
          // Insert new order (user_id omitted = null, avoids FK constraint)
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
          // Update existing order
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

    // Always return 200 to Afdian
    return res.status(200).json({ ec: 200, em: '' });
  } catch (e) {
    // Still return 200 to prevent Afdian from retrying unnecessarily
    return res.status(200).json({ ec: 200, em: '' });
  }
}

function getTier(amount, planId) {
  var a = parseFloat(amount || '0');
  if (a >= 15) return { key: 'premium', name: '完整版' };
  if (a >= 8) return { key: 'advanced', name: '进阶版' };
  if (a >= 5) return { key: 'basic', name: '基础版' };
  return { key: 'unknown', name: '未知档位' };
}
