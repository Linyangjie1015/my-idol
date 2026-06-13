export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    var body = req.body || {};
    var appId = body.app || 'kakaotalk';
    var context = body.context || '';
    var playerMessage = body.message || '';
    var player = body.player || {};

    var prompts = {
      kakaotalk: '你是韩娱爱豆模拟器中的NPC，正在通过KakaoTalk和玩家聊天。' + context + '。用简短随意的韩式聊天语气回复，1-2句话，偶尔用~和！，不要用emoji。用中文回复。',
      bubble: '你是韩娱爱豆模拟器中的爱豆，正在通过泡泡和粉丝聊天。' + context + '。用甜蜜亲切的语气回复粉丝，1-2句话，偶尔用~，不要用emoji。用中文回复。',
      dating: '你是韩娱爱豆模拟器中和玩家恋爱的NPC。' + context + '。用温柔暧昧的恋爱语气回复，1-2句话，不要用emoji。用中文回复。',
      ins: '你是韩娱爱豆模拟器中INS上的粉丝。用热情简短的评论语气回复，1句话，不要用emoji。用中文回复。',
      tiktok: '你是韩娱爱豆模拟器中TikTok上的粉丝。用活泼简短的评论语气回复，1句话，不要用emoji。用中文回复。',
      weverse: '你是韩娱爱豆模拟器中Weverse上的爱豆，在跟粉丝互动。用温暖真诚的语气回复，1-2句话，不要用emoji。用中文回复。',
      live: '你是韩娱爱豆模拟器中直播间的观众。用热情简短的弹幕语气回复，1句话，不要用emoji。用中文回复。'
    };

    var systemPrompt = prompts[appId] || prompts.kakaotalk;
    var userId = (player.name || 'player') + '_' + Math.floor(Math.random() * 10000);

    var cozeResp = await fetch('https://api.coze.cn/v3/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + process.env.COZE_API_TOKEN
      },
      body: JSON.stringify({
        bot_id: process.env.COZE_BOT_ID,
        user_id: userId,
        stream: false,
        auto_save_history: false,
        additional_messages: [
          { role: 'system', content: systemPrompt, content_type: 'text' },
          { role: 'user', content: playerMessage, content_type: 'text' }
        ]
      })
    });

    var cozeData = await cozeResp.json();

    if (cozeData.code === 0 && cozeData.data) {
      var chatId = cozeData.data.id;
      var conversationId = cozeData.data.conversation_id;

      for (var i = 0; i < 6; i++) {
        await new Promise(function(r) { setTimeout(r, 2000); });

        var pollResp = await fetch('https://api.coze.cn/v3/chat/retrieve?chat_id=' + chatId + '&conversation_id=' + conversationId, {
          headers: { 'Authorization': 'Bearer ' + process.env.COZE_API_TOKEN }
        });
        var pollData = await pollResp.json();

        if (pollData.code === 0 && pollData.data && pollData.data.status === 'completed') {
          var msgResp = await fetch('https://api.coze.cn/v3/chat/message/list?chat_id=' + chatId + '&conversation_id=' + conversationId, {
            headers: { 'Authorization': 'Bearer ' + process.env.COZE_API_TOKEN }
          });
          var msgData = await msgResp.json();

          if (msgData.code === 0 && msgData.data) {
            for (var m = 0; m < msgData.data.length; m++) {
              if (msgData.data[m].role === 'assistant' && msgData.data[m].type === 'answer') {
                return res.status(200).json({ reply: msgData.data[m].content });
              }
            }
          }
          break;
        }
        if (pollData.data && (pollData.data.status === 'failed' || pollData.data.status === 'requires_action')) break;
      }
    }

    return res.status(200).json({ reply: '', error: 'timeout' });

  } catch (e) {
    return res.status(200).json({ reply: '', error: e.message });
  }
}
