// ==================== V2.0 UI & DESIGN UPGRADE FEATURES ====================
// All functions use ES5 syntax only (var, traditional functions, no template literals)
// HTML uses entities (&lt; &gt; etc.), no emoji, SVG inline icons

// ==================== 1. V2 CSS STYLES INJECTION ====================
function _injectV2Styles() {
    if (document.getElementById('v2-styles')) return;
    var style = document.createElement('style');
    style.id = 'v2-styles';
    style.textContent = ''
        + '/* V2 Frosted Glass */'
        + '.v2-glass { backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.15); }'
        + '/* V2 Gradient Background */'
        + '.v2-gradient-bg { background: linear-gradient(135deg, #0F0C29 0%, #1A1A3E 50%, #24243E 100%); min-height: 100vh; }'
        + '/* V2 Title */'
        + '.v2-title { font-size: 22px; font-weight: 700; color: #FFF; letter-spacing: 0.05em; font-family: -apple-system,BlinkMacSystemFont,sans-serif; }'
        + '/* V2 Body */'
        + '.v2-body { font-size: 15px; color: #FFF; line-height: 1.6; font-family: -apple-system,BlinkMacSystemFont,sans-serif; }'
        + '/* V2 Dialogue */'
        + '.v2-dialogue { font-size: 16px; color: #FFF; line-height: 1.8; font-family: -apple-system,BlinkMacSystemFont,sans-serif; }'
        + '/* V2 Caption */'
        + '.v2-caption { font-size: 12px; color: #888; font-family: -apple-system,BlinkMacSystemFont,sans-serif; }'
        + '/* CSS Particle Float */'
        + '@keyframes v2-particle-float { 0%{transform:translateY(0) scale(1);opacity:0.6} 50%{opacity:1} 100%{transform:translateY(-100vh) scale(0.5);opacity:0} }'
        + '.v2-particle { position:fixed; width:3px; height:3px; background:rgba(167,139,250,0.5); border-radius:50%; pointer-events:none; animation:v2-particle-float 8s linear infinite; z-index:0; }'
        + '/* V2 Fade In */'
        + '@keyframes v2-fade-in { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }'
        + '.v2-fade-in { animation: v2-fade-in 0.6s ease-out; }'
        + '/* V2 Affection Feedback */'
        + '@keyframes v2-affection-feedback { 0%{opacity:1;transform:translateY(0)} 100%{opacity:0;transform:translateY(-30px)} }'
        + '.v2-affection-float { position:fixed; color:#FFD700; font-weight:700; font-size:16px; pointer-events:none; animation:v2-affection-feedback 2s ease-out forwards; z-index:9999; font-family:-apple-system,BlinkMacSystemFont,sans-serif; }'
        + '/* V2 Welcome Breathing */'
        + '@keyframes v2-breathing { 0%{transform:scale(1)} 50%{transform:scale(1.03)} 100%{transform:scale(1)} }'
        + '.v2-breathing { animation: v2-breathing 4s ease-in-out infinite; }'
        + '/* V2 Entry Animation */'
        + '@keyframes v2-entry-fade { 0%{opacity:0} 40%{opacity:1} 70%{opacity:1} 100%{opacity:0} }'
        + '.v2-entry-anim { animation: v2-entry-fade 3s ease-in-out forwards; }'
        + '/* V2 Pulse */'
        + '@keyframes v2-pulse { 0%{box-shadow:0 0 0 0 rgba(167,139,250,0.5)} 70%{box-shadow:0 0 0 10px rgba(167,139,250,0)} 100%{box-shadow:0 0 0 0 rgba(167,139,250,0)} }'
        + '.v2-pulse { animation: v2-pulse 2s infinite; }'
        + '/* V2 Status Glow */'
        + '@keyframes v2-status-glow { 0%{opacity:1} 100%{opacity:0} }'
        + '.v2-status-glow { position:fixed; top:0; left:0; right:0; bottom:0; pointer-events:none; z-index:9998; animation: v2-status-glow 3s ease-out forwards; }'
        + '/* V2 Welcome Button */'
        + '.v2-welcome-btn { display:inline-block; padding:12px 40px; border:1.5px solid #FFF; background:transparent; color:#FFF; font-size:15px; font-weight:600; border-radius:30px; cursor:pointer; font-family:-apple-system,BlinkMacSystemFont,sans-serif; letter-spacing:0.05em; transition:all 0.3s ease; -webkit-tap-highlight-color:transparent; }'
        + '.v2-welcome-btn:hover,.v2-welcome-btn:active { background:#FFF; color:#0F0C29; }'
        + '/* V2 Choice Hint */'
        + '@keyframes v2-hint-fade { from{opacity:0} to{opacity:1} }'
        + '.v2-choice-hint { font-size:12px; color:#888; margin-top:4px; animation:v2-hint-fade 0.3s ease-out; font-family:-apple-system,BlinkMacSystemFont,sans-serif; }'
        + '/* V2 Undo Button */'
        + '.v2-undo-btn { display:inline-block; padding:6px 16px; background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.2); color:#FFF; font-size:12px; border-radius:16px; cursor:pointer; margin-top:8px; font-family:-apple-system,BlinkMacSystemFont,sans-serif; -webkit-tap-highlight-color:transparent; transition:background 0.2s; }'
        + '.v2-undo-btn:hover,.v2-undo-btn:active { background:rgba(255,255,255,0.2); }'
        + '/* V2 Cutscene Overlay */'
        + '.v2-cutscene-overlay { position:fixed; top:0; left:0; width:100%; height:100%; z-index:10000; background:#000; display:flex; flex-direction:column; align-items:center; justify-content:center; cursor:pointer; }'
        + '.v2-cutscene-overlay img { max-width:100%; max-height:75vh; object-fit:contain; }'
        + '.v2-cutscene-text { color:#FFF; font-size:20px; font-weight:700; text-align:center; padding:20px 30px; font-family:-apple-system,BlinkMacSystemFont,sans-serif; letter-spacing:0.05em; }'
        + '.v2-cutscene-tap { color:rgba(255,255,255,0.5); font-size:12px; margin-top:16px; font-family:-apple-system,BlinkMacSystemFont,sans-serif; animation:v2-hint-fade 0.5s ease-out; }'
        + '/* V2 Progress Bar Gradient */'
        + '.v2-progress-fill { height:100%; border-radius:4px; background:linear-gradient(90deg,#A78BFA,#E879F9); transition:width 0.5s ease; }'
        + '/* V2 Progress Pulse Current */'
        + '@keyframes v2-progress-pulse { 0%{opacity:1} 50%{opacity:0.6} 100%{opacity:1} }'
        + '.v2-progress-current { animation:v2-progress-pulse 1.5s ease-in-out infinite; }'
        + '/* V2 Red Dot */'
        + '.v2-red-dot { position:absolute; top:-4px; right:-4px; min-width:16px; height:16px; background:#FF2D55; border-radius:8px; color:#FFF; font-size:10px; font-weight:700; display:flex; align-items:center; justify-content:center; padding:0 4px; font-family:-apple-system,BlinkMacSystemFont,sans-serif; }';
    document.head.appendChild(style);
}

