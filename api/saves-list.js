export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'method not allowed' });

  var SUPABASE_URL = process.env.SUPABASE_URL;
  var SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;
  var ANON_KEY = process.env.SUPABASE_ANON_KEY;
  var authHeader = (req.headers['authorization'] || '');
  var token = authHeader.replace('Bearer ', '').trim();

  if (!token) return res.status(401).json({ error: 'no token' });

  // Verify token
  var userResp = await fetch(SUPABASE_URL + '/auth/v1/user', {
    headers: {
      'apikey': ANON_KEY,
      'Authorization': 'Bearer ' + token
    }
  });

  if (!userResp.ok) return res.status(401).json({ error: 'invalid token' });

  var userData = await userResp.json();
  var userEmail = userData.email;
  if (!userEmail) return res.status(401).json({ error: 'no email' });

  // Find user in public.users
  var lookupResp = await fetch(SUPABASE_URL + '/rest/v1/users?email=eq.' + encodeURIComponent(userEmail) + '&select=id', {
    headers: {
      'apikey': SERVICE_KEY,
      'Authorization': 'Bearer ' + SERVICE_KEY
    }
  });
  var lookupData = await lookupResp.json();

  if (!lookupData || lookupData.length === 0) {
    return res.status(200).json({ saves: [] });
  }

  var userId = lookupData[0].id;

  // Get all saves for this user
  var savesResp = await fetch(SUPABASE_URL + '/rest/v1/saves?user_id=eq.' + userId + '&select=slot,save_name,save_data,updated_at&order=slot.asc', {
    headers: {
      'apikey': SERVICE_KEY,
      'Authorization': 'Bearer ' + SERVICE_KEY
    }
  });

  var savesData = await savesResp.json();
  return res.status(200).json({ saves: savesData || [] });
}
