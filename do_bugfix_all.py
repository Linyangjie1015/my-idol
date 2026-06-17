import re

with open('/tmp/my-idol/v1.6.js', 'r', encoding='utf-8') as f:
    code = f.read()

changes = []

# ============================================================
# FIX 1: showNpcCard function missing + data-npc quote bug
# ============================================================
code = code.replace(
    "data-npc='+f.name+'\"",
    "data-npc=\"'+f.name+'\""
)

npc_card_fn = r'''
function showNpcCard(npcName) {
    if (!npcName) return;
    var npc = null;
    for (var i = 0; i < gameState.kakaoFriends.length; i++) {
        if (gameState.kakaoFriends[i].name === npcName) { npc = gameState.kakaoFriends[i]; break; }
    }
    if (!npc) return;
    var 好感 = (gameState.npc好感度 && gameState.npc好感度[npcName]) || 0;
    var hiddenOk = 好感 >= 30;
    var html = '<div style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:9999;display:flex;align-items:center;justify-content:center;" onclick="if(event.target===this)this.remove()">'
        + '<div style="background:var(--bg-card);border-radius:20px;width:85%;max-width:340px;padding:24px;box-shadow:0 20px 60px rgba(0,0,0,0.3);" onclick="event.stopPropagation()">'
        + '<div style="display:flex;align-items:center;margin-bottom:16px;">'
        + '<div style="width:56px;height:56px;border-radius:50%;background:'+npc.avatarColor+';display:flex;align-items:center;justify-content:center;font-size:22px;color:white;font-weight:700;">'+npc.name.charAt(0)+'</div>'
        + '<div style="margin-left:14px;flex:1;">'
        + '<div style="font-size:18px;font-weight:700;color:var(--color-text);">'+npc.name+'</div>'
        + '<div style="font-size:12px;color:var(--color-text-light);margin-top:2px;">'+(npc.personality||'')+'</div>'
        + '</div>'
        + '<div style="cursor:pointer;font-size:24px;color:var(--color-text-light);padding:4px 8px;line-height:1;" onclick="this.closest(\'div[style*=position:fixed]\').remove()">&times;</div>'
        + '</div>';
    if (npc.bio) {
        html += '<div style="margin-bottom:12px;"><div style="font-size:11px;color:var(--color-text-light);margin-bottom:4px;">简介</div>'
            + '<div style="font-size:13px;color:var(--color-text);line-height:1.6;">'+npc.bio+'</div></div>';
    }
    if (npc.quote) {
        html += '<div style="margin-bottom:12px;padding:10px 14px;background:#FFF5F7;border-radius:10px;">'
            + '<div style="font-size:11px;color:var(--color-primary);margin-bottom:4px;">招牌语</div>'
            + '<div style="font-size:13px;color:var(--color-text);font-style:italic;">\u201c'+npc.quote+'\u201d</div></div>';
    }
    html += '<div style="margin-bottom:12px;">'
        + '<div style="font-size:11px;color:var(--color-text-light);margin-bottom:6px;">好感度 '+好感+'/100</div>'
        + '<div style="height:6px;background:#EEE;border-radius:3px;overflow:hidden;">'
        + '<div style="height:100%;width:'+好感+'%;background:linear-gradient(90deg,#FF8FA3,#FF6B8A);border-radius:3px;transition:width 0.3s;"></div>'
        + '</div></div>';
    if (npc.hidden) {
        if (hiddenOk) {
            html += '<div style="padding:10px 14px;background:linear-gradient(135deg,#FFF5F7,#FFE4EC);border-radius:10px;">'
                + '<div style="font-size:11px;color:var(--color-primary);margin-bottom:4px;">隐藏特质</div>'
                + '<div style="font-size:13px;color:var(--color-text);line-height:1.6;">'+npc.hidden+'</div></div>';
        } else {
            html += '<div style="padding:10px 14px;background:#F5F5F5;border-radius:10px;text-align:center;">'
                + '<div style="font-size:12px;color:var(--color-text-light);">好感度达30解锁隐藏特质 ('+Math.max(0,30-好感)+'/30)</div></div>';
        }
    }
    html += '</div></div>';
    var overlay = document.createElement('div');
    overlay.innerHTML = html;
    document.body.appendChild(overlay);
}

'''
code = code.replace('function sendKakaoMessage() {', npc_card_fn + 'function sendKakaoMessage() {', 1)
changes.append('showNpcCard function added (was missing)')