// ==================== 2. LOGIN PAGE UPGRADE ====================
var _v2EntryAnimTimer = null;

function _playEntryAnimation() {
    var overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:#0F0C29;z-index:10001;display:flex;align-items:center;justify-content:center;flex-direction:column;';
    var logoSvg = '<svg width="80" height="80" viewBox="0 0 80 80" fill="none">'
        + '<circle cx="40" cy="40" r="36" stroke="#A78BFA" stroke-width="2" opacity="0.6"></circle>'
        + '<circle cx="40" cy="40" r="24" stroke="#A78BFA" stroke-width="1.5" opacity="0.4"></circle>'
        + '<polygon points="40,14 46,30 62,30 49,40 54,56 40,46 26,56 31,40 18,30 34,30" fill="#A78BFA" opacity="0.8"></polygon>'
        + '</svg>';
    overlay.innerHTML = '<div class="v2-entry-anim">' + logoSvg + '</div>'
        + '<div class="v2-entry-anim" style="color:#FFF;font-size:28px;font-weight:700;letter-spacing:0.15em;margin-top:16px;font-family:-apple-system,BlinkMacSystemFont,sans-serif;">myidol</div>';
    document.body.appendChild(overlay);
    _v2EntryAnimTimer = setTimeout(function() {
        if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
    }, 3200);
}

