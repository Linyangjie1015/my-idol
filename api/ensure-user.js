export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'method not allowed' });

  var SUPABASE_URL = process.env.SUPABASE_URL;
  var SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;
  var ANON_KEY = process.env.SUPABASE_ANON_KEY;
  var authHeader = (req.headers['authorization'] || '');
  var token = authHeader.replace('Bearer ', '').trim();

  if (!token) return res.status(401).json({ error: 'no token' });

  var userResp = await fetch(SUPABASE_URL + '/auth/v1/user', {
    headers: { 'apikey': ANON_KEY, 'Authorization': 'Bearer ' + token }
  });

  if (!userResp.ok) return res.status(401).json({ error: 'invalid token' });

  var userData = await userResp.json();
  var userEmail = userData.email;
  if (!userEmail) return res.status(401).json({ error: 'no email' });

  var nickname = (userData.user_metadata && userData.user_metadata.nickname) || userEmail.split('@')[0];

  // Check if user exists
  var lookupResp = await fetch(SUPABASE_URL + '/rest/v1/users?email=eq.' + encodeURIComponent(userEmail) + '&select=id', {
    headers: { 'apikey': SERVICE_KEY, 'Authorization': 'Bearer ' + SERVICE_KEY }
  });
  var lookupData = await lookupResp.json();

  if (lookupData && lookupData.length > 0) {
    return res.status(200).json({ ok: true, user_id: lookupData[0].id, created: false });
  }

  // Create user
  var createResp = await fetch(SUPABASE_URL + '/rest/v1/users', {
    method: 'POST',
    headers: {
      'apikey': SERVICE_KEY,
      'Authorization': 'Bearer ' + SERVICE_KEY,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    },
    body: JSON.stringify({ email: userEmail, nickname: nickname })
  });
  var createData = await createResp.json();

  if (createData && createData.id) {
    return res.status(200).json({ ok: true, user_id: createData.id, created: true });
  } else {
    return res.status(500).json({ error: 'failed to create user', detail: createData });
  }
}
