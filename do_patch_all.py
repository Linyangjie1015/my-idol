# -*- coding: utf-8 -*-
import sys

# ============ Change 1: v1.6.html - NPC hidden card ============
# Already applied, but verify
with open('/tmp/my-idol-check3/v1.6.html', 'r', encoding='utf-8') as f:
    html = f.read()

old_hidden = "html2 += '<div class=\"npc-card-section\"><div class=\"npc-card-label\">\u9690\u85cf\u7279\u8d28</div>'"
if old_hidden in html:
    # Not yet patched
    old_block = """  if (npc.hidden) {
    html2 += '<div class="npc-card-section"><div class="npc-card-label">\u9690\u85cf\u7279\u8d28</div>';
    html2 += '<div class="npc-card-hidden">' + npc.hidden + '</div></div>';
  }"""
    new_block = """  if (npc.hidden) {
    var \u597d\u611f = (gameState.npc\u597d\u611f\u5ea6 && gameState.npc\u597d\u611f\u5ea6[npc.name]) || 0;
    if (\u597d\u611f >= 30) {
        html2 += '<div class="npc-card-section"><div class="npc-card-label">\u79d8\u5bc6</div>';
        html2 += '<div class="npc-card-hidden">' + npc.hidden + '</div></div>';
    } else {
        html2 += '<div class="npc-card-section"><div class="npc-card-label">\u79d8\u5bc6</div>';
        html2 += '<div class="npc-card-hidden" style="color:var(--color-text-light);font-style:italic;">\u597d\u50cf\u6709\u4ec0\u4e48\u79d8\u5bc6\u2026\u597d\u611f\u5ea6\u8fbe\u523030\u6216\u8bb8\u80fd\u53d1\u73b0\uff1f</div></div>';
    }
  }"""
    html = html.replace(old_block, new_block, 1)
    with open('/tmp/my-idol-check3/v1.6.html', 'w', encoding='utf-8') as f:
        f.write(html)
    print("OK: v1.6.html patched (change 1)")
else:
    print("SKIP: v1.6.html already patched (change 1)")


# ============ Changes 2-5: v1.6.js ============
with open('/tmp/my-idol-check3/v1.6.js', 'r', encoding='utf-8') as f:
    js = f.read()

