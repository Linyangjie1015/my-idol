export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    var body = req.body || {};
    var code = (body.code || '').trim().toUpperCase();

    if (!code) return res.status(200).json({ valid: false, reason: 'empty' });

    var VALID_CODES = ['LOVE7286','DREAM4886','DREAM5305','DREAM6461','DEBUT3677','V162877','MYIDOL5203','V165678','V164720','FAN3082'];

    var found = false;
    for (var i = 0; i < VALID_CODES.length; i++) {
      if (VALID_CODES[i] === code) { found = true; break; }
    }

    if (found) {
      // Log to Supabase in background, don't block response
      var SUPABASE_URL = process.env.SUPABASE_URL;
      var SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;
      if (SUPABASE_URL && SUPABASE_SERVICE_KEY) {
        fetch(SUPABASE_URL + '/rest/v1/invite_requests', {
          method: 'POST',
          headers: {
            'apikey': SUPABASE_SERVICE_KEY,
            'Authorization': 'Bearer ' + SUPABASE_SERVICE_KEY,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email: 'gate_' + code, code: code })
        }).catch(function() {});
      }
      return res.status(200).json({ valid: true });
    }

    return res.status(200).json({ valid: false, reason: 'not_found' });
  } catch(e) {
    return res.status(200).json({ valid: false, reason: 'error', detail: e.message });
  }
}
