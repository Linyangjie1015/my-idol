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
    // Afdian webhook: just acknowledge receipt
    // Order verification is done via /api/verify-order calling Afdian API directly
    if (body.data && body.data.order && body.data.order.status === 2) {
      // Order confirmed by Afdian - we just ack
    }
    return res.status(200).json({ ec: 200, em: '' });
  } catch (e) {
    return res.status(200).json({ ec: 200, em: '' });
  }
}
