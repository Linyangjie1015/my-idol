const fs = require('fs');
const acorn = require('acorn');

let code = fs.readFileSync('game.js', 'utf8');

// Add NPC_PORTRAITS data at the top (after var gameState)
const portraitData = `
// ==================== V2: NPC PORTRAITS ====================
var NPC_PORTRAITS = {
    'haeun': { name: '\u590f\u6069', main: 'imgs/portraits/haeun_halfbody.jpg', smile: 'imgs/portraits/haeun_smile.jpg', sad: 'imgs/portraits/haeun_sad.jpg', blink_half: 'imgs/portraits/haeun_blink_half.jpg', blink_full: 'imgs/portraits/haeun_blink_full.jpg' },
    'soah': { name: '\u7d20\u96c5', main: 'imgs/portraits/soah_halfbody.jpg', smile: 'imgs/portraits/soah_smile.jpg', sad: 'imgs/portraits/soah_sad.jpg', blink_half: 'imgs/portraits/soah_blink_half.jpg', blink_full: 'imgs/portraits/soah_blink_full.jpg' },
    'jiwon': { name: '\u667a\u5a9b', main: 'imgs/portraits/jiwon_halfbody.jpg', smile: 'imgs/portraits/jiwon_smile.jpg', sad: 'imgs/portraits/jiwon_sad.jpg', blink_half: 'imgs/portraits/jiwon_blink_half.jpg', blink_full: 'imgs/portraits/jiwon_blink_full.jpg' },
    'junho': { name: '\u4fca\u660a', main: 'imgs/portraits/junho_halfbody.jpg', smile: 'imgs/portraits/junho_smile.jpg', sad: 'imgs/portraits/junho_sad.jpg', blink_half: 'imgs/portraits/junho_blink_half.jpg', blink_full: 'imgs/portraits/junho_blink_full.jpg' },
    'seokhyun': { name: '\u745e\u8d24', main: 'imgs/portraits/seokhyun_halfbody.jpg', smile: 'imgs/portraits/seokhyun_smile.jpg', sad: 'imgs/portraits/seokhyun_sad.jpg', blink_half: 'imgs/portraits/seokhyun_blink_half.jpg', blink_full: 'imgs/portraits/seokhyun_blink_full.jpg' }
};

function getNpcPortraitHtml(npcKey, expression, widthPct) {
    var p = NPC_PORTRAITS[npcKey];
    if (!p) return '';
    var expr = expression || 'main';
    var src = p[expr] || p.main;
    var w = widthPct || 40;
    return '<div style="position:relative;width:' + w + '%;height:100%;overflow:hidden;">'
        + '<img src="' + src + '" style="width:100%;height:100%;object-fit:cover;object-position:top center;animation:portrait-breathe 3s ease-in-out infinite;" onerror="this.style.display=\'none\'">'
        + '</div>';
}

function getNpcKeyByName(npcName) {
    var nameMap = {
        '\u590f\u6069': 'haeun', '\u7d20\u96c5': 'soah', '\u667a\u5a9b': 'jiwon', '\u4fca\u660a': 'junho', '\u745e\u8d24': 'seokhyun'
    };
    return nameMap[npcName] || '';
}
`;

// Find a good insertion point - after the HIDDEN_DIALOGUES variable declaration
const insertAfter = 'var HIDDEN_DIALOGUES = {};';
const idx = code.indexOf(insertAfter);
if (idx >= 0) {
    code = code.substring(0, idx + insertAfter.length) + portraitData + code.substring(idx + insertAfter.length);
    console.log('NPC_PORTRAITS inserted');
}