function _v2RenderWelcomeOverlay() {
    var container = document.getElementById('app');
    if (!container) return;
    var portraitUrl = 'imgs/portraits/haeun_halfbody.jpg';
    var html = '<div class="v2-gradient-bg" style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;position:relative;overflow:hidden;padding:40px 20px;">'
        + '<div id="v2-welcome-particles" style="position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;overflow:hidden;"></div>'
        + '<div style="position:absolute;right:-5%;bottom:0;height:85%;display:flex;align-items:flex-end;" class="v2-breathing">'
        + '<img src="' + portraitUrl + '" style="height:100%;object-fit:contain;opacity:0.6;filter:brightness(0.8);" onerror="this.style.display=\'none\'" />'
        + '</div>'
        + '<div style="position:relative;z-index:2;text-align:center;">'
        + '<div style="font-size:32px;font-weight:700;color:#FFF;letter-spacing:0.15em;font-family:-apple-system,BlinkMacSystemFont,sans-serif;margin-bottom:8px;" class="v2-fade-in">myidol</div>'
        + '<div style="font-size:12px;color:#888;letter-spacing:0.1em;font-family:-apple-system,BlinkMacSystemFont,sans-serif;" class="v2-fade-in">K-POP IDOL SIMULATOR</div>'
        + '<div style="margin-top:40px;" class="v2-fade-in">'
        + '<button class="v2-welcome-btn" onclick="_v2EntryAnimTimer&amp;&amp;clearTimeout(_v2EntryAnimTimer);startNewGame()">'
        + '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:middle;margin-right:6px;"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>'
        + 'Start'
        + '</button>'
        + '</div>'
        + '</div>'
        + '</div>';
    container.innerHTML = html;
    _createParticlesInContainer('v2-welcome-particles', 15);
}

// ==================== 3. APP RED DOT LINKAGE SYSTEM ====================
var _v2AppRedDots = {};

function updateAppRedDots() {
    _v2AppRedDots = {};
    if (!gameState || !gameState.player || !gameState.player.name) return;
    var appIds = ['contacts', 'sns', 'fancommunity', 'schedule', 'prroom', 'live', 'daily'];
    for (var i = 0; i < appIds.length; i++) {
        var count = (typeof getAppRedDot === 'function') ? getAppRedDot(appIds[i]) : 0;
        if (count) _v2AppRedDots[appIds[i]] = count;
    }
    if (gameState.chapterState) {
        var chapterKeys = Object.keys(gameState.chapterState);
        for (var ci = 0; ci < chapterKeys.length; ci++) {
            var ch = gameState.chapterState[chapterKeys[ci]];
            if (ch && !ch.completed) {
                var appId = ch.appId || 'daily';
                _v2AppRedDots[appId] = (_v2AppRedDots[appId] || 0) + 1;
            }
        }
    }
    if (gameState.player.role === 'Trainee') {
        var stats = gameState.stats;
        var avg = Math.round((stats.dance + stats.vocal + stats.rap + stats.acting + stats.variety) / 5);
        if (avg >= 120) {
            _v2AppRedDots['debut'] = (_v2AppRedDots['debut'] || 0) + 1;
        }
    }
}

function getAppRedDotCount(appId) {
    return _v2AppRedDots[appId] || 0;
}

function _v2RenderAppRedDot(appId) {
    var count = getAppRedDotCount(appId);
    if (count <= 0) return '';
    return '<div class="v2-red-dot">' + (count > 9 ? '9+' : count) + '</div>';
}

function markAppRead(appId) {
    if (_v2AppRedDots[appId]) {
        delete _v2AppRedDots[appId];
    }
}

// ==================== 4. CHAPTER PROGRESS VISUALIZATION ====================
var _v2ChapterData = {
    1: { title: '初入星途', nodes: ['audition', 'training_basic', 'first_eval'] },
    2: { title: '练习生生涯', nodes: ['skill_up', 'relationship_build', 'monthly_eval'] },
    3: { title: '出道考核', nodes: ['debut_prep', 'debut_audition', 'debut_result'] },
    4: { title: '爱豆之路', nodes: ['first_stage', 'fan_growth', 'first_win'] },
    5: { title: '巅峰时刻', nodes: ['comeback_prep', 'award_ceremony', 'grand_finale'] }
};