# ============================================================
# FIX 2: AI bonus from check-in not counted in getAIMaxTotalToday
# ============================================================
old_max = """function getAIMaxTotalToday() {
    // VIP tier-based limits
    var vipTier = null;
    try { vipTier = JSON.parse(localStorage.getItem('myidol_saves_' + localStorage.getItem('myidol_current_account')) || '{}').vipTier; } catch(e) {}
    if (vipTier === 'premium') return 80;
    if (vipTier === 'advanced') return 40;
    if (vipTier === 'basic') return 15;
    return 3; // Free users get 3 AI messages per day (trial)
}"""
new_max = """function getAIMaxTotalToday() {
    // VIP tier-based limits
    var vipTier = gameState.vipTier || null;
    if (!vipTier) { try { vipTier = JSON.parse(localStorage.getItem('myidol_saves_' + localStorage.getItem('myidol_current_account')) || '{}').vipTier; } catch(e) {} }
    var base = 3;
    if (vipTier === 'premium') base = 80;
    else if (vipTier === 'advanced') base = 40;
    else if (vipTier === 'basic') base = 15;
    var bonus = gameState._bonusAiToday || 0;
    return base + bonus;
}"""
code = code.replace(old_max, new_max)
changes.append('getAIMaxTotalToday: check gameState.vipTier first + count _bonusAiToday')

# ============================================================
# FIX 3: Enter key support for KakaoTalk input
# ============================================================
code = code.replace(
    "'<input class=\"kakao-input\" id=\"kakaoMsgInput\" placeholder=\"输入消息...\" />'",
    "'<input class=\"kakao-input\" id=\"kakaoMsgInput\" placeholder=\"输入消息...\" onkeydown=\"if(event.key===\\'Enter\\'){event.preventDefault();sendKakaoMessage();}\" />'"
)
changes.append('KakaoTalk input: Enter key sends message')

# ============================================================
# FIX 4: Invite code button debounce
# ============================================================
code = code.replace(
    """function checkInviteCode() {
    var code = (document.getElementById('inviteCodeInput').value || '').trim().toUpperCase().replace(/\\s/g, '');
    var errEl = document.getElementById('inviteCodeError');
    var btnEl = document.getElementById('inviteCodeBtn');""",
    """function checkInviteCode() {
    var btnEl = document.getElementById('inviteCodeBtn');
    if (btnEl && btnEl.disabled) return;
    var code = (document.getElementById('inviteCodeInput').value || '').trim().toUpperCase().replace(/\\s/g, '');
    var errEl = document.getElementById('inviteCodeError');"""
)
code = code.replace(
    "if(btnEl) btnEl.textContent='验证中...';",
    "if(btnEl){btnEl.textContent='验证中...';btnEl.disabled=true;}"
)
changes.append('Invite code: debounce double-submit')

# ============================================================
# FIX 5: KakaoTalk AI reply - append instead of full re-render
# ============================================================
code = code.replace(
    """getAIReply('kakaotalk', npcContext, text, function(reply) {
                gameState.kakaoChats[npcName].push({ from: 'npc', text: reply, time: timeStr });
                        notifyKakao(npcName, reply.substring(0,30));
                renderKakaoChatPage(document.getElementById('app'));
            });""",
    """getAIReply('kakaotalk', npcContext, text, function(reply) {
                gameState.kakaoChats[npcName].push({ from: 'npc', text: reply, time: timeStr });
                notifyKakao(npcName, reply.substring(0,30));
                var ca = document.getElementById('kakaoChatArea');
                if (ca) {
                    var npcDiv = document.createElement('div');
                    npcDiv.className = 'kakao-msg-row npc';
                    npcDiv.innerHTML = '<div><div class=\"kakao-msg-bubble npc\">' + reply + '</div><div class=\"kakao-msg-time\">' + timeStr + '</div></div>';
                    ca.appendChild(npcDiv);
                    ca.scrollTop = ca.scrollHeight;
                }
            });"""
)
changes.append('KakaoTalk AI reply: append bubble instead of full re-render')

# ============================================================
# FIX 6: _getAILimit() -> getAIMaxTotalToday() in live chat
# ============================================================
code = code.replace(
    "var aiLimit = _getAILimit();\n    var aiUsed = gameState.aiUsedToday || 0;\n    if (aiUsed < aiLimit && typeof callCozeAI === 'function') {",
    "var aiLimit = getAIMaxTotalToday();\n    var aiUsed = getAITotalUsageToday();\n    if (aiUsed < aiLimit && typeof callCozeAI === 'function') {"
)
code = code.replace(
    "gameState.aiUsedToday = (gameState.aiUsedToday || 0) + 1;",
    "recordAIUsage('live');"
)
changes.append('Live chat: fix _getAILimit() -> getAIMaxTotalToday(), use recordAIUsage')