// Add BGM Manager
const bgmManager = `

// ==================== V2: BGM MANAGER ====================
var BGMManager = {
    currentAudio: null,
    currentScene: '',
    volume: parseFloat(localStorage.getItem('myidol_bgm_vol') || '0.5'),
    playlists: {
        practice: { name: '\u7ec3\u4e60\u5ba4', url: '' },
        company: { name: '\u516c\u53f8', url: '' },
        dorm: { name: '\u5bbf\u820d', url: '' },
        stage: { name: '\u821e\u53f0', url: '' }
    },
    play: function(scene) {
        if (this.currentScene === scene && this.currentAudio) return;
        this.stop();
        this.currentScene = scene;
        var track = this.playlists[scene];
        if (!track || !track.url) return;
        var audio = new Audio(track.url);
        audio.loop = true;
        audio.volume = this.volume;
        audio.play().catch(function() {});
        this.currentAudio = audio;
    },
    stop: function() {
        if (this.currentAudio) {
            this.currentAudio.pause();
            this.currentAudio = null;
        }
        this.currentScene = '';
    },
    setVolume: function(v) {
        this.volume = v;
        localStorage.setItem('myidol_bgm_vol', v.toString());
        if (this.currentAudio) this.currentAudio.volume = v;
    }
};

var SFXManager = {
    volume: parseFloat(localStorage.getItem('myidol_sfx_vol') || '0.7'),
    sounds: {},
    play: function(type) {
        var url = '';
        if (type === 'click') url = '';
        else if (type === 'chapter_unlock') url = '';
        else if (type === 'affection_up') url = '';
        else if (type === 'fanfare') url = '';
        else if (type === 'heartbeat') url = '';
        if (!url) return;
        var audio = new Audio(url);
        audio.volume = this.volume;
        audio.play().catch(function() {});
    },
    setVolume: function(v) {
        this.volume = v;
        localStorage.setItem('myidol_sfx_vol', v.toString());
    }
};

function playSFX(type) { SFXManager.play(type); }
`;

code += bgmManager;