function _v2GetChapterProgress() {
    if (!gameState.chapterState) gameState.chapterState = {};
    var currentChapter = gameState.currentChapter || 1;
    var chapterInfo = _v2ChapterData[currentChapter];
    if (!chapterInfo) return { chapter: currentChapter, title: '', completed: 0, total: 0, currentNode: '' };
    var completed = 0;
    var currentNode = '';
    for (var i = 0; i < chapterInfo.nodes.length; i++) {
        var nodeId = chapterInfo.nodes[i];
        if (gameState.chapterState[nodeId] && gameState.chapterState[nodeId].completed) {
            completed++;
        } else if (!currentNode) {
            currentNode = nodeId;
        }
    }
    return { chapter: currentChapter, title: chapterInfo.title, completed: completed, total: chapterInfo.nodes.length, currentNode: currentNode };
}

function _getChapterProgressHtml() {
    var progress = _v2GetChapterProgress();
    if (!progress.title) return '';
    var pct = progress.total > 0 ? Math.round((progress.completed / progress.total) * 100) : 0;
    var html = '<div class="v2-glass" style="border-radius:12px;padding:12px 16px;margin-bottom:12px;">'
        + '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">'
        + '<div class="v2-title" style="font-size:15px;">' + '第' + progress.chapter + '章：' + progress.title + '</div>'
        + '<div class="v2-caption">' + '已完成 ' + progress.completed + '/' + progress.total + ' 节点</div>'
        + '</div>'
        + '<div style="width:100%;height:6px;background:rgba(255,255,255,0.1);border-radius:4px;overflow:hidden;">'
        + '<div class="v2-progress-fill" style="width:' + pct + '%;"></div>'
        + '</div>';
    if (progress.currentNode) {
        html += '<div style="display:flex;align-items:center;margin-top:6px;">'
            + '<div class="v2-progress-current" style="width:6px;height:6px;border-radius:50%;background:#A78BFA;margin-right:6px;"></div>'
            + '<div class="v2-caption" style="color:#A78BFA;">当前: ' + progress.currentNode + '</div>'
            + '</div>';
    }
    html += '</div>';
    return html;
}

// ==================== 5. PREREQUISITE PROGRESS BAR ====================
var _v2TrainingThresholds = {
    dance: { target: 120, label: '舞蹈' },
    vocal: { target: 120, label: '声乐' },
    rap: { target: 120, label: '说唱' },
    acting: { target: 120, label: '表演' },
    variety: { target: 120, label: '综艺' }
};

function _v2GetTrainingProgressBarHtml() {
    if (!gameState || !gameState.stats) return '';
    var html = '<div class="section-title" style="margin-top:16px;">出道目标进度</div>'
        + '<div class="card">';
    var keys = Object.keys(_v2TrainingThresholds);
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var info = _v2TrainingThresholds[key];
        var current = gameState.stats[key] || 0;
        var target = info.target;
        var pct = Math.min(100, Math.round((current / target) * 100));
        var met = current >= target;
        var fillColor = met ? '#4ADE80' : '#A78BFA';
        html += '<div style="margin-bottom:' + (i < keys.length - 1 ? '10' : '0') + 'px;">'
            + '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">'
            + '<span style="font-size:13px;color:#FFF;font-family:-apple-system,BlinkMacSystemFont,sans-serif;">' + info.label + '</span>'
            + '<span style="font-size:12px;color:' + (met ? '#4ADE80' : '#888') + ';font-family:-apple-system,BlinkMacSystemFont,sans-serif;">' + current + '/' + target + (met ? ' &#x2713;' : '') + '</span>'
            + '</div>'
            + '<div style="width:100%;height:4px;background:rgba(255,255,255,0.1);border-radius:2px;overflow:hidden;">'
            + '<div style="width:' + pct + '%;height:100%;border-radius:2px;background:' + fillColor + ';transition:width 0.5s ease;"></div>'
            + '</div>'
            + '</div>';
    }
    html += '</div>';
    return html;
}

