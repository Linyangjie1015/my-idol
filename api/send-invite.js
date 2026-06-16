export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    var body = req.body || {};
    var email = (body.email || '').trim().toLowerCase();
    var code = body.code || '';
    var wechatId = body.wechatId || 'LYJ10152008';

    if (!email || !code) return res.status(400).json({ error: 'Missing email or code' });

    var SUPABASE_URL = process.env.SUPABASE_URL;
    var SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;
    var RESEND_API_KEY = process.env.RESEND_API_KEY || '';

    // Check invite count
    var countResp = await fetch(SUPABASE_URL + '/rest/v1/invite_requests?select=id', {
      headers: {
        'apikey': SUPABASE_SERVICE_KEY,
        'Authorization': 'Bearer ' + SUPABASE_SERVICE_KEY,
        'Range': '0-0'
      }
    });
    var totalCount = parseInt((countResp.headers.get('content-range') || '0/0').split('/')[1]) || 0;
    if (totalCount >= 40) {
      return res.status(200).json({ success: false, reason: 'full' });
    }

    // Check if email already exists
    var checkResp = await fetch(SUPABASE_URL + '/rest/v1/invite_requests?email=eq.' + encodeURIComponent(email) + '&select=code', {
      headers: {
        'apikey': SUPABASE_SERVICE_KEY,
        'Authorization': 'Bearer ' + SUPABASE_SERVICE_KEY
      }
    });
    var existing = await checkResp.json();
    if (existing && existing.length > 0) {
      // Resend email for existing user (fire-and-forget)
      if (RESEND_API_KEY) {
        sendInviteEmail(RESEND_API_KEY, email, existing[0].code, wechatId);
      }
      return res.status(200).json({ success: true, code: existing[0].code, already: true });
    }

    // Insert new record
    var insertResp = await fetch(SUPABASE_URL + '/rest/v1/invite_requests', {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_SERVICE_KEY,
        'Authorization': 'Bearer ' + SUPABASE_SERVICE_KEY,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify({ email: email, code: code })
    });

    if (!insertResp.ok) {
      var errText = await insertResp.text();
      return res.status(200).json({ success: false, reason: 'insert_failed', detail: errText });
    }

    // Return success immediately, send email in background (fire-and-forget)
    if (RESEND_API_KEY) {
      sendInviteEmail(RESEND_API_KEY, email, code, wechatId);
    }

    return res.status(200).json({ success: true, code: code });
  } catch(e) {
    return res.status(200).json({ success: false, reason: 'error', detail: e.message });
  }
}

function sendInviteEmail(apiKey, email, code, wechatId) {
  var emailHtml = '<!DOCTYPE html><html><head><meta charset="utf-8"><style>*{margin:0;padding:0;box-sizing:border-box}body{background:#FFF5F7;font-family:-apple-system,BlinkMacSystemFont,PingFang SC,Helvetica Neue,sans-serif;padding:40px 20px}.container{max-width:480px;margin:0 auto;background:white;border-radius:20px;overflow:hidden;box-shadow:0 4px 24px rgba(255,143,163,0.15)}.header{background:linear-gradient(135deg,#FF8FA3,#FF6B8A);padding:32px 24px;text-align:center}.header h1{color:white;font-size:28px;font-weight:800;margin-bottom:4px}.header p{color:rgba(255,255,255,0.85);font-size:14px}.body{padding:28px 24px}.greeting{font-size:16px;color:#2D2D2D;margin-bottom:20px;line-height:1.7}.code-section{background:linear-gradient(135deg,#FFF5F7,#FFE4EC);border-radius:14px;padding:20px;text-align:center;margin:20px 0}.code-label{font-size:13px;color:#8E8E93;margin-bottom:8px}.code-value{font-size:32px;font-weight:800;letter-spacing:4px;color:#FF6B8A}.info-box{background:#F8F9FA;border-radius:10px;padding:16px;margin:16px 0}.info-box p{font-size:14px;color:#666;line-height:1.8}.info-box strong{color:#2D2D2D}.wechat-box{background:#E8F5E9;border-radius:10px;padding:16px;margin:16px 0;text-align:center}.wechat-box p{font-size:14px;color:#2E7D32;line-height:1.8}.wechat-box .wechat-id{font-size:20px;font-weight:700;color:#1B5E20;letter-spacing:1px}.warn-box{background:#FFF8F0;border-radius:10px;padding:14px;margin:16px 0}.warn-box p{font-size:12px;color:#CC7700;line-height:1.7}.footer{text-align:center;padding:20px;font-size:12px;color:#C7C7CC}.game-link{display:inline-block;padding:12px 32px;background:linear-gradient(135deg,#FF8FA3,#FF6B8A);color:white;text-decoration:none;border-radius:50px;font-weight:600;font-size:15px;margin-top:12px}</style></head><body><div class="container"><div class="header"><h1>My Idol</h1><p>V1.6 内测邀请函</p></div><div class="body"><p class="greeting">亲爱的内测用户，您好：</p><p class="greeting">恭喜您成功抽取到 My Idol V1.6 第二轮内测名额！以下是您的专属邀请码：</p><div class="code-section"><p class="code-label">您的内测邀请码</p><p class="code-value">' + code + '</p></div><div class="info-box"><p><strong>使用步骤：</strong></p><p>1. 点击下方链接进入游戏</p><p>2. 输入邀请码通过验证</p><p>3. 使用本邮箱注册账号</p><p>4. 前往邮箱点击确认链接</p><p>5. 6月17日 12:00 正式上线后登录游玩</p></div><div class="wechat-box"><p>请添加开发者微信</p><p>用于内测拉群及问题反馈</p><p class="wechat-id">' + wechatId + '</p></div><div class="warn-box"><p>本邀请码与您的邮箱绑定，请勿外传或公开发布</p><p>违规传播将取消内测资格并追究相关责任</p></div><p style="text-align:center"><a class="game-link" href="https://linyangjie1015.github.io/my-idol/v1.6.html">前往注册</a></p></div><div class="footer">My Idol Team<br>2026年6月</div></div></body></html>';

  // Fire and forget - don't await
  fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + apiKey,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: 'My Idol <noreply@myidol.asia>',
      to: email,
      subject: 'My Idol V1.6 内测邀请函',
      html: emailHtml
    })
  }).catch(function() {});
}