# --- Change 2: insert danger/credit warning mail before "var apps = [" ---
warning_block = """    // \u5371\u9669\u503c/\u4fe1\u8a89\u8b66\u544a\u90ae\u4ef6\uff08\u6bcf\u5929\u53ea\u89e6\u53d1\u4e00\u6b21\uff09
    var today = new Date().toDateString();
    if (gameState.danger >= 30 && (!gameState._lastDangerMailDate || gameState._lastDangerMailDate !== today)) {
        gameState._lastDangerMailDate = today;
        var dangerMsgs = [
            '\u516c\u53f8\u9ad8\u5c42\u5bf9\u4f60\u6700\u8fd1\u7684\u98ce\u8bc4\u8868\u793a\u62c5\u5fe7\uff0c\u518d\u8fd9\u6837\u4e0b\u53bb\u53ef\u80fd\u4f1a\u88ab\u6682\u505c\u6d3b\u52a8\u3002\u8bf7\u52a1\u5fc5\u6ce8\u610f\u4e2a\u4eba\u5f62\u8c61\u7ba1\u7406\u3002',
            '\u7ecf\u7eaa\u90e8\u7d27\u6025\u901a\u77e5\uff1a\u4f60\u7684\u5371\u9669\u503c\u5df2\u7ecf\u504f\u9ad8\uff0c\u5df2\u6709\u5a92\u4f53\u5f00\u59cb\u5173\u6ce8\u4f60\u7684\u8d1f\u9762\u6d88\u606f\u3002\u7acb\u5373\u91c7\u53d6\u63aa\u65bd\uff01',
            '\u7ecf\u7eaa\u4eba\u79c1\u4e0b\u63d0\u9192\uff1a\u6700\u8fd1\u5173\u4e8e\u4f60\u7684\u8d1f\u9762\u4f20\u8a00\u8d8a\u6765\u8d8a\u591a\uff0c\u516c\u53f8\u53ef\u80fd\u4f1a\u8003\u8651\u9650\u5236\u4f60\u7684\u516c\u5f00\u6d3b\u52a8\u3002'
        ];
        gameState.emails.unshift({
            title: '\u516c\u53f8\u8b66\u544a\uff1a\u98ce\u8bc4\u5371\u673a',
            from: '\u516c\u53f8\u7ecf\u7eaa\u90e8',
            content: dangerMsgs[Math.floor(Math.random() * dangerMsgs.length)],
            time: new Date().toLocaleDateString('zh-CN'),
            read: false
        });
    }
    if (gameState.credit < 50 && gameState.credit > 0 && (!gameState._lastCreditMailDate || gameState._lastCreditMailDate !== today)) {
        gameState._lastCreditMailDate = today;
        var creditMsgs = [
            '\u7ecf\u7eaa\u4eba\u79c1\u4e0b\u63d0\u9192\u4f60\uff1a\u518d\u53d6\u6d88\u901a\u544a\uff0c\u516c\u53f8\u53ef\u80fd\u4f1a\u8003\u8651\u6362\u4eba\u3002\u4fe1\u8a89\u662f\u4f60\u5728\u8fd9\u4e2a\u884c\u4e1a\u7684\u751f\u547d\u7ebf\u3002',
            '\u516c\u53f8\u4eba\u4e8b\u90e8\u53d1\u6765\u901a\u77e5\uff1a\u4f60\u7684\u4fe1\u8a89\u8bc4\u5206\u5df2\u4f4e\u4e8e\u5b89\u5168\u7ebf\uff0c\u8bf7\u7acb\u5373\u6539\u5584\u5de5\u4f5c\u6001\u5ea6\uff0c\u5426\u5219\u5c06\u9762\u4e34\u5408\u7ea6\u8c03\u6574\u3002',
            '\u7ecf\u7eaa\u56e2\u961f\u5185\u90e8\u90ae\u4ef6\uff1a\u4f60\u7684\u4fe1\u8a89\u5df2\u4eae\u7ea2\u706f\uff0c\u5982\u679c\u7ee7\u7eed\u4e0b\u53bb\uff0c\u53ef\u80fd\u4f1a\u5931\u53bb\u8fd9\u6b21\u56de\u5f52\u7684\u673a\u4f1a\u3002'
        ];
        gameState.emails.unshift({
            title: '\u4fe1\u8a89\u8b66\u544a',
            from: '\u7ecf\u7eaa\u56e2\u961f',
            content: creditMsgs[Math.floor(Math.random() * creditMsgs.length)],
            time: new Date().toLocaleDateString('zh-CN'),
            read: false
        });
    }

"""

marker = "    var apps = ["
idx = js.find(marker)
if idx == -1:
    print("ERROR: Could not find 'var apps = ['")
    sys.exit(1)
js = js[:idx] + warning_block + js[idx:]
print("OK: v1.6.js patched (change 2 - warning emails)")


# --- Change 3b: Insert check-in card before the IIFE in page-content ---
search_pattern = '<div class="page-content" style="padding: 16px 20px;">'
idx2 = js.find(search_pattern)
if idx2 == -1:
    print("ERROR: Could not find page-content pattern")
    sys.exit(1)

iife_search = "' + (function() {"
iife_idx = js.find(iife_search, idx2)
if iife_idx == -1 or iife_idx > idx2 + 300:
    print("ERROR: Could not find IIFE after page-content")
    sys.exit(1)

# Replace "' + (function() {" with check-in IIFE + " " + "(function() {"
checkin_replacement = """' + (function() {
    var ci = getCheckInInfo();
    if (ci.checkedIn) {
        return '<div style="background:linear-gradient(135deg,#FFF5F7,#FFE4EC);border-radius:12px;padding:10px 14px;margin-bottom:12px;display:flex;align-items:center;justify-content:space-between;">'
            + '<div><div style="font-size:13px;font-weight:600;color:var(--color-primary);">\u4eca\u65e5\u5df2\u7b7e\u5230</div>'
            + '<div style="font-size:11px;color:var(--color-text-light);">\u8fde\u7eed' + ci.streak + '\u5929</div></div>'
            + '<div style="font-size:11px;color:var(--color-text-light);">\u660e\u5929\u7ee7\u7eed\u52a0\u6cb9</div></div>';
    }
    return '<div onclick="doDailyCheckIn()" style="background:linear-gradient(135deg,#FF8FA3,#FF6B8A);border-radius:12px;padding:10px 14px;margin-bottom:12px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;">'
        + '<div><div style="font-size:13px;font-weight:600;color:white;">\u7b7e\u5230\u9886\u91d1\u5e01</div>'
        + '<div style="font-size:11px;color:rgba(255,255,255,0.8);">\u8fde\u7eed\u7b7e\u5230\u5956\u52b1\u66f4\u591a</div></div>'
        + '<div style="font-size:13px;font-weight:600;color:white;">\u7b7e\u5230 ></div></div>';
}())
+ ' '
+ (function() {"""