// ==================== 6. AUTO-SKIP SATISFIED CONDITIONS ====================
function _v2CheckAndSkipCondition(nodeId, conditionFn, enterFn) {
    if (!gameState.chapterState) gameState.chapterState = {};
    if (gameState.chapterState[nodeId] && gameState.chapterState[nodeId].completed) {
        return true;
    }
    var satisfied = (typeof conditionFn === 'function') ? conditionFn() : false;
    if (satisfied) {
        gameState.chapterState[nodeId] = { completed: true, completedAt: Date.now() };
        if (typeof showToast === 'function') {
            showToast('你已满足条件，自动进入下一节点');
        }
        if (typeof enterFn === 'function') {
            setTimeout(function() { enterFn(); }, 800);
        }
        return true;
    }
    return false;
}

function _v2CheckDebutConditions() {
    if (!gameState || !gameState.stats || gameState.player.role !== 'Trainee') return false;
    var s = gameState.stats;
    return s.dance >= 120 && s.vocal >= 120 && s.rap >= 120 && s.acting >= 120 && s.variety >= 120
        && gameState.fans >= 5000 && (gameState.fame || 30) >= 100 && (gameState.influence || 50) >= 100
        && gameState.preDebut;
}

// ==================== 7. CHOICE UNDO MECHANISM ====================
var _v2ChoiceUndoState = {
    undoUsedThisChapter: false,
    currentChapter: 0,
    activeUndo: null,
    undoTimer: null
};

function _enableChoiceUndo(choiceId, callback) {
    var chapter = gameState.currentChapter || 1;
    if (_v2ChoiceUndoState.currentChapter !== chapter) {
        _v2ChoiceUndoState.currentChapter = chapter;
        _v2ChoiceUndoState.undoUsedThisChapter = false;
    }
    if (_v2ChoiceUndoState.undoUsedThisChapter) return;
    if (_v2ChoiceUndoState.undoTimer) {
        clearInterval(_v2ChoiceUndoState.undoTimer);
        _v2ChoiceUndoState.undoTimer = null;
    }
    _v2ChoiceUndoState.activeUndo = { choiceId: choiceId, callback: callback, timeLeft: 30 };
    _v2ShowUndoButton();
    _v2ChoiceUndoState.undoTimer = setInterval(function() {
        _v2ChoiceUndoState.activeUndo.timeLeft--;
        _v2UpdateUndoButton();
        if (_v2ChoiceUndoState.activeUndo.timeLeft <= 0) {
            clearInterval(_v2ChoiceUndoState.undoTimer);
            _v2ChoiceUndoState.undoTimer = null;
            _v2ChoiceUndoState.activeUndo = null;
            _v2HideUndoButton();
        }
    }, 1000);
}

function _v2ShowUndoButton() {
    _v2HideUndoButton();
    var btn = document.createElement('div');
    btn.id = 'v2-undo-container';
    btn.style.cssText = 'position:fixed;bottom:max(80px,env(safe-area-inset-bottom));left:50%;transform:translateX(-50%);z-index:9999;';
    btn.innerHTML = '<button class="v2-undo-btn" onclick="_v2DoUndo()">'
        + '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:middle;margin-right:4px;"><polyline points="1 4 1 10 7 10"></polyline><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path></svg>'
        + '撤销选择 (<span id="v2-undo-countdown">30</span>s)</button>';
    document.body.appendChild(btn);
}

function _v2UpdateUndoButton() {
    var el = document.getElementById('v2-undo-countdown');
    if (el && _v2ChoiceUndoState.activeUndo) {
        el.textContent = _v2ChoiceUndoState.activeUndo.timeLeft;
    }
}

function _v2HideUndoButton() {
    var el = document.getElementById('v2-undo-container');
    if (el && el.parentNode) el.parentNode.removeChild(el);
}

function _v2DoUndo() {
    if (!_v2ChoiceUndoState.activeUndo) return;
    if (_v2ChoiceUndoState.undoTimer) {
        clearInterval(_v2ChoiceUndoState.undoTimer);
        _v2ChoiceUndoState.undoTimer = null;
    }
    _v2ChoiceUndoState.undoUsedThisChapter = true;
    if (typeof _v2ChoiceUndoState.activeUndo.callback === 'function') {
        _v2ChoiceUndoState.activeUndo.callback();
    }
    _v2ChoiceUndoState.activeUndo = null;
    _v2HideUndoButton();
    if (typeof showToast === 'function') {
        showToast('选择已撤销');
    }
}

