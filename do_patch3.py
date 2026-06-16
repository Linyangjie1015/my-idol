# -*- coding: utf-8 -*-
import sys

# ============ Changes 2 & 3: v1.6.js ============
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
    print("ERROR: Could not find 'var apps = [' in v1.6.js")
    sys.exit(1)
js = js[:idx] + warning_block + js[idx:]
print("OK: v1.6.js patched (change 2 - warning emails)")


# --- Change 3b: Insert check-in card before the IIFE in page-content ---
search_pattern = '<div class="page-content" style="padding: 16px 20px;">'
idx2 = js.find(search_pattern)
if idx2 == -1:
    print("ERROR: Could not find page-content padding pattern in v1.6.js")
    sys.exit(1)

# Find the IIFE after page-content
iife_search = "' + (function() {"
iife_idx = js.find(iife_search, idx2)
if iife_idx == -1 or iife_idx > idx2 + 300:
    print("ERROR: Could not find IIFE after page-content in v1.6.js")
    sys.exit(1)

# Show what's between them for debugging
between = js[idx2 + len(search_pattern):iife_idx + len(iife_search)]
print("BETWEEN repr:", repr(between[:100]))

checkin_code = """' + (function() {
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
+ """

# Replace just the IIFE start with checkin_code + IIFE start
old_iife = "' + (function() {"
js = js[:iife_idx] + checkin_code + js[iife_idx + len(old_iife):]
print("OK: v1.6.js patched (change 3b - check-in card in homepage)")


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
print("OK: v1.6.js patched (change 3a - check-in functions appended)")

with open('/tmp/my-idol-check3/v1.6.js', 'w', encoding='utf-8') as f:
    f.write(js)

print("All patches applied successfully!")