// Add V2 CSS injection function
const v2css = `

// ==================== V2: CSS & ANIMATIONS ====================
function _injectV2Styles() {
    if (document.getElementById('v2-styles')) return;
    var style = document.createElement('style');
    style.id = 'v2-styles';
    style.textContent = '\\n'
        + '@keyframes portrait-breathe { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-2px)} }\\n'
        + '@keyframes portrait-blink { 0%,45%,55%,100%{opacity:1} 50%{opacity:0} }\\n'
        + '@keyframes v2-particle-float { 0%{transform:translateY(0) scale(1);opacity:0.6} 50%{opacity:1} 100%{transform:translateY(-100vh) scale(0.5);opacity:0} }\\n'
        + '@keyframes v2-fade-in { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }\\n'
        + '@keyframes v2-pulse { 0%,100%{opacity:1} 50%{opacity:0.6} }\\n'
        + '@keyframes v2-affection-float { 0%{opacity:1;transform:translateY(0)} 100%{opacity:0;transform:translateY(-30px)} }\\n'
        + '@keyframes v2-glow-gold { 0%,100%{box-shadow:0 0 0 rgba(255,215,0,0)} 50%{box-shadow:0 0 30px rgba(255,215,0,0.4)} }\\n'
        + '@keyframes v2-glow-purple { 0%,100%{box-shadow:0 0 0 rgba(167,139,250,0)} 50%{box-shadow:0 0 30px rgba(167,139,250,0.4)} }\\n'
        + '@keyframes v2-glow-red { 0%,100%{box-shadow:0 0 0 rgba(239,68,68,0)} 50%{box-shadow:0 0 30px rgba(239,68,68,0.4)} }\\n'
        + '.v2-glass { backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.15);border-radius:12px; }\\n'
        + '.v2-fade-in { animation:v2-fade-in 0.6s ease-out; }\\n'
        + '.v2-particle { position:fixed;width:3px;height:3px;background:rgba(167,139,250,0.5);border-radius:50%;pointer-events:none;animation:v2-particle-float 8s linear infinite; }\\n'
        + '.v2-affection-float { position:fixed;color:#FFD700;font-weight:700;font-size:16px;pointer-events:none;animation:v2-affection-float 2s ease-out forwards;z-index:9999; }\\n'
        + '.v2-red-dot { position:absolute;top:-4px;right:-4px;min-width:16px;height:16px;background:#EF4444;border-radius:8px;color:#FFF;font-size:9px;display:flex;align-items:center;justify-content:center;font-weight:700; }\\n';
    document.head.appendChild(style);
}

// V2: Visual pause overlay
function showVisualPause(text, duration) {
    var dur = duration || 4000;
    var overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.7);display:flex;align-items:center;justify-content:center;z-index:10000;opacity:0;transition:opacity 0.5s;cursor:pointer;';
    overlay.innerHTML = '<div style="color:#FFF;font-size:20px;letter-spacing:0.1em;text-align:center;max-width:80%;">' + (text || '') + '</div>';
    document.body.appendChild(overlay);
    setTimeout(function() { overlay.style.opacity = '1'; }, 50);
    var dismiss = function() {
        overlay.style.opacity = '0';
        setTimeout(function() { if (overlay.parentNode) overlay.parentNode.removeChild(overlay); }, 500);
    };
    overlay.addEventListener('click', dismiss);
    setTimeout(dismiss, dur);
}

// V2: Atmosphere transition
function showAtmosphereTransition(text) {
    var overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(15,12,41,0.85);display:flex;align-items:center;justify-content:center;z-index:9999;opacity:0;transition:opacity 0.5s;';
    overlay.innerHTML = '<div style="color:rgba(255,255,255,0.7);font-size:14px;letter-spacing:0.05em;text-align:center;">' + (text || '') + '</div>';
    document.body.appendChild(overlay);
    setTimeout(function() { overlay.style.opacity = '1'; }, 50);
    setTimeout(function() { overlay.style.opacity = '0'; setTimeout(function() { if (overlay.parentNode) overlay.parentNode.removeChild(overlay); }, 500); }, 3000);
}

// V2: Status effect (screen edge glow)
function showStatusEffect(type) {
    var color = type === 'gold' ? 'rgba(255,215,0,0.4)' : type === 'purple' ? 'rgba(167,139,250,0.4)' : 'rgba(239,68,68,0.4)';
    var animName = type === 'gold' ? 'v2-glow-gold' : type === 'purple' ? 'v2-glow-purple' : 'v2-glow-red';
    var overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;pointer-events:none;z-index:9998;animation:' + animName + ' 3s ease-in-out;';
    document.body.appendChild(overlay);
    setTimeout(function() { if (overlay.parentNode) overlay.parentNode.removeChild(overlay); }, 3000);
}

// V2: Affection feedback floating text
function showAffectionFloat(amount, x, y) {
    var el = document.createElement('div');
    el.className = 'v2-affection-float';
    el.textContent = '+' + amount;
    el.style.left = (x || window.innerWidth / 2) + 'px';
    el.style.top = (y || window.innerHeight / 2) + 'px';
    document.body.appendChild(el);
    setTimeout(function() { if (el.parentNode) el.parentNode.removeChild(el); }, 2000);
}

// V2: Chapter unlock animation
function showChapterUnlockAnimation(chapterNum) {
    var overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(15,12,41,0.95);display:flex;align-items:center;justify-content:center;z-index:10001;perspective:1000px;';
    var chapterNames = {1:'\u5165\u793e',2:'\u6210\u957f',3:'\u51fa\u9053'};
    var chName = chapterNames[chapterNum] || '\u7b2c' + chapterNum + '\u7ae0';
    overlay.innerHTML = '<div style="text-align:center;animation:v2-fade-in 1s ease-out;">'
        + '<div style="font-size:14px;color:#A78BFA;letter-spacing:0.2em;margin-bottom:8px;">CHAPTER ' + chapterNum + '</div>'
        + '<div style="font-size:28px;font-weight:700;color:#FFF;letter-spacing:0.1em;">' + chName + '</div>'
        + '<div style="width:40px;height:2px;background:linear-gradient(90deg,transparent,#A78BFA,transparent);margin:16px auto;"></div>'
        + '</div>';
    document.body.appendChild(overlay);
    setTimeout(function() {
        overlay.style.transition = 'opacity 0.5s';
        overlay.style.opacity = '0';
        setTimeout(function() { if (overlay.parentNode) overlay.parentNode.removeChild(overlay); }, 500);
    }, 2000);
}

// V2: Particle system
function _createParticles(count) {
    for (var i = 0; i < count; i++) {
        var p = document.createElement('div');
        p.className = 'v2-particle';
        p.style.left = Math.random() * 100 + 'vw';
        p.style.top = (80 + Math.random() * 20) + 'vh';
        p.style.animationDelay = (Math.random() * 8) + 's';
        p.style.animationDuration = (6 + Math.random() * 6) + 's';
        document.body.appendChild(p);
        (function(el) {
            setTimeout(function() { if (el.parentNode) el.parentNode.removeChild(el); }, 15000);
        })(p);
    }
}

// V2: Daily greeting
function getDailyGreeting() {
    if (!gameState.npc好感度) return null;
    var highest = 0, topNpc = '';
    for (var name in gameState.npc好感度) {
        if (gameState.npc好感度[name] > highest) {
            highest = gameState.npc好感度[name];
            topNpc = name;
        }
    }
    if (!topNpc || highest < 20) return null;
    var hour = new Date().getHours();
    var period = hour < 12 ? '\u65e9\u4e0a' : hour < 18 ? '\u4e0b\u5348' : '\u665a\u4e0a';
    var greetings = {
        '\u65e9\u4e0a': ['\u65e9\u5b89\uff01\u4eca\u5929\u4e5f\u8981\u52a0\u6cb9\u54e6~', '\u8d77\u5f97\u597d\u65e9\uff01\u7ec3\u4e60\u53bb\u4e86\u5417\uff1f', '\u65b0\u7684\u4e00\u5929\u5f00\u59cb\u4e86\uff01'],
        '\u4e0b\u5348': ['\u4e0b\u5348\u597d\uff01\u8fa3\u6761\u600e\u4e48\u6837\u4e86\uff1f', '\u8fd8\u597d\u5417\uff1f\u8bb0\u5f97\u4f11\u606f\u54e6~', '\u4e0b\u5348\u4e5f\u8981\u51b2\u5440\uff01'],
        '\u665a\u4e0a': ['\u665a\u5b89~\u4eca\u5929\u8f9b\u82e6\u4e86\uff01', '\u8be5\u4f11\u606f\u4e86\u54e6\uff01\u665a\u5b89~', '\u597d\u597d\u7761\u4e00\u89c9\uff0c\u660e\u5929\u7ee7\u7eed\u52a0\u6cb9\uff01']
    };
    var pool = greetings[period] || greetings['\u4e0b\u5348'];
    var msg = pool[Math.floor(Math.random() * pool.length)];
    return { npc: topNpc, message: msg };
}

// V2: NPC memory context for AI dialogue
function getNpcMemoryContext(npcName) {
    if (!gameState.chapterState || !gameState.chapterState.choiceHistory) return '';
    var memories = [];
    var choices = gameState.chapterState.choiceHistory;
    for (var i = 0; i < choices.length; i++) {
        var c = choices[i];
        if (c.affectedNpc === npcName || c.npcName === npcName) {
            memories.push('\u4f60\u66fe\u5728\u7b2c' + (c.chapter || 1) + '\u7ae0\u9009\u62e9\u4e86\u300c' + (c.choice || '') + '\u300d');
        }
    }
    return memories.join('\u3002');
}

// V2: Affection tone system
function _getAffectionTone(npcName) {
    var aff = (gameState.npc好感度 && gameState.npc好感度[npcName]) || 0;
    if (aff >= 80) return { stage: '\u4e13\u5c5e', color: '#FFD700', prefix: '\uff08\u6df1\u60c5\u5730\uff09' };
    if (aff >= 60) return { stage: '\u4eb2\u5bc6', color: '#F472B6', prefix: '\uff08\u6e29\u67d4\u5730\uff09' };
    if (aff >= 40) return { stage: '\u6697\u6627', color: '#E879F9', prefix: '\uff08\u7565\u5e26\u5173\u5fc3\uff09' };
    if (aff >= 20) return { stage: '\u719f\u6089', color: '#A78BFA', prefix: '' };
    return { stage: '\u964c\u751f', color: '#888888', prefix: '\uff08\u51b7\u6de1\u5730\uff09' };
}

// V2: Affection stage HTML
function _getAffectionStageHtml(npcName) {
    var tone = _getAffectionTone(npcName);
    var aff = (gameState.npc好感度 && gameState.npc好感度[npcName]) || 0;
    var pct = Math.min(100, aff);
    return '<div style="display:flex;align-items:center;gap:6px;">'
        + '<div style="width:8px;height:8px;border-radius:50%;background:' + tone.color + ';"></div>'
        + '<span style="font-size:12px;color:' + tone.color + ';font-weight:600;">' + tone.stage + '</span>'
        + '<div style="flex:1;height:4px;background:rgba(255,255,255,0.1);border-radius:2px;overflow:hidden;">'
        + '<div style="width:' + pct + '%;height:100%;background:' + tone.color + ';border-radius:2px;transition:width 0.3s;"></div>'
        + '</div>'
        + '<span style="font-size:11px;color:#888;">' + aff + '</span>'
        + '</div>';
}

// V2: Show sub-page (ranking/wiki/achievements)
function _showSubPage(page) {
    var title = '';
    var content = '';
    if (page === 'ranking') {
        title = '\u6392\u884c\u699c';
        content = '<div style="text-align:center;padding:40px 20px;color:#888;">'
            + '<div style="font-size:16px;font-weight:600;color:#FFF;margin-bottom:8px;">\u4eba\u6c14\u6392\u884c\u699c</div>'
            + '<div style="margin:16px 0;padding:12px;background:rgba(167,139,250,0.15);border-radius:8px;">'
            + '<div style="font-size:14px;color:#A78BFA;">\u4f60\u7684\u6392\u540d</div>'
            + '<div style="font-size:24px;font-weight:700;color:#FFF;">#' + (Math.max(1, 100 - Math.floor((gameState.fans || 0) / 50))) + '</div>'
            + '</div>'
            + '<div style="font-size:12px;color:#888;">\u7c89\u4e1d: ' + (gameState.fans || 0).toLocaleString() + ' | \u540d\u6c14: ' + (gameState.fame || 0) + '</div>'
            + '</div>';
    } else if (page === 'wiki') {
        title = 'Kpop\u767e\u79d1';
        content = '<div style="text-align:center;padding:20px;color:#888;">'
            + '<div style="font-size:16px;font-weight:600;color:#FFF;margin-bottom:12px;">K-Pop\u77e5\u8bc6\u95ee\u7b54</div>'
            + '<div style="font-size:13px;">\u5373\u5c06\u5f00\u653e\uff0c\u656c\u8bf7\u671f\u5f85\uff01</div>'
            + '</div>';
    } else if (page === 'achievements') {
        title = '\u6210\u5c31';
        var achList = gameState.achievements || [];
        content = '<div style="padding:20px;">'
            + '<div style="font-size:16px;font-weight:600;color:#FFF;margin-bottom:12px;">\u6210\u5c31\u8fdb\u5ea6</div>';
        if (achList.length === 0) {
            content += '<div style="text-align:center;color:#888;padding:20px;font-size:13px;">\u8fd8\u6ca1\u6709\u89e3\u9501\u6210\u5c31\uff0c\u7ee7\u7eed\u52aa\u529b\u5427\uff01</div>';
        } else {
            for (var ai = 0; ai < achList.length; ai++) {
                content += '<div style="padding:8px 12px;margin:4px 0;background:rgba(167,139,250,0.1);border-radius:8px;">'
                    + '<span style="color:#A78BFA;font-weight:600;">' + achList[ai] + '</span></div>';
            }
        }
        content += '</div>';
    }
    showModal(title, content);
}

// V2: Chapter review modal
function renderChapterReviewModal(chapterNum) {
    var cs = gameState.chapterState;
    if (!cs || !cs.choiceHistory) return;
    var choices = [];
    for (var i = 0; i < cs.choiceHistory.length; i++) {
        if (cs.choiceHistory[i].chapter === chapterNum) {
            choices.push(cs.choiceHistory[i]);
        }
    }
    var html = '<div style="padding:16px;">';
    html += '<div style="font-size:16px;font-weight:700;color:#FFF;margin-bottom:12px;">\u7b2c' + chapterNum + '\u7ae0 \u9009\u62e9\u56de\u987e</div>';
    if (choices.length === 0) {
        html += '<div style="color:#888;font-size:13px;">\u672c\u7ae0\u6682\u65e0\u5173\u952e\u9009\u62e9</div>';
    } else {
        for (var j = 0; j < choices.length; j++) {
            var c = choices[j];
            html += '<div style="padding:8px 12px;margin:6px 0;background:rgba(255,255,255,0.05);border-radius:8px;border-left:3px solid #A78BFA;">'
                + '<div style="font-size:13px;color:#FFF;">\u4f60\u9009\u62e9\u4e86\u300c' + (c.choice || '...') + '\u300d</div>'
                + '</div>';
        }
        html += '<div style="font-size:11px;color:#888;margin-top:12px;text-align:center;">\u8fd9\u4e9b\u9009\u62e9\u5c06\u5728\u540e\u7eed\u7ae0\u8282\u4e2d\u4ea7\u751f\u56de\u54cd</div>';
    }
    html += '</div>';
    showModal('\u7ae0\u8282\u56de\u987e', html);
}

// V2: Entry animation
function _playEntryAnimation(callback) {
    var overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:#0F0C29;display:flex;align-items:center;justify-content:center;z-index:99999;';
    overlay.innerHTML = '<div style="text-align:center;opacity:0;transition:opacity 2s;">'
        + '<div style="font-size:32px;font-weight:700;color:#FFF;letter-spacing:0.15em;font-family:-apple-system,sans-serif;">myidol</div>'
        + '</div>';
    document.body.appendChild(overlay);
    setTimeout(function() { overlay.firstChild.style.opacity = '1'; }, 100);
    setTimeout(function() { overlay.firstChild.style.opacity = '0'; }, 3000);
    setTimeout(function() {
        var welcome = document.createElement('div');
        welcome.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:#0F0C29;display:flex;align-items:center;justify-content:center;z-index:99999;opacity:0;transition:opacity 1s;';
        welcome.innerHTML = '<div style="color:rgba(255,255,255,0.7);font-size:16px;letter-spacing:0.1em;">\u6b22\u8fce\u6765\u5230 SEONGWOO ENT</div>';
        document.body.appendChild(overlay);
        if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
        document.body.appendChild(welcome);
        setTimeout(function() { welcome.style.opacity = '1'; }, 50);
        setTimeout(function() {
            welcome.style.opacity = '0';
            setTimeout(function() {
                if (welcome.parentNode) welcome.parentNode.removeChild(welcome);
                if (callback) callback();
            }, 1000);
        }, 2000);
    }, 3500);
}

// V2: Inject styles on load
if (typeof window !== 'undefined' && window.document) {
    _injectV2Styles();
}
`;

code += v2css;

try {
    acorn.parse(code, {ecmaVersion: 5, sourceType: 'script'});
    fs.writeFileSync('game.js', code, 'utf8');
    console.log('OK: Portraits + BGM + V2 CSS + all functions added');
    console.log('Lines:', code.split('\n').length);
} catch(e) {
    console.log('ERROR:', e.message.substring(0,100), 'line', e.loc?.line);
}