// ==================== 8. CHOICE PREVIEW HINT ====================
var _v2KeyChoiceIds = [
    'debut_group_select', 'dating_confess', 'kick_member', 'contract_sign',
    'comeback_concept', 'award_speech', 'scandal_response', 'dating_choice',
    'company_choice', 'position_choice'
];

function _isKeyChoice(choiceId) {
    for (var i = 0; i < _v2KeyChoiceIds.length; i++) {
        if (_v2KeyChoiceIds[i] === choiceId) return true;
    }
    return false;
}

function _v2GetChoiceHintHtml(choiceId) {
    if (!_isKeyChoice(choiceId)) return '';
    return '<div class="v2-choice-hint">'
        + '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:middle;margin-right:3px;"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>'
        + '这个选择将影响后续剧情</div>';
}

// ==================== 9. CUTSCENE ANIMATION PLACEHOLDER ====================
function showCutsceneImage(imageUrl, text, duration) {
    var overlay = document.createElement('div');
    overlay.className = 'v2-cutscene-overlay';
    overlay.style.opacity = '0';
    overlay.style.transition = 'opacity 0.8s ease';

    var innerHtml = '';
    if (imageUrl) {
        innerHtml += '<img src="' + imageUrl + '" style="opacity:0;transition:opacity 0.6s ease 0.3s;" onload="this.style.opacity=1" onerror="this.style.display=\'none\'" />';
    }
    if (text) {
        innerHtml += '<div class="v2-cutscene-text" style="opacity:0;transition:opacity 0.6s ease 0.6s;">' + text + '</div>';
    }
    innerHtml += '<div class="v2-cutscene-tap" style="opacity:0;transition:opacity 0.4s ease 1.2s;">点击继续</div>';
    overlay.innerHTML = innerHtml;

    overlay.onclick = function() {
        overlay.style.opacity = '0';
        setTimeout(function() {
            if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
        }, 800);
    };

    document.body.appendChild(overlay);
    setTimeout(function() { overlay.style.opacity = '1'; }, 50);

    if (duration && duration > 0) {
        setTimeout(function() {
            overlay.style.opacity = '0';
            setTimeout(function() {
                if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
            }, 800);
        }, duration);
    }
}

// ==================== 10. PARTICLE SYSTEM ====================
function _createParticles(count) {
    var existing = document.querySelectorAll('.v2-particle');
    for (var ei = 0; ei < existing.length; ei++) {
        if (existing[ei].parentNode) existing[ei].parentNode.removeChild(existing[ei]);
    }
    if (!count || count <= 0) return;
    for (var i = 0; i < count; i++) {
        var p = document.createElement('div');
        p.className = 'v2-particle';
        var x = Math.floor(Math.random() * 100);
        var delay = Math.floor(Math.random() * 8);
        var size = 2 + Math.floor(Math.random() * 3);
        p.style.left = x + '%';
        p.style.bottom = '-10px';
        p.style.animationDelay = delay + 's';
        p.style.width = size + 'px';
        p.style.height = size + 'px';
        document.body.appendChild(p);
    }
}

function _createParticlesInContainer(containerId, count) {
    var container = document.getElementById(containerId);
    if (!container) return;
    var existing = container.querySelectorAll('.v2-particle');
    for (var ei = 0; ei < existing.length; ei++) {
        if (existing[ei].parentNode) existing[ei].parentNode.removeChild(existing[ei]);
    }
    for (var i = 0; i < count; i++) {
        var p = document.createElement('div');
        p.className = 'v2-particle';
        var x = Math.floor(Math.random() * 100);
        var delay = Math.floor(Math.random() * 8);
        var size = 2 + Math.floor(Math.random() * 3);
        p.style.left = x + '%';
        p.style.bottom = '-10px';
        p.style.animationDelay = delay + 's';
        p.style.width = size + 'px';
        p.style.height = size + 'px';
        p.style.position = 'absolute';
        container.appendChild(p);
    }
}

// ==================== 11. CHARACTER STATUS EFFECT ====================
function showStatusEffect(type) {
    var colorMap = {
        gold: '#FFD700',
        purple: '#A78BFA',
        red: '#FF2D55'
    };
    var glowColor = colorMap[type] || '#A78BFA';
    var glow = document.createElement('div');
    glow.className = 'v2-status-glow';
    glow.style.boxShadow = 'inset 0 0 80px 20px ' + glowColor;
    document.body.appendChild(glow);
    setTimeout(function() {
        if (glow.parentNode) glow.parentNode.removeChild(glow);
    }, 3100);
}