js = js[:iife_idx] + checkin_replacement + js[iife_idx + len(iife_search):]
print("OK: v1.6.js patched (change 3b - check-in card)")


# --- Change 3a: Append check-in functions at end of file ---
checkin_funcs = """
// ==================== DAILY CHECK-IN ====================
function doDailyCheckIn() {
    var today = new Date().toDateString();
    if (gameState._lastCheckIn === today) {
        showToast('\u4eca\u5929\u5df2\u7b7e\u5230');
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
    var msg = '\u7b7e\u5230\u6210\u529f\uff01+' + coinBonus + ' \u91d1\u5e01';
    if (streak > 1) msg += ' (\u8fde\u7eed' + streak + '\u5929)';
    if (aiBonus > 0) msg += ' +' + aiBonus + ' AI\u989d\u5ea6';
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

js = js.rstrip() + "\n" + checkin_funcs
print("OK: v1.6.js patched (change 3a - check-in functions)")


# --- Change A: Friendly verification failure messages ---
old_a1 = "msgEl.textContent = data.message || '\u9a8c\u8bc1\u5931\u8d25'"
new_a1 = "msgEl.textContent = data.message || '\u8bf7\u68c0\u67e5\u8ba2\u5355\u53f7\u662f\u5426\u590d\u5236\u5b8c\u6574\uff0c\u6216\u7a0d\u540e\u91cd\u8bd5'"
if old_a1 not in js:
    print("ERROR: Could not find verification failure text (A1)")
    sys.exit(1)
js = js.replace(old_a1, new_a1, 1)

old_a2 = "msgEl.textContent = '\u9a8c\u8bc1\u5931\u8d25'"
new_a2 = "msgEl.textContent = '\u7f51\u7edc\u5f02\u5e38\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5'"
if old_a2 not in js:
    print("ERROR: Could not find verification failure text (A2)")
    sys.exit(1)
js = js.replace(old_a2, new_a2, 1)
print("OK: v1.6.js patched (change A - verification messages)")


# --- Change B: KakaoTalk red dot when AI quota exhausted ---
# Modify the getAppRedDot function to add a condition for kakaotalk
# when !canUseAIToday()
# Current kakaotalk case in getAppRedDot:
old_kakao_rd = """        case 'kakaotalk':
            if (gameState.kakaoChats) { var _kkeys = Object.keys(gameState.kakaoChats); for (var ki = 0; ki < _kkeys.length; ki++) { var _kmsgs = gameState.kakaoChats[_kkeys[ki]]; for (var kj = 0; kj < _kmsgs.length; kj++) { if (_kmsgs[kj].from !== 'me' && !_kmsgs[kj].read) count++; } } }
            break;"""

new_kakao_rd = """        case 'kakaotalk':
            if (gameState.kakaoChats) { var _kkeys = Object.keys(gameState.kakaoChats); for (var ki = 0; ki < _kkeys.length; ki++) { var _kmsgs = gameState.kakaoChats[_kkeys[ki]]; for (var kj = 0; kj < _kmsgs.length; kj++) { if (_kmsgs[kj].from !== 'me' && !_kmsgs[kj].read) count++; } } }
            if (count === 0 && !canUseAIToday()) count = 1;
            break;"""

if old_kakao_rd not in js:
    print("ERROR: Could not find kakaotalk case in getAppRedDot")
    sys.exit(1)
js = js.replace(old_kakao_rd, new_kakao_rd, 1)
print("OK: v1.6.js patched (change B - KakaoTalk red dot in getAppRedDot)")

# Also add position:relative to .app-item CSS in v1.6.html
# The app-item currently doesn't have position:relative, but app-icon-wrap does.
# The red dot is positioned relative to app-icon-wrap which already has position:relative,
# so the red dot will work fine within the icon-wrap. No CSS change needed.

# Write final JS
with open('/tmp/my-idol-check3/v1.6.js', 'w', encoding='utf-8') as f:
    f.write(js)

print("\nAll patches applied successfully!")
