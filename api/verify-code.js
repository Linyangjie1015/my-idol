export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    var body = req.body || {};
    var code = (body.code || '').trim().toUpperCase();

    if (!code) return res.status(200).json({ valid: false, reason: 'empty' });

    var SUPABASE_URL = process.env.SUPABASE_URL;
    var SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

    var resp = await fetch(SUPABASE_URL + '/rest/v1/invite_requests?code=eq.' + encodeURIComponent(code) + '&select=email,code', {
      headers: {
        'apikey': SUPABASE_SERVICE_KEY,
        'Authorization': 'Bearer ' + SUPABASE_SERVICE_KEY
      }
    });

    var rows = await resp.json();
    if (rows && rows.length > 0) {
      return res.status(200).json({ valid: true, email: rows[0].email });
    } else {
      return res.status(200).json({ valid: false, reason: 'not_found' });
    }
  } catch(e) {
    return res.status(200).json({ valid: false, reason: 'error', detail: e.message });
  }
}