function _v2ShowAffectionFloat(npcName, amount) {
    var el = document.createElement('div');
    el.className = 'v2-affection-float';
    el.textContent = '+' + amount + ' ' + npcName;
    el.style.left = '50%';
    el.style.top = '50%';
    el.style.transform = 'translateX(-50%)';
    document.body.appendChild(el);
    setTimeout(function() {
        if (el.parentNode) el.parentNode.removeChild(el);
    }, 2100);
}

// ==================== 12. NPC PROACTIVE DIALOGUE ====================
var _v2NpcProactiveState = {
    lastTriggerTime: 0,
    minInterval: 180000
};

var _v2NpcDailyMessages = [
    '今天天气不错呢',
    '你吃了吗？',
    '练习加油！',
    '最近有没有新歌推荐？',
    '休息的时候多喝水',
    '明天见~',
    '一起加油吧',
    '你看起来精神不错',
    '有空一起吃宵夜',
    '看到你心情就好了'
];

function _triggerNpcProactiveMessage() {
    if (!gameState || !gameState.player || !gameState.player.name) return;
    if (!gameState.kakaoFriends || gameState.kakaoFriends.length <= 1) return;

    var now = Date.now();
    if (now - _v2NpcProactiveState.lastTriggerTime < _v2NpcProactiveState.minInterval) return;

    var candidates = [];
    for (var i = 0; i < gameState.kakaoFriends.length; i++) {
        var friend = gameState.kakaoFriends[i];
        if (friend.isManager) continue;
        var affection = (gameState.npc好感度 && gameState.npc好感度[friend.name]) || 0;
        if (affection >= 20) {
            candidates.push({ friend: friend, affection: affection });
        }
    }

    if (candidates.length === 0) return;

    _v2NpcProactiveState.lastTriggerTime = now;

    var chosen = candidates[Math.floor(Math.random() * candidates.length)];
    var npc = chosen.friend;
    var affection = chosen.affection;

    var msg = '';
    if (typeof NPC_PROACTIVE_MSGS !== 'undefined') {
        var tier = 'low';
        var isDating = gameState.dating === npc.name;
        if (isDating) tier = 'dating';
        else if (affection >= 70) tier = 'high';
        else if (affection >= 30) tier = 'mid';
        else tier = 'low';

        var pool = NPC_PROACTIVE_MSGS.kakaotalk[tier] || NPC_PROACTIVE_MSGS.kakaotalk.low;
        msg = pool[Math.floor(Math.random() * pool.length)];
    } else {
        msg = _v2NpcDailyMessages[Math.floor(Math.random() * _v2NpcDailyMessages.length)];
    }

    var nowDate = new Date();
    var h = nowDate.getHours();
    var m = nowDate.getMinutes();
    var timeStr = (h < 10 ? '0' : '') + h + ':' + (m < 10 ? '0' : '') + m;

    if (!gameState.kakaoChats) gameState.kakaoChats = {};
    if (!gameState.kakaoChats[npc.name]) gameState.kakaoChats[npc.name] = [];
    gameState.kakaoChats[npc.name].push({ from: npc.name, text: msg, time: timeStr, read: false });

    if (typeof notifyKakao === 'function') {
        notifyKakao(npc.name, msg.substring(0, 30));
    }

    updateAppRedDots();
}

function _v2CheckProactiveOnEnter() {
    if (!gameState || !gameState.player || !gameState.player.name) return;
    if (!gameState.npc好感度 || !gameState.kakaoFriends) return;
    var hasHighAffection = false;
    var npcKeys = Object.keys(gameState.npc好感度);
    for (var i = 0; i < npcKeys.length; i++) {
        if (gameState.npc好感度[npcKeys[i]] >= 20) {
            hasHighAffection = true;
            break;
        }
    }
    if (!hasHighAffection) return;
    if (Math.random() < 0.3) {
        _triggerNpcProactiveMessage();
    }
}

// ==================== INITIALIZATION HOOK ====================
function _v2Init() {
    _injectV2Styles();
    updateAppRedDots();
}

if (typeof document !== 'undefined' && document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', _v2Init);
} else if (typeof document !== 'undefined') {
    _v2Init();
}