# ============================================================
# FIX 7: KakaoTalk unread clearing - only clear per-chat
# ============================================================
code = code.replace(
    "if (page === 'kakaotalk' && gameState.kakaoChats) { var _kck = Object.keys(gameState.kakaoChats); for (var _kci = 0; _kci < _kck.length; _kci++) { var _kcm = gameState.kakaoChats[_kck[_kci]]; for (var _kcj = 0; _kcj < _kcm.length; _kcj++) _kcm[_kcj].read = true; } }",
    "/* KakaoTalk unread cleared per-chat when entering specific chat */"
)
# Add read clearing when opening specific chat
code = code.replace(
    "gameState.kakaoCurrentChat=this.dataset.fname;goToPage('kakaochat');",
    "gameState.kakaoCurrentChat=this.dataset.fname;if(gameState.kakaoChats&&gameState.kakaoChats[gameState.kakaoCurrentChat]){var _kmsgs=gameState.kakaoChats[gameState.kakaoCurrentChat];for(var _kmi=0;_kmi<_kmsgs.length;_kmi++){if(_kmsgs[_kmi].from!=='me')_kmsgs[_kmi].read=true;}}goToPage('kakaochat');"
)
changes.append('KakaoTalk: clear unread per-chat instead of bulk on page entry')

# ============================================================
# FIX 8: Exam button - add cursor:pointer for iOS click fix
# The CSS already has cursor:pointer on exam-entry but NOT on
# exam-comprehensive-entry.unlocked. Also add touch-action for iOS.
# ============================================================

# ============================================================
# FIX 9: Home page 2 - add swipe gesture support
# Currently only clickable dots, no swipe on iOS
# ============================================================
swipe_code = '''
// Home page swipe support
(function() {
    var _homeSwipeStartX = 0;
    var _homeSwipeStartY = 0;
    document.addEventListener('touchstart', function(e) {
        var pg = e.target.closest && e.target.closest('.page.active');
        if (!pg) return;
        // Check if this is the home page by looking for app-grid
        if (!pg.querySelector('.app-grid')) return;
        _homeSwipeStartX = e.touches[0].clientX;
        _homeSwipeStartY = e.touches[0].clientY;
    }, {passive: true});
    document.addEventListener('touchend', function(e) {
        if (_homeSwipeStartX === 0) return;
        var dx = e.changedTouches[0].clientX - _homeSwipeStartX;
        var dy = e.changedTouches[0].clientY - _homeSwipeStartY;
        _homeSwipeStartX = 0;
        if (Math.abs(dx) < 50 || Math.abs(dy) > Math.abs(dx)) return;
        var curPage = gameState.homePageNum || 1;
        if (dx < 0 && curPage === 1) { gameState.homePageNum = 2; render(); }
        else if (dx > 0 && curPage === 2) { gameState.homePageNum = 1; render(); }
    }, {passive: true});
})();

'''
# Insert swipe code right before the auto-save section at end of file
code = code.replace(
    'var autoSaveTimer = null;',
    swipe_code + 'var autoSaveTimer = null;'
)
changes.append('Home page: swipe left/right gesture to switch pages')

# ============================================================
# FIX 10: isExamInProgress can get stuck = true
# If user refreshes during exam, it stays true and blocks all navigation
# Reset it on page load
# ============================================================
# Find the init/load section
code = code.replace(
    'var isExamInProgress = false;',
    'var isExamInProgress = false;\n// Reset stuck exam state on load\n(function(){try{var _s=localStorage.getItem(_getSaveKey?_getSaveKey(0):"");if(_s){var _d=JSON.parse(_s);if(!_d||!_d.examResult||!_d.examResult._inProgress){isExamInProgress=false;}}}catch(e){}})();'
)
changes.append('Exam: reset stuck isExamInProgress on page load')

# Also add a safety reset in _ensureExamState
code = code.replace(
    "function _ensureExamState() {",
    "function _ensureExamState() {\n    if (currentPage !== 'examGame') isExamInProgress = false;"
)
changes.append('Exam: auto-reset isExamInProgress when not on exam page')

with open('/tmp/my-idol/v1.6.js', 'w', encoding='utf-8') as f:
    f.write(code)

print("v1.6.js patched successfully!")
for i, c in enumerate(changes, 1):
    print(f"  {i}. {c}")
