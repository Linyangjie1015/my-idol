// Admin signup endpoint - bypasses email rate limit by using service role key
// Creates user directly without email verification
module.exports = function handler(req, res) {
    // CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') return res.status(200).end();

    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    var SUPABASE_URL = process.env.SUPABASE_URL;
    var SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

    if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
        return res.status(500).json({ error: 'Server config missing' });
    }

    var body = req.body || {};
    var email = body.email;
    var password = body.password;
    var nickname = body.nickname;

    if (!email || !password || !nickname) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    if (password.length < 6) {
        return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    // Use admin API to create user with auto-confirm
    var https = require('https');
    var postData = JSON.stringify({
        email: email,
        password: password,
        email_confirm: true,
        user_metadata: { nickname: nickname }
    });

    var options = {
        hostname: SUPABASE_URL.replace('https://', ''),
        port: 443,
        path: '/auth/v1/admin/users',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'apikey': SUPABASE_SERVICE_KEY,
            'Authorization': 'Bearer ' + SUPABASE_SERVICE_KEY,
            'Content-Length': Buffer.byteLength(postData)
        }
    };

    var proxyReq = https.request(options, function(proxyRes) {
        var data = '';
        proxyRes.on('data', function(chunk) { data += chunk; });
        proxyRes.on('end', function() {
            try {
                var result = JSON.parse(data);
                if (proxyRes.statusCode >= 200 && proxyRes.statusCode < 300 && result.id) {
                    // Success - also write to public.users
                    var ensureData = JSON.stringify({
                        user_id: result.id,
                        email: email,
                        nickname: nickname
                    });
                    var ensureOptions = {
                        hostname: SUPABASE_URL.replace('https://', ''),
                        port: 443,
                        path: '/rest/v1/users',
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'apikey': SUPABASE_SERVICE_KEY,
                            'Authorization': 'Bearer ' + SUPABASE_SERVICE_KEY,
                            'Prefer': 'resolution=merge-duplicates',
                            'Content-Length': Buffer.byteLength(ensureData)
                        }
                    };
                    var ensureReq = https.request(ensureOptions, function(ensureRes) {
                        // Don't wait for this, just respond
                    });
                    ensureReq.on('error', function() {});
                    ensureReq.write(ensureData);
                    ensureReq.end();

                    res.status(200).json({
                        success: true,
                        user: { id: result.id, email: result.email },
                        autoconfirmed: true
                    });
                } else {
                    var errMsg = (result.error && result.error.message) || result.msg || result.message || 'Signup failed';
                    if (errMsg.indexOf('already') >= 0 || errMsg.indexOf('duplicate') >= 0 || errMsg.indexOf('registered') >= 0) {
                        errMsg = '该邮箱已注册';
                    }
                    res.status(proxyRes.statusCode).json({ error: errMsg });
                }
            } catch(e) {
                res.status(500).json({ error: 'Parse error' });
            }
        });
    });

    proxyReq.on('error', function(e) {
        res.status(500).json({ error: 'Proxy error: ' + e.message });
    });

    proxyReq.write(postData);
    proxyReq.end();
};
