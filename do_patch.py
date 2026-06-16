# -*- coding: utf-8 -*-
import sys

# ============ Change 1: v1.6.html - NPC hidden card ============
with open('/tmp/my-idol-check3/v1.6.html', 'r', encoding='utf-8') as f:
    html = f.read()

old_hidden = """  if (npc.hidden) {
    html2 += '<div class="npc-card-section"><div class="npc-card-label">隐藏特质</div>';
    html2 += '<div class="npc-card-hidden">' + npc.hidden + '</div></div>';
  }"""

new_hidden = """  if (npc.hidden) {
    var 好感 = (gameState.npc好感度 && gameState.npc好感度[npc.name]) || 0;
    if (好感 >= 30) {
        html2 += '<div class="npc-card-section"><div class="npc-card-label">秘密</div>';
        html2 += '<div class="npc-card-hidden">' + npc.hidden + '</div></div>';
    } else {
        html2 += '<div class="npc-card-section"><div class="npc-card-label">秘密</div>';
        html2 += '<div class="npc-card-hidden" style="color:var(--color-text-light);font-style:italic;">好像有什么秘密…好感度达到30或许能发现？</div></div>';
    }
  }"""

if old_hidden not in html:
    print("ERROR: Could not find old hidden block in v1.6.html")
    sys.exit(1)
html = html.replace(old_hidden, new_hidden, 1)

