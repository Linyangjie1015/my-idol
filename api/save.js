export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();

  var SUPABASE_URL = process.env.SUPABASE_URL;
  var SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;
  var ANON_KEY = process.env.SUPABASE_ANON_KEY;
  var authHeader = (req.headers['authorization'] || '');
  var token = authHeader.replace('Bearer ', '').trim();

  if (!token) return res.status(401).json({ error: 'no token' });

  // Verify token with Supabase Auth
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

  // Ensure user exists in public.users (upsert by email)
  var lookupResp = await fetch(SUPABASE_URL + '/rest/v1/users?email=eq.' + encodeURIComponent(userEmail) + '&select=id,email,nickname', {
    headers: {
      'apikey': SERVICE_KEY,
      'Authorization': 'Bearer ' + SERVICE_KEY
    }
  });
  var lookupData = await lookupResp.json();
  var userId;

  if (lookupData && lookupData.length > 0) {
    userId = lookupData[0].id;
  } else {
    var nickname = (userData.user_metadata && userData.user_metadata.nickname) || userEmail.split('@')[0];
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
      userId = createData.id;
    } else {
      return res.status(500).json({ error: 'failed to create user', detail: createData });
    }
  }

  if (req.method === 'POST') {
    var body = req.body || {};
    var slot = body.slot;
    var saveName = body.save_name || '';
    var saveData = body.save_data;

    if (slot === undefined || slot === null) return res.status(400).json({ error: 'missing slot' });
    if (!saveData) return res.status(400).json({ error: 'missing save_data' });

    // Delete existing save for this user+slot, then insert new one
    // This avoids the need for a unique constraint for upsert
    await fetch(SUPABASE_URL + '/rest/v1/saves?user_id=eq.' + userId + '&slot=eq.' + slot, {
      method: 'DELETE',
      headers: {
        'apikey': SERVICE_KEY,
        'Authorization': 'Bearer ' + SERVICE_KEY
      }
    });

    var insertResp = await fetch(SUPABASE_URL + '/rest/v1/saves', {
      method: 'POST',
      headers: {
        'apikey': SERVICE_KEY,
        'Authorization': 'Bearer ' + SERVICE_KEY,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify({
        user_id: userId,
        slot: slot,
        save_name: saveName,
        save_data: saveData
      })
    });

    if (insertResp.ok) {
      return res.status(200).json({ ok: true });
    } else {
      var errData = await insertResp.json();
      return res.status(500).json({ error: 'save failed', detail: errData });
    }
  }

  if (req.method === 'GET') {
    var loadSlot = req.query.slot;
    if (loadSlot === undefined || loadSlot === null) {
      return res.status(400).json({ error: 'missing slot parameter' });
    }

    var loadResp = await fetch(SUPABASE_URL + '/rest/v1/saves?user_id=eq.' + userId + '&slot=eq.' + loadSlot + '&select=save_data,save_name,updated_at', {
      headers: {
        'apikey': SERVICE_KEY,
        'Authorization': 'Bearer ' + SERVICE_KEY
      }
    });

    var loadData = await loadResp.json();
    if (loadData && loadData.length > 0) {
      return res.status(200).json({ save_data: loadData[0].save_data, save_name: loadData[0].save_name, updated_at: loadData[0].updated_at });
    } else {
      return res.status(200).json({ save_data: null });
    }
  }

  return res.status(405).json({ error: 'method not allowed' });
}