with open('/tmp/my-idol-check3/v1.6.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("OK: v1.6.html patched (change 1)")


# ============ Change 2 & 3: v1.6.js ============
with open('/tmp/my-idol-check3/v1.6.js', 'r', encoding='utf-8') as f:
    js = f.read()

# --- Change 2: insert danger/credit warning mail before "var apps = [" ---
warning_block = """    // 危险值/信誉警告邮件（每天只触发一次）
    var today = new Date().toDateString();
    if (gameState.danger >= 30 && (!gameState._lastDangerMailDate || gameState._lastDangerMailDate !== today)) {
        gameState._lastDangerMailDate = today;
        var dangerMsgs = [
            '公司高层对你最近的风评表示担忧，再这样下去可能会被暂停活动。请务必注意个人形象管理。',
            '经纪部紧急通知：你的危险值已经偏高，已有媒体开始关注你的负面消息。立即采取措施！',
            '经纪人私下提醒：最近关于你的负面传言越来越多，公司可能会考虑限制你的公开活动。'
        ];
        gameState.emails.unshift({
            title: '公司警告：风评危机',
            from: '公司经纪部',
            content: dangerMsgs[Math.floor(Math.random() * dangerMsgs.length)],
            time: new Date().toLocaleDateString('zh-CN'),
            read: false
        });
    }
    if (gameState.credit < 50 && gameState.credit > 0 && (!gameState._lastCreditMailDate || gameState._lastCreditMailDate !== today)) {
        gameState._lastCreditMailDate = today;
        var creditMsgs = [
            '经纪人私下提醒你：再取消通告，公司可能会考虑换人。信誉是你在这个行业的生命线。',
            '公司人事部发来通知：你的信誉评分已低于安全线，请立即改善工作态度，否则将面临合约调整。',
            '经纪团队内部邮件：你的信誉已亮红灯，如果继续下去，可能会失去这次回归的机会。'
        ];
        gameState.emails.unshift({
            title: '信誉警告',
            from: '经纪团队',
            content: creditMsgs[Math.floor(Math.random() * creditMsgs.length)],
            time: new Date().toLocaleDateString('zh-CN'),
            read: false
        });
    }

"""

# Find "    var apps = [" inside renderHomePage
marker = "    var apps = ["
idx = js.find(marker)
if idx == -1:
    print("ERROR: Could not find 'var apps = [' in v1.6.js")
    sys.exit(1)
# Insert warning block right before it
js = js[:idx] + warning_block + js[idx:]
print("OK: v1.6.js patched (change 2 - warning emails)")


# --- Change 3b: Insert check-in card before the IIFE in page-content ---
# We need to find the specific location in renderHomePage where:
# '<div class="page-content" style="padding: 16px 20px;">'
# is followed by the IIFE '(function() {'
# and insert the check-in card HTML before the IIFE.

# The exact string pattern in the JS source:
search_str = "<div class=\"page-content\" style=\"padding: 16px 20px;\">\n                ' + (function() {"
idx2 = js.find(search_str)
if idx2 == -1:
    print("ERROR: Could not find page-content IIFE pattern in v1.6.js")
    sys.exit(1)

# The check-in card to insert (as a JS string expression concatenated with +)
checkin_card = """<div class="page-content" style="padding: 16px 20px;\">\n                ' + (function() {\n    var ci = getCheckInInfo();\n    if (ci.checkedIn) {\n        return '<div style="background:linear-gradient(135deg,#FFF5F7,#FFE4EC);border-radius:12px;padding:10px 14px;margin-bottom:12px;display:flex;align-items:center;justify-content:space-between;">'\n            + '<div><div style="font-size:13px;font-weight:600;color:var(--color-primary);">今日已签到</div>'\n            + '<div style="font-size:11px;color:var(--color-text-light);">连续' + ci.streak + '天</div></div>'\n            + '<div style="font-size:11px;color:var(--color-text-light);">明天继续加油</div></div>';\n    }\n    return '<div onclick="doDailyCheckIn()" style="background:linear-gradient(135deg,#FF8FA3,#FF6B8A);border-radius:12px;padding:10px 14px;margin-bottom:12px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;">'\n        + '<div><div style="font-size:13px;font-weight:600;color:white;">签到领金币</div>'\n        + '<div style="font-size:11px;color:rgba(255,255,255,0.8);">连续签到奖励更多</div></div>'\n        + '<div style="font-size:13px;font-weight:600;color:white;">签到 ></div></div>';\n}())\n+ ' '\n+ (function() {"""

# Replace the old pattern with the new one that includes the check-in card
js = js[:idx2] + checkin_card + js[idx2 + len(search_str):]
print("OK: v1.6.js patched (change 3b - check-in card in homepage)")


# --- Change 3a: Append check-in functions at end of file ---
checkin_funcs = """
// ==================== DAILY CHECK-IN ====================
function doDailyCheckIn() {
    var today = new Date().toDateString();
    if (gameState._lastCheckIn === today) {
        showToast('今天已签到');
        return;
    }
    var yesterday = new Date(Date.now() - 86400000).toDateString();
    if (gameState._lastCheckIn === yesterday) {
        gameState._checkInStreak = (gameState._checkInStreak || 0) + 1;
    } else {
        gameState._checkInStreak = 1;
    }
    gameState._lastCheckIn = today;
    var streak = gameState._checkInStreak;
    var coinBonus = 2000 + (streak - 1) * 500;
    if (streak >= 7) coinBonus += 5000;
    var aiBonus = 0;
    if (streak === 3) aiBonus = 1;
    if (streak === 7) aiBonus = 3;
    gameState.money = (gameState.money || 0) + coinBonus;
    if (aiBonus > 0) {
        gameState._bonusAiToday = (gameState._bonusAiToday || 0) + aiBonus;
    }
    var msg = '签到成功！+' + coinBonus + ' 金币';
    if (streak > 1) msg += ' (连续' + streak + '天)';
    if (aiBonus > 0) msg += ' +' + aiBonus + ' AI额度';
    showToast(msg);
    triggerSilentSave();
    render();
}

function getCheckInInfo() {
    var today = new Date().toDateString();
    var yesterday = new Date(Date.now() - 86400000).toDateString();
    var streak = 0;
    if (gameState._lastCheckIn === today) {
        streak = gameState._checkInStreak || 0;
    } else if (gameState._lastCheckIn === yesterday) {
        streak = gameState._checkInStreak || 0;
    }
    var checkedIn = gameState._lastCheckIn === today;
    return { streak: streak, checkedIn: checkedIn };
}
"""

# Append before the final "render();" call at the very end
# Actually, append at the very end of the file
js = js.rstrip() + "\n" + checkin_funcs
print("OK: v1.6.js patched (change 3a - check-in functions appended)")

with open('/tmp/my-idol-check3/v1.6.js', 'w', encoding='utf-8') as f:
    f.write(js)

print("All patches applied successfully!")
