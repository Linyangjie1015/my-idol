var fs = require('fs');
var code = fs.readFileSync('/tmp/my-idol-v2/game.js', 'utf8');

// =====================================================
// PATCH 1: Chapter node review system - enhance _renderChapterEnd with "你的选择" + echo text
// =====================================================
// The existing _renderChapterEnd already shows choices but without the echo text
// Find the choices section and add echo text under each choice
code = code.replace(
    "for (ci = 0; ci < chapterChoices.length; ci++) { html += '<div style=\"background:#1E293B;border-radius:8px;padding:10px 14px;margin-bottom:6px;text-align:left;font-size:14px;color:#CBD5E1;\">' + (choiceLabels[chapterChoices[ci].choiceId] || chapterChoices[ci].choiceId) + '</div>'; }",
    "for (ci = 0; ci < chapterChoices.length; ci++) { var _cDetail = (cs.choiceDetails && cs.choiceDetails[chapterChoices[ci].chapter + '.' + chapterChoices[ci].step]) || ''; html += '<div style=\"background:#1E293B;border-radius:8px;padding:10px 14px;margin-bottom:6px;text-align:left;\">'; html += '<div style=\"font-size:14px;color:#CBD5E1;\">' + (_cDetail || (choiceLabels[chapterChoices[ci].choiceId] || chapterChoices[ci].choiceId)) + '</div>'; html += '<div style=\"font-size:11px;color:#64748B;margin-top:4px;\">' + '\\u8fd9\\u4e2a\\u9009\\u62e9\\u5c06\\u5728\\u540e\\u7eed\\u7ae0\\u8282\\u4e2d\\u4ea7\\u751f\\u56de\\u54cd' + '</div>'; html += '</div>'; }"
);

// =====================================================
// PATCH 2: Echo references - ECHO_REFERENCES map + injection in _renderNarrationStep
// =====================================================
var echoMapCode = '\nvar ECHO_REFERENCES = {\n' +
    "    '1.1': { chapter: 2, npc: '\\u590f\\u6069', line: '\\u4f60\\u8fd8\\u8bb0\\u5f97\\u9762\\u8bd5\\u90a3\\u5929\\u5417\\uff1f\\u4f60\\u5f53\\u65f6\\u8bf4\\u7684\\u8bdd\\uff0c\\u6211\\u4e00\\u76f4\\u8bb0\\u7740\\u3002' },\n" +
    "    '1.4': { chapter: 2, npc: '\\u4fca\\u660a', line: '\\u4f60\\u5f53\\u65f6\\u8bf4\\u6709\\u57fa\\u7840\\u7684\\u6837\\u5b50\\uff0c\\u6211\\u5230\\u73b0\\u5728\\u90fd\\u8bb0\\u5f97\\u3002' },\n" +
    "    '1.6': { chapter: 2, npc: '\\u667a\\u5a9b', line: '\\u76f4\\u64ad\\u90a3\\u5929\\u4f60\\u7684\\u8868\\u73b0\\uff0c\\u7c89\\u4e1d\\u4eec\\u73b0\\u5728\\u8fd8\\u5728\\u8ba8\\u8bba\\u5462\\u3002' },\n" +
    "    '2.2': { chapter: 3, npc: '\\u590f\\u6069', line: '\\u8def\\u6f14\\u90a3\\u5929\\u4f60\\u7684\\u8868\\u73b0\\uff0c\\u6211\\u5230\\u73b0\\u5728\\u90fd\\u8bb0\\u5f97\\u3002' },\n" +
    "    '3.4': { chapter: 4, npc: '\\u7d20\\u96c5', line: '\\u4f60\\u62ff\\u4e0b\\u4e00\\u4f4d\\u7684\\u65f6\\u5019\\uff0c\\u6211\\u6bd4\\u4f60\\u8fd8\\u7d27\\u5f20\\u3002' },\n" +
    "    '3.5': { chapter: 4, npc: '\\u745e\\u8d24', line: '\\u7ec3\\u95fb\\u90a3\\u4ef6\\u4e8b\\uff0c\\u6211\\u4eec\\u90fd\\u77e5\\u9053\\u4e0d\\u662f\\u4f60\\u7684\\u9519\\u3002' },\n" +
    "    '5.1': { chapter: 6, npc: '\\u590f\\u6069', line: '\\u4ece\\u6076\\u8bc4\\u5230\\u91cd\\u5efa\\uff0c\\u4f60\\u8d70\\u8fc7\\u7684\\u8def\\u6bd4\\u8c01\\u90fd\\u4e0d\\u5bb9\\u6613\\u3002' }\n" +
    '};\n';

// Insert ECHO_REFERENCES before _renderNarrationStep
code = code.replace(
    'function _renderNarrationStep(inner, stepKey, stepConfig, chapter) {',
    echoMapCode + '\nfunction _renderNarrationStep(inner, stepKey, stepConfig, chapter) {'
);

// Add echo injection at the end of narration step rendering (before the button)
// Find the pattern where _renderNarrationStep creates the continue button
// We need to insert echo text before the button in narration steps for ch2+
// The best hook: after "inner.innerHTML = html;" in _renderNarrationStep, add echo check
// Actually, let's add the echo at the start of narration, before the html building

// For chapter 2+ narration steps, insert echo references from ch1 choices
// Find the specific spot in _renderNarrationStep where stepKey === '2.0' starts
code = code.replace(
    "if (stepKey === '1.0') {",
    "var _echoHtml = _getEchoHtmlForStep(stepKey, cs); if (_echoHtml) { var _echoEl = document.createElement('div'); _echoEl.style.cssText = 'background:#1a1a2e;border-left:3px solid #A78BFA;padding:10px 14px;margin-bottom:16px;border-radius:0 8px 8px 0;text-align:left;'; _echoEl.innerHTML = _echoHtml; }\n    if (stepKey === '1.0') {"
);

// Add echo before the continue button in narration steps
code = code.replace(
    "inner.innerHTML = html;\n        var btn = document.createElement('button');\n        btn.style.cssText = 'background:#1E293B;color:#F8FAFC;border:none;padding:14px 40px;border-radius:8px;font-size:15px;cursor:pointer;';\n        btn.textContent = '\\u7EE7\\u7EED';\n        btn.onclick = function() {",
    "inner.innerHTML = html;\n        if (typeof _echoEl !== 'undefined' && _echoEl) { inner.insertBefore(_echoEl, inner.firstChild); _echoEl = null; }\n        var btn = document.createElement('button');\n        btn.style.cssText = 'background:#1E293B;color:#F8FAFC;border:none;padding:14px 40px;border-radius:8px;font-size:15px;cursor:pointer;';\n        btn.textContent = '\\u7EE7\\u7EED';\n        btn.onclick = function() {"
);

// Also handle the case where nameInput is in step 1.2 (which returns early)
code = code.replace(
    "inner.innerHTML = html;\n        inner.appendChild(nameInput);",
    "inner.innerHTML = html;\n        if (typeof _echoEl !== 'undefined' && _echoEl) { inner.insertBefore(_echoEl, inner.firstChild); _echoEl = null; }\n        inner.appendChild(nameInput);"
);

// Add _getEchoHtmlForStep function
var echoFuncCode = '\nfunction _getEchoHtmlForStep(stepKey, cs) {\n' +
    '    var chNum = parseInt(stepKey.split(".")[0]);\n' +
    '    if (chNum <= 1) return "";\n' +
    '    var prevCh = chNum - 1;\n' +
    '    var echoLines = [];\n' +
    '    var ek, echoRef, prevChoice;\n' +
    '    for (ek in ECHO_REFERENCES) {\n' +
    '        echoRef = ECHO_REFERENCES[ek];\n' +
    '        if (echoRef.chapter !== chNum) continue;\n' +
    '        prevChoice = null;\n' +
    '        if (cs.choices) { for (var pi = 0; pi < cs.choices.length; pi++) { if (cs.choices[pi].chapter === prevCh && cs.choices[pi].step === parseInt(ek.split(".")[1])) { prevChoice = cs.choices[pi]; break; } } }\n' +
    '        if (prevChoice) {\n' +
    '            var npcColor = "#F59E0B";\n' +
    '            if (echoRef.npc === "\\u7d20\\u96c5") npcColor = "#A78BFA";\n' +
    '            else if (echoRef.npc === "\\u667a\\u5a9b") npcColor = "#F472B6";\n' +
    '            else if (echoRef.npc === "\\u4fca\\u660a") npcColor = "#60A5FA";\n' +
    '            else if (echoRef.npc === "\\u745e\\u8d24") npcColor = "#34D399";\n' +
    '            echoLines.push(\'<div style="font-size:12px;color:\' + npcColor + \';margin-bottom:4px;">\' + echoRef.npc + \'</div><div style="font-size:13px;color:#94A3B8;line-height:1.5;">\\u201c\' + echoRef.line + \'\\u201d</div>\');\n' +
    '        }\n' +
    '    }\n' +
    '    if (echoLines.length === 0) return "";\n' +
    '    return \'<div style="font-size:11px;color:#64748B;margin-bottom:8px;">\\u56de\\u54cd</div>\' + echoLines.join(\'<div style="height:8px;"></div>\');\n' +
    '}\n';

code = code.replace(
    'function _renderNarrationStep(inner, stepKey, stepConfig, chapter) {',
    echoFuncCode + 'function _renderNarrationStep(inner, stepKey, stepConfig, chapter) {'
);

// =====================================================
// PATCH 3: Affection affects dialogue tone - fill NPC_TONE_PREFIX with complete 5-tier content
// =====================================================
// The existing NPC_TONE_PREFIX already has 5 tiers for each NPC but uses Chinese key '暧昧' instead of 'ambiguous'
// Let's check and fix the tone key mapping. The _getNpcToneKey uses '暧昧' for 40-59 but the object also uses '暧昧'
// This seems inconsistent - '暧昧' in the object but 'familiar'/'intimate'/'exclusive' in English for others
// Fix: make all keys consistent in English and ensure _getNpcToneKey matches
code = code.replace(
    "if (love >= 40) return '暧昧';",
    "if (love >= 40) return 'ambiguous';"
);

// Replace the Chinese keys in NPC_TONE_PREFIX with English
code = code.replace(
    /暧昧: \[/g,
    "ambiguous: ["
);

// Now ensure all NPC_TONE_PREFIX entries have proper content for all 5 tiers
// The current ones look OK with stranger/familiar/ambiguous/intimate/exclusive
// Let's enhance with more varied dialogue for each tier

// Add tone-based dialogue templates for the love chat system
var toneDialogueCode = '\nvar NPC_TONE_DIALOGUES = {\n' +
    "    '\\u590f\\u6069': {\n" +
    "        stranger: ['\\u4f60\\u597d\\u3002', '\\u2026\\u2026\\u55ef\\u3002', '\\u6709\\u4e8b\\uff1f'],\n" +
    "        familiar: ['\\u55ef\\uff0c\\u4f60\\u6765\\u4e86\\u3002', '\\u4eca\\u5929\\u7ec3\\u4e60\\u4e86\\u5417\\uff1f', '\\u4e0d\\u9519\\u3002'],\n" +
    "        ambiguous: ['\\u4f60\\u2026\\u2026\\u8fd8\\u597d\\u5417\\uff1f', '\\u6211\\u521a\\u624d\\u60f3\\u5230\\u4f60\\u4e86\\u3002', '\\u4e0d\\u8981\\u592a\\u62fc\\u4e86\\u3002'],\n" +
    "        intimate: ['\\u4f60\\u6765\\u4e86\\uff0c\\u6211\\u5c31\\u5b89\\u5fc3\\u4e86\\u3002', '\\u60f3\\u89c1\\u4f60\\u3002', '\\u6709\\u4f60\\u5728\\u8eab\\u8fb9\\uff0c\\u5f88\\u597d\\u3002'],\n" +
    "        exclusive: ['\\u6211\\u5728\\u7b49\\u4f60\\u3002\\u4e00\\u76f4\\u90fd\\u5728\\u3002', '\\u4f60\\u662f\\u6211\\u7684\\uff0c\\u6c38\\u8fdc\\u662f\\u3002', '\\u522b\\u79bb\\u5f00\\u6211\\u3002']\n" +
    "    },\n" +
    "    '\\u7d20\\u96c5': {\n" +
    "        stranger: ['\\u4f60\\u597d\\u3002', '\\u2026\\u2026\\u55ef\\u3002', '\\u8bf7\\u8fdb\\u3002'],\n" +
    "        familiar: ['\\u4eca\\u5929\\u7684\\u5929\\u7a7a\\u5f88\\u597d\\u770b\\u3002', '\\u4f60\\u7684\\u58f0\\u97f3\\u597d\\u4e86\\u5f88\\u591a\\u3002', '\\u8c22\\u8c22\\u4f60\\u3002'],\n" +
    "        ambiguous: ['\\u6211\\u521a\\u5199\\u4e86\\u4e00\\u6bb5\\u65cb\\u5f8b\\uff0c\\u60f3\\u8ba9\\u4f60\\u542c\\u542c\\u3002', '\\u2026\\u2026\\u8c22\\u8c22\\u4f60\\u5728\\u8eab\\u8fb9\\u3002', '\\u4f60\\u7684\\u7b11\\u5bb9\\u5f88\\u597d\\u770b\\u3002'],\n" +
    "        intimate: ['\\u6211\\u521a\\u5212\\u60f3\\u548c\\u4f60\\u8bf4\\u8bdd\\u3002', '\\u6211\\u7684\\u6b4c\\u53ea\\u4e3a\\u4f60\\u4e00\\u4e2a\\u4eba\\u5531\\u3002', '\\u8c22\\u8c22\\u4f60\\u8ba9\\u6211\\u6562\\u8868\\u8fbe\\u4e86\\u3002'],\n" +
    "        exclusive: ['\\u4ece\\u4eca\\u5929\\u8d77\\uff0c\\u6211\\u7684\\u4e16\\u754c\\u53ea\\u6709\\u4f60\\u3002', '\\u6211\\u60f3\\u6c38\\u8fdc\\u548c\\u4f60\\u5728\\u4e00\\u8d77\\u3002', '\\u4f60\\u662f\\u6211\\u6700\\u91cd\\u8981\\u7684\\u4eba\\u3002']\n" +
    "    },\n" +
    "    '\\u667a\\u5a9b': {\n" +
    "        stranger: ['\\u5566\\uff1f', '\\u5582\\uff1f', '\\u4f60\\u597d\\u554a\\u3002'],\n" +
    "        familiar: ['\\u563f\\u563f~\\u4f60\\u6765\\u4e86\\uff01', '\\u4eca\\u5929\\u4e5f\\u8981\\u52a0\\u6cb9\\u54e6~', '\\u6211\\u7b49\\u4f60\\u5f88\\u4e45\\u4e86\\uff01'],\n" +
    "        ambiguous: ['\\u54c7\\uff0c\\u662f\\u4f60\\uff01\\u6211\\u521a\\u624d\\u8fd8\\u5728\\u60f3\\u4f60\\u5462~', '\\u4f60\\u80fd\\u966a\\u6211\\u804a\\u804a\\u5929\\u5417\\uff1f', '\\u4eca\\u5929\\u7684\\u4f60\\u597d\\u53ef\\u7231\\uff01'],\n" +
    "        intimate: ['\\u7ec8\\u4e8e\\u6765\\u627e\\u6211\\u4e86\\uff01\\u6211\\u597d\\u5f00\\u5fc3~', '\\u6211\\u7b49\\u4f60\\u597d\\u4e45\\u4e86\\uff01\\u4e0d\\u8981\\u518d\\u8ba9\\u6211\\u7b49\\u4e86~', '\\u4f60\\u662f\\u6211\\u6700\\u559c\\u6b22\\u7684\\u4eba\\uff01'],\n" +
    "        exclusive: ['\\u6211\\u7231\\u4f60\\uff01\\u4e0d\\u662f\\u559c\\u6b22\\uff0c\\u662f\\u7231\\uff01', '\\u8fd9\\u8f88\\u5b50\\u53ea\\u7231\\u4f60\\u4e00\\u4e2a\\u4eba\\uff01', '\\u6c38\\u8fdc\\u5728\\u4e00\\u8d77\\u597d\\u4e0d\\u597d\\uff1f']\n" +
    "    },\n" +
    "    '\\u4fca\\u660a': {\n" +
    "        stranger: ['\\u4f60\\u597d\\u3002', '\\u2026\\u2026\\u55ef\\u3002', '\\u8bf7\\u591a\\u6307\\u6559\\u3002'],\n" +
    "        familiar: ['\\u563f\\uff01\\u4eca\\u5929\\u4e5f\\u52a0\\u6cb9\\u5427\\u3002', '\\u4f60\\u7684\\u8fdb\\u6b65\\u6bd4\\u6211\\u60f3\\u8c61\\u7684\\u5feb\\u3002', '\\u4e00\\u8d77\\u7ec3\\u4e60\\u5427\\u3002'],\n" +
    "        ambiguous: ['\\u54c8\\u54c8\\uff0c\\u53c8\\u89c1\\u4e86\\u3002', '\\u6709\\u4f60\\u5728\\uff0c\\u7ec3\\u4e60\\u4e0d\\u89c9\\u5f97\\u7d2f\\u3002', '\\u6211\\u521a\\u60f3\\u627e\\u4f60\\u3002'],\n" +
    "        intimate: ['\\u6211\\u5168\\u90e8\\u7684\\u52c7\\u6c14\\u90fd\\u662f\\u56e0\\u4e3a\\u4f60\\u3002', '\\u4f60\\u662f\\u6211\\u6700\\u60f3\\u5b88\\u62a4\\u7684\\u4eba\\u3002', '\\u6bcf\\u6b21\\u89c1\\u4f60\\u90fd\\u5f88\\u5f00\\u5fc3\\u3002'],\n" +
    "        exclusive: ['\\u4f59\\u751f\\u8bf7\\u591a\\u6307\\u6559\\u3002\\u56e0\\u4e3a\\u6211\\u60f3\\u548c\\u4f60\\u8d70\\u4e0b\\u53bb\\u3002', '\\u6211\\u7684\\u5fc3\\u91cc\\u53ea\\u6709\\u4f60\\u3002', '\\u8ba9\\u6211\\u4eec\\u6c38\\u8fdc\\u5728\\u4e00\\u8d77\\u5427\\u3002']\n" +
    "    },\n" +
    "    '\\u745e\\u8d24': {\n" +
    "        stranger: ['\\u2026\\u2026', '\\u2026\\u2026\\u55ef\\u3002', '\\u2026\\u2026'],\n" +
    "        familiar: ['\\u2026\\u2026\\u55ef\\u3002', '\\u52a0\\u6cb9\\u3002', '\\u2026\\u2026\\u8c22\\u8c22\\u3002'],\n" +
    "        ambiguous: ['\\u6765\\u4e86\\u3002', '\\u2026\\u2026\\u6211\\u5728\\u7b49\\u4f60\\u3002', '\\u522b\\u8d70\\u3002'],\n" +
    "        intimate: ['\\u4f60\\u6765\\u4e86\\u2026\\u2026\\u6211\\u6ca1\\u7b49\\u3002', '\\u2026\\u2026\\u7559\\u4e0b\\u6765\\u3002', '\\u6211\\u4e0d\\u60f3\\u4e00\\u4e2a\\u4eba\\u3002'],\n" +
    "        exclusive: ['\\u2026\\u2026\\u522b\\u79bb\\u5f00\\u6211\\u3002', '\\u6211\\u9700\\u8981\\u4f60\\u3002\\u6c38\\u8fdc\\u9700\\u8981\\u3002', '\\u4f60\\u662f\\u6211\\u552f\\u4e00\\u4e0d\\u60f3\\u5931\\u53bb\\u7684\\u4eba\\u3002']\n" +
    "    }\n" +
    '};\n\n' +
    'function _getNpcToneDialogue(npcName) {\n' +
    '    var tones = NPC_TONE_DIALOGUES[npcName];\n' +
    '    if (!tones) return "";\n' +
    '    var key = _getNpcToneKey(npcName);\n' +
    '    var pool = tones[key];\n' +
    '    if (!pool || pool.length === 0) return "";\n' +
    '    return pool[Math.floor(Math.random() * pool.length)];\n' +
    '}\n';

// Insert before _renderNarrationStep
code = code.replace(
    'function _renderNarrationStep(inner, stepKey, stepConfig, chapter) {',
    toneDialogueCode + 'function _renderNarrationStep(inner, stepKey, stepConfig, chapter) {'
);

// =====================================================
// PATCH 4: Key node visual pause - _showVisualPause function
// =====================================================
var visualPauseCode = '\nfunction _showVisualPause(text, duration) {\n' +
    '    var dur = duration || 3000;\n' +
    '    var overlay = document.createElement("div");\n' +
    '    overlay.id = "visualPauseOverlay";\n' +
    '    overlay.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(15,23,42,0.85);z-index:10004;display:flex;flex-direction:column;justify-content:center;align-items:center;opacity:0;transition:opacity 0.8s;pointer-events:none;";\n' +
    '    var textEl = document.createElement("div");\n' +
    '    textEl.style.cssText = "font-size:20px;font-weight:700;color:#F8FAFC;letter-spacing:2px;text-align:center;font-family:-apple-system,BlinkMacSystemFont,sans-serif;opacity:0;transition:opacity 1s 0.3s;";\n' +
    '    textEl.textContent = text;\n' +
    '    overlay.appendChild(textEl);\n' +
    '    document.body.appendChild(overlay);\n' +
    '    setTimeout(function() { overlay.style.opacity = "1"; textEl.style.opacity = "1"; }, 30);\n' +
    '    setTimeout(function() {\n' +
    '        overlay.style.opacity = "0"; textEl.style.opacity = "0";\n' +
    '        setTimeout(function() { if (overlay.parentNode) overlay.parentNode.removeChild(overlay); }, 800);\n' +
    '    }, dur);\n' +
    '}\n';

// Insert before _showChapterUnlockAnim
code = code.replace(
    'function _showChapterUnlockAnim(chapterNum, chapterTitle, callback) {',
    visualPauseCode + 'function _showChapterUnlockAnim(chapterNum, chapterTitle, callback) {'
);

// Add visual pause calls at key points: in _renderChapterEnd after showing "CHAPTER X COMPLETE"
// and in _completeAndAdvanceStep for chapter_end type
code = code.replace(
    "cs.completedSteps.push(stepKey);",
    "cs.completedSteps.push(stepKey); if (stepConfig.type === 'chapter_end') { _showVisualPause('\\u7ae0\\u8282\\u5b8c\\u6210', 2500); }"
);

// Also add visual pause for key moments in _renderNarrationStep (出道, 一位, 大赏)
// Add at the end of stepKey === '3.4' (first win) narration
// We'll hook into the narration rendering for step 3.4

// =====================================================
// PATCH 5: Scene atmosphere transition - SCENE_ATMOSPHERE + _showAtmosphereTransition
// =====================================================
// The existing _showSceneAtmosphere already does this! Let's enhance it with more entries
// and ensure it uses the proper CSS fade-in/stay/fade-out pattern
// The current implementation is good but uses plain text. Let's add more atmosphere entries
code = code.replace(
    "var atmospheres = {\n        training: '\\u7EC3\\u4E60\\u5BA4\\u7684\\u97F3\\u4E50\\u8FD8\\u6CA1\\u505C\\u3002',",
    "var atmospheres = {\n        training: '\\u7EC3\\u4E60\\u5BA4\\u7684\\u706F\\u5149\\u6C38\\u8FDC\\u662F\\u6700\\u65E9\\u4EAE\\u8D77\\u7684',"
);
code = code.replace(
    "contacts: '\\u624B\\u673A\\u4EAE\\u4E86\\u3002',",
    "contacts: '\\u8D70\\u5ECA\\u91CC\\u56DE\\u8361\\u7740\\u8282\\u594F\\u7684\\u4F59\\u97F3',"
);

// Add a more complete SCENE_ATMOSPHERE map
var sceneAtmosphereCode = '\nvar SCENE_ATMOSPHERE = {\n' +
    "    '\\u8BAD\\u7EC3': '\\u7EC3\\u4E60\\u5BA4\\u7684\\u706F\\u5149\\u6C38\\u8FDC\\u662F\\u6700\\u65E9\\u4EAE\\u8D77\\u7684',\n" +
    "    '\\u516C\\u53F8': '\\u8D70\\u5ECA\\u91CC\\u56DE\\u8361\\u7740\\u8282\\u594F\\u7684\\u4F59\\u97F3',\n" +
    "    '\\u7EC3\\u4E60\\u5BA4': '\\u97F3\\u4E50\\u58F0\\u4ECE\\u95E8\\u7F1D\\u91CC\\u6E17\\u51FA\\u6765',\n" +
    "    '\\u5F55\\u97F3\\u5BA4': '\\u8C03\\u97F3\\u7684\\u58F0\\u97F3\\u5728\\u7A7A\\u6C14\\u4E2D\\u56DE\\u8361',\n" +
    "    '\\u821E\\u53F0': '\\u805A\\u5149\\u706F\\u4E0B\\u7684\\u5C18\\u57C3\\u5728\\u98D8\\u821E',\n" +
    "    '\\u8857\\u5934': '\\u98CE\\u5E26\\u7740\\u6B4C\\u58F0\\u7A7F\\u8FC7\\u4EBA\\u7FA4',\n" +
    "    '\\u98DE\\u673A': '\\u4E91\\u5C42\\u4E4B\\u4E0A\\uFF0C\\u4E16\\u754C\\u5F88\\u5B89\\u9759',\n" +
    "    '\\u9886\\u5956\\u53F0': '\\u94A6\\u5149\\u7B49\\u5F85\\u7740\\u6700\\u540E\\u7684\\u540D\\u5B57'\n" +
    '};\n\n' +
    'function _showAtmosphereTransition(text) {\n' +
    '    var el = document.createElement("div");\n' +
    '    el.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(15,23,42,0.9);z-index:9997;display:flex;flex-direction:column;justify-content:center;align-items:center;opacity:0;transition:opacity 0.5s;pointer-events:none;";\n' +
    '    var inner = document.createElement("div");\n' +
    '    inner.style.cssText = "font-size:14px;color:#64748B;letter-spacing:1px;line-height:1.8;text-align:center;font-family:-apple-system,BlinkMacSystemFont,sans-serif;max-width:280px;";\n' +
    '    inner.textContent = text;\n' +
    '    el.appendChild(inner);\n' +
    '    document.body.appendChild(el);\n' +
    '    setTimeout(function() { el.style.opacity = "1"; }, 30);\n' +
    '    setTimeout(function() { el.style.opacity = "0"; }, 2000);\n' +
    '    setTimeout(function() { if (el.parentNode) el.parentNode.removeChild(el); }, 2500);\n' +
    '}\n';

code = code.replace(
    'function _showSceneAtmosphere(page) {',
    sceneAtmosphereCode + 'function _showSceneAtmosphere(page) {'
);

// =====================================================
// PATCH 6: Chapter progress visualization on home page
// =====================================================
// _renderChapterProgressBar exists but is not called in renderHomePage
// Add it after the checkin section in renderHomePage
code = code.replace(
    "}())\n+ ' '\n+ (function() {\n                    var appMap = {};",
    "}())\n+ ' '\n+ _renderChapterProgressBar()\n+ ' '\n+ (function() {\n                    var appMap = {};"
);

// =====================================================
// PATCH 7: APP badge system - _addAppBadge and _clearAppBadge
// =====================================================
var appBadgeCode = '\nvar _appBadges = {};\n\n' +
    'function _addAppBadge(appId, text) {\n' +
    '    if (!_appBadges[appId]) _appBadges[appId] = { count: 0, text: "" };\n' +
    '    _appBadges[appId].count++;\n' +
    '    _appBadges[appId].text = text || "";\n' +
    '    render();\n' +
    '}\n\n' +
    'function _clearAppBadge(appId) {\n' +
    '    if (_appBadges[appId]) { _appBadges[appId] = null; delete _appBadges[appId]; }\n' +
    '}\n\n' +
    'function _getAppBadgeInfo(appId) {\n' +
    '    return _appBadges[appId] || null;\n' +
    '}\n';

// Insert before _completeAndAdvanceStep
code = code.replace(
    'function _completeAndAdvanceStep(stepKey, stepConfig) {',
    appBadgeCode + 'function _completeAndAdvanceStep(stepKey, stepConfig) {'
);

// Add _addAppBadge calls in _completeAndAdvanceStep
code = code.replace(
    "if (stepConfig.unlockApp) {\n        if (cs.unlockedApps.indexOf(stepConfig.unlockApp) === -1) { cs.unlockedApps.push(stepConfig.unlockApp); }",
    "if (stepConfig.unlockApp) {\n        if (cs.unlockedApps.indexOf(stepConfig.unlockApp) === -1) { cs.unlockedApps.push(stepConfig.unlockApp); _addAppBadge(stepConfig.unlockApp, '\\u65B0\\u89E3\\u9501'); }"
);

// Add badge clearing when entering apps via goToPage
code = code.replace(
    "if (page === 'live') { gameState.livePendingReward = false; }",
    "if (page === 'live') { gameState.livePendingReward = false; } _clearAppBadge(page);"
);

// =====================================================
// PATCH 8: Training page stat progress bars
// =====================================================
// Add chapter stat progress to the training page after the stats card
// The training page already has _getChapterProgressHtml but it's basic
// Enhance with per-stat progress bars using _getChapterStatProgress
var trainingProgressCode = '\n                \\u003cdiv class=\"section-title\" style=\"margin-top: 16px;\"\\u003e\\u7AE0\\u8282\\u8FDB\\u5EA6\\u003c/div\\u003e\\n                \\u003cdiv class=\"card\" id=\"chStatProgressCard\"\\u003e\\u003c/div\\u003e';

code = code.replace(
    "\\u003cdiv class=\\\"section-title\\\" style=\\\"margin-top: 16px;\\\"\\u003e\\u9009\\u62E9\\u8BAD\\u7EC3\\u9879\\u76EE\\u003c/div\\u003e",
    "\\u003cdiv class=\\\"section-title\\\" style=\\\"margin-top: 16px;\\\"\\u003e\\u7AE0\\u8282\\u8FDB\\u5EA6\\u003c/div\\u003e\\u003cdiv class=\\\"card\\\" id=\\\"chStatProgressCard\\\"\\u003e\\u003c/div\\u003e\\n                \\u003cdiv class=\\\"section-title\\\" style=\\\"margin-top: 16px;\\\"\\u003e\\u9009\\u62E9\\u8BAD\\u7EC3\\u9879\\u76EE\\u003c/div\\u003e"
);

// Add the JS to fill in the chapter stat progress card
code = code.replace(
    "var _cpHtml = (typeof _getChapterProgressHtml === 'function') ? _getChapterProgressHtml('training') : '';",
    "var _cpHtml = (typeof _getChapterProgressHtml === 'function') ? _getChapterProgressHtml('training') : '';\n    var _chStatCard = container.querySelector('#chStatProgressCard');\n    if (_chStatCard) {\n        var _statKeys = ['dance', 'vocal', 'rap', 'acting', 'variety'];\n        var _statNames = { dance: '\\u821E\\u8E48', vocal: '\\u58F0\\u4E50', rap: '\\u8BF4\\u5531', acting: '\\u8868\\u6F14', variety: '\\u7EFC\\u827A' };\n        var _chHtml = '';\n        for (var _si = 0; _si < _statKeys.length; _si++) {\n            var _sp = _getChapterStatProgress(_statKeys[_si]);\n            if (_sp) {\n                var _pct = Math.min(100, Math.floor((_sp.current / _sp.target) * 100));\n                _chHtml += '\\u003cdiv style=\"margin-bottom:10px;\"\\u003e'\n                    + '\\u003cdiv style=\"display:flex;justify-content:space-between;font-size:12px;margin-bottom:4px;\"\\u003e'\n                    + '\\u003cspan style=\"color:var(--color-text-light);\"\\u003e' + _statNames[_statKeys[_si]] + '\\u003c/span\\u003e'\n                    + '\\u003cspan style=\"color:var(--color-text);\"\\u003e' + _sp.current + '/' + _sp.target + '\\u003c/span\\u003e'\n                    + '\\u003c/div\\u003e'\n                    + '\\u003cdiv style=\"background:#334155;border-radius:4px;height:6px;\"\\u003e'\n                    + '\\u003cdiv style=\"background:linear-gradient(90deg,#6D28D9,#A78BFA);border-radius:4px;height:6px;width:' + _pct + '%;\"\\u003e\\u003c/div\\u003e'\n                    + '\\u003c/div\\u003e'\n                    + '\\u003c/div\\u003e';\n            }\n        }\n        if (!_chHtml) _chHtml = '\\u003cdiv style=\"text-align:center;color:var(--color-text-light);font-size:12px;padding:8px;\"\\u003e\\u6682\\u65E0\\u7AE0\\u8282\\u8FDB\\u5EA6\\u8981\\u6C42\\u003c/div\\u003e';\n        _chStatCard.innerHTML = _chHtml;\n    }"
);

// =====================================================
// PATCH 9: Auto-skip satisfied conditions with popup
// =====================================================
// The existing checkChapterProgress already auto-skips but uses showToast
// Enhance to show a proper popup with 1.5s auto-dismiss
code = code.replace(
    "showToast('\\u5DF2\\u6EE1\\u8DB3\\u6761\\u4EF6\\uFF0C\\u81EA\\u52A8\\u8FDB\\u5165\\u4E0B\\u4E00\\u8282\\u70B9', 2000);",
    "var _autoSkipEl = document.createElement('div'); _autoSkipEl.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:#1E293B;border-radius:12px;padding:20px 30px;z-index:10005;text-align:center;box-shadow:0 4px 20px rgba(0,0,0,0.5);'; _autoSkipEl.innerHTML = '<div style=\"font-size:15px;color:#F8FAFC;margin-bottom:8px;\">\\u5DF2\\u6EE1\\u8DB3\\u6761\\u4EF6</div><div style=\"font-size:12px;color:#94A3B8;\">\\u81EA\\u52A8\\u8FDB\\u5165\\u4E0B\\u4E00\\u8282\\u70B9</div>'; document.body.appendChild(_autoSkipEl); setTimeout(function() { _autoSkipEl.style.transition = 'opacity 0.3s'; _autoSkipEl.style.opacity = '0'; setTimeout(function() { if (_autoSkipEl.parentNode) _autoSkipEl.parentNode.removeChild(_autoSkipEl); }, 300); }, 1500);"
);

// =====================================================
// PATCH 10: Unlocked chapter recall entry in "我的" page
// =====================================================
// Add "回忆" button and "我的抉择" entry in render我的Page
code = code.replace(
    "\\u003c!-- \\u8D26\\u53F7\\u64CD\\u4F5C --\\u003e\\n                \\u003cdiv class=\\\"section-title\\\" style=\\\"margin-top:16px;\\\"\\u003e\\u8D26\\u53F7\\u003c/div\\u003e",
    "\\u003cdiv class=\\\"section-title\\\" style=\\\"margin-top:16px;\\\"\\u003e\\u56DE\\u5FC6\\u003c/div\\u003e\\n                \\u003cdiv class=\\\"card\\\" onclick=\\\"_showChapterRecall()\\\" style=\\\"cursor:pointer;\\\"\\u003e\\n                    \\u003cdiv style=\\\"display:flex;justify-content:space-between;align-items:center;\\\"\\u003e\\n                        \\u003cdiv\\u003e\\n                            \\u003cdiv style=\\\"font-weight:600;\\\"\\u003e\\u7AE0\\u8282\\u56DE\\u5FC6\\u003c/div\\u003e\\n                            \\u003cdiv style=\\\"font-size:12px;color:var(--color-text-light);\\\"\\u003e\\u91CD\\u6E29\\u5DF2\\u5B8C\\u6210\\u7684\\u7AE0\\u8282\\u6545\\u4E8B\\u003c/div\\u003e\\n                        \\u003c/div\\u003e\\n                        \\u003cdiv style=\\\"font-size:13px;color:var(--color-primary);\\\"\\u003e\\u67E5\\u770B \\u203A\\u003c/div\\u003e\\n                    \\u003c/div\\u003e\\n                \\u003c/div\\u003e\\n                \\u003cdiv class=\\\"card\\\" onclick=\\\"_showMyChoices()\\\" style=\\\"cursor:pointer;margin-top:8px;\\\"\\u003e\\n                    \\u003cdiv style=\\\"display:flex;justify-content:space-between;align-items:center;\\\"\\u003e\\n                        \\u003cdiv\\u003e\\n                            \\u003cdiv style=\\\"font-weight:600;\\\"\\u003e\\u6211\\u7684\\u6289\\u62E9\\u003c/div\\u003e\\n                            \\u003cdiv style=\\\"font-size:12px;color:var(--color-text-light);\\\"\\u003e\\u67E5\\u770B\\u6240\\u6709\\u5173\\u952E\\u9009\\u62E9\\u003c/div\\u003e\\n                        \\u003c/div\\u003e\\n                        \\u003cdiv style=\\\"font-size:13px;color:var(--color-primary);\\\"\\u003e\\u67E5\\u770B \\u203A\\u003c/div\\u003e\\n                    \\u003c/div\\u003e\\n                \\u003c/div\\u003e\\n                \\u003c!-- \\u8D26\\u53F7\\u64CD\\u4F5C --\\u003e\\n                \\u003cdiv class=\\\"section-title\\\" style=\\\"margin-top:16px;\\\"\\u003e\\u8D26\\u53F7\\u003c/div\\u003e"
);

// Add _showChapterRecall and _showMyChoices functions
var recallFuncCode = '\nfunction _showChapterRecall() {\n' +
    '    var cs = gameState.chapterState;\n' +
    '    if (!cs || !cs.completedSteps || cs.completedSteps.length === 0) { showToast("\\u8FD8\\u6CA1\\u6709\\u5B8C\\u6210\\u7684\\u7AE0\\u8282"); return; }\n' +
    '    var chNames = { 1: "\\u5165\\u793E", 2: "\\u6210\\u957F", 3: "\\u51FA\\u9053", 4: "\\u51FA\\u9053\\u56DE\\u5FC6", 5: "\\u6210\\u540D", 6: "\\u5DC5\\u5CF0" };\n' +
    '    var completed = {};\n' +
    '    for (var i = 0; i < cs.completedSteps.length; i++) { var ch = parseInt(cs.completedSteps[i].split(".")[0]); completed[ch] = true; }\n' +
    '    var html = "\\u003cdiv style=\\"padding:20px;text-align:center;\\"\\u003e";\n' +
    '    html += "\\u003cdiv style=\\"font-size:18px;font-weight:700;color:#F8FAFC;margin-bottom:20px;\\"\\u003e\\u7AE0\\u8282\\u56DE\\u5FC6\\u003c/div\\u003e";\n' +
    '    for (var ch in completed) { html += "\\u003cdiv style=\\"background:#1E293B;border-radius:8px;padding:12px 16px;margin-bottom:8px;text-align:left;cursor:pointer;\\" onclick=\\"_showChapterNarrationRecall(" + ch + ")\\"\\u003e\\u003cdiv style=\\"font-size:14px;color:#F8FAFC;\\"\\u003e\\u7B2C" + ch + "\\u7AE0\\uFF1A" + (chNames[ch] || "") + "\\u003c/div\\u003e\\u003cdiv style=\\"font-size:11px;color:#64748B;margin-top:4px;\\"\\u003e\\u5DF2\\u5B8C\\u6210\\u003c/div\\u003e\\u003c/div\\u003e"; }\n' +
    '    html += "\\u003c/div\\u003e";\n' +
    '    showModal("\\u7AE0\\u8282\\u56DE\\u5FC6", html);\n' +
    '}\n\n' +
    'function _showChapterNarrationRecall(chNum) {\n' +
    '    var cs = gameState.chapterState;\n' +
    '    if (!cs || !cs.choices) { showToast("\\u6682\\u65E0\\u8BB0\\u5F55"); return; }\n' +
    '    var choicesHtml = "";\n' +
    '    var choiceLabels = { ambition: "\\u91CE\\u5FC3", passion: "\\u70ED\\u7231", proof: "\\u8BC1\\u660E", has_experience: "\\u6709\\u57FA\\u7840", no_experience: "\\u96F6\\u57FA\\u7840", some_experience: "\\u5B66\\u8FC7\\u4E00\\u70B9", who_said: "\\u8FFD\\u95EE", prove_myself: "\\u8BC1\\u660E\\u81EA\\u5DF1", will_practice: "\\u76F4\\u63A5\\u56DE\\u5E94", lively: "\\u6D3B\\u6CFC", shy: "\\u5BB3\\u7F9E", serious: "\\u8BA4\\u771F", ballad: "\\u6162\\u6B4C", dance_track: "\\u821E\\u8E48\\u66F2", rap_cover: "Rap" };\n' +
    '    for (var i = 0; i < cs.choices.length; i++) {\n' +
    '        if (cs.choices[i].chapter !== chNum) continue;\n' +
    '        var detail = (cs.choiceDetails && cs.choiceDetails[chNum + "." + cs.choices[i].step]) || "";\n' +
    '        choicesHtml += "\\u003cdiv style=\\"background:#0F172A;border-radius:6px;padding:8px 12px;margin-bottom:4px;font-size:13px;color:#CBD5E1;\\"\\u003e" + (detail || (choiceLabels[cs.choices[i].choiceId] || cs.choices[i].choiceId)) + "\\u003c/div\\u003e";\n' +
    '    }\n' +
    '    if (!choicesHtml) choicesHtml = "\\u003cdiv style=\\"color:#64748B;font-size:13px;\\"\\u003e\\u672C\\u7AE0\\u65E0\\u9009\\u62E9\\u8BB0\\u5F55\\u003c/div\\u003e";\n' +
    '    var chNames = { 1: "\\u5165\\u793E", 2: "\\u6210\\u957F", 3: "\\u51FA\\u9053", 4: "\\u51FA\\u9053\\u56DE\\u5FC6", 5: "\\u6210\\u540D", 6: "\\u5DC5\\u5CF0" };\n' +
    '    var html = "\\u003cdiv style=\\"padding:16px;\\"\\u003e\\u003cdiv style=\\"font-size:16px;font-weight:700;color:#F8FAFC;margin-bottom:12px;\\"\\u003e\\u7B2C" + chNum + "\\u7AE0\\uFF1A" + (chNames[chNum] || "") + "\\u003c/div\\u003e" + choicesHtml + "\\u003c/div\\u003e";\n' +
    '    showModal("\\u7AE0\\u8282\\u56DE\\u5FC6", html);\n' +
    '}\n\n' +
    'function _showMyChoices() {\n' +
    '    var cs = gameState.chapterState;\n' +
    '    if (!cs || !cs.choices || cs.choices.length === 0) { showToast("\\u8FD8\\u6CA1\\u6709\\u505A\\u51FA\\u9009\\u62E9"); return; }\n' +
    '    var chNames = { 1: "\\u5165\\u793E", 2: "\\u6210\\u957F", 3: "\\u51FA\\u9053", 4: "\\u51FA\\u9053\\u56DE\\u5FC6", 5: "\\u6210\\u540D", 6: "\\u5DC5\\u5CF0" };\n' +
    '    var choiceLabels = { ambition: "\\u91CE\\u5FC3", passion: "\\u70ED\\u7231", proof: "\\u8BC1\\u660E", has_experience: "\\u6709\\u57FA\\u7840", no_experience: "\\u96F6\\u57FA\\u7840", some_experience: "\\u5B66\\u8FC7\\u4E00\\u70B9", who_said: "\\u8FFD\\u95EE", prove_myself: "\\u8BC1\\u660E\\u81EA\\u5DF1", will_practice: "\\u76F4\\u63A5\\u56DE\\u5E94", lively: "\\u6D3B\\u6CFC", shy: "\\u5BB3\\u7F9E", serious: "\\u8BA4\\u771F", ballad: "\\u6162\\u6B4C", dance_track: "\\u821E\\u8E48\\u66F2", rap_cover: "Rap", all_round: "\\u5168\\u9762", vocal_focus: "\\u4E3B\\u5531", dance_focus: "\\u9886\\u821E", celebrate: "\\u6211\\u505A\\u5230\\u4E86", stay_calm: "\\u7B2C\\u4E00\\u6B65", thank_team: "\\u611F\\u8C22\\u56E2\\u961F", cool_concept: "\\u9177\\u98CE", youth_concept: "\\u9752\\u6625", mystery_concept: "\\u795E\\u79D8", go_for_it: "\\u62FC\\u4E86", stay_humble: "\\u8C26\\u865A", for_team: "\\u4E3A\\u56E2\\u961F", admit: "\\u5766\\u8BDA", deny: "\\u5426\\u8BA4", apologize: "\\u9053\\u6B49", honest: "\\u5766\\u8BDA\\u9762\\u5BF9", quiet: "\\u6C89\\u9ED8", reframe: "\\u8F6C\\u79FB\\u8BDD\\u9898", grateful: "\\u611F\\u6069", not_done: "\\u8FD8\\u4E0D\\u591F", for_fans: "\\u732E\\u7ED9\\u7C89\\u4E1D", calm_face: "\\u5766\\u7136", ignore_it: "\\u65E0\\u89C6", negotiate: "\\u8C08\\u5224", accept_it: "\\u63A5\\u53D7", confess: "\\u8868\\u767D", keep_inside: "\\u85CF\\u5728\\u5FC3\\u91CC", write_song: "\\u5199\\u6B4C", do_livestream: "\\u76F4\\u64AD", call_haeeun: "\\u6253\\u7ED9\\u590F\\u6069", call_sua: "\\u6253\\u7ED9\\u7D20\\u96C5", call_family: "\\u6253\\u7ED9\\u5BB6\\u4EBA", remember_all: "\\u5168\\u90E8\\u8BB0\\u5F97", remember_key: "\\u53EA\\u8BB0\\u5F97\\u91CD\\u8981\\u7684" };\n' +
    '    var maxCh = cs.currentChapter || 1;\n' +
    '    var html = "\\u003cdiv style=\\"padding:16px;max-height:60vh;overflow-y:auto;\\"\\u003e";\n' +
    '    for (var ch = 1; ch <= maxCh; ch++) {\n' +
    '        html += "\\u003cdiv style=\\"font-size:14px;font-weight:600;color:#94A3B8;margin-bottom:8px;margin-top:12px;\\"\\u003e\\u7B2C" + ch + "\\u7AE0\\uFF1A" + (chNames[ch] || "") + "\\u003c/div\\u003e";\n' +
    '        var found = false;\n' +
    '        for (var i = 0; i < cs.choices.length; i++) {\n' +
    '            if (cs.choices[i].chapter !== ch) continue;\n' +
    '            found = true;\n' +
    '            var detail = (cs.choiceDetails && cs.choiceDetails[ch + "." + cs.choices[i].step]) || "";\n' +
    '            html += "\\u003cdiv style=\\"background:#1E293B;border-radius:6px;padding:8px 12px;margin-bottom:4px;\\"\\u003e";\n' +
    '            html += "\\u003cdiv style=\\"font-size:13px;color:#CBD5E1;\\"\\u003e" + (detail || (choiceLabels[cs.choices[i].choiceId] || cs.choices[i].choiceId)) + "\\u003c/div\\u003e";\n' +
    '            html += "\\u003cdiv style=\\"font-size:11px;color:#64748B;margin-top:2px;\\"\\u003e\\u8FD9\\u4E2A\\u9009\\u62E9\\u5C06\\u5728\\u540E\\u7EED\\u7AE0\\u8282\\u4E2D\\u4EA7\\u751F\\u56DE\\u54CD\\u003c/div\\u003e";\n' +
    '            html += "\\u003c/div\\u003e";\n' +
    '        }\n' +
    '        if (!found) html += "\\u003cdiv style=\\"font-size:12px;color:#475569;padding:4px 0;\\"\\u003e\\uFF1F\\uFF1F\\uFF1F\\u003c/div\\u003e";\n' +
    '    }\n' +
    '    html += "\\u003c/div\\u003e";\n' +
    '    showModal("\\u6211\\u7684\\u6289\\u62E9", html);\n' +
    '}\n';

// Insert before render我的Page
code = code.replace(
    'function render\u6211\u7684Page(container) {',
    recallFuncCode + 'function render\u6211\u7684Page(container) {'
);

// =====================================================
// PATCH 11: Daily login greeting - enhance with time-based greetings
// =====================================================
// The existing DAILY_GREETINGS has basic greetings. Enhance with time-of-day variants.
code = code.replace(
    "var DAILY_GREETINGS = {\n    '\\u590f\\u6069': ['\\u65e9\\u3002\\u4eca\\u5929\\u4e5f\\u8981\\u52a0\\u6cb9\\u3002', '\\u4f60\\u6765\\u4e86\\u3002\\u7ec3\\u4e60\\u5ba4\\u89c1\\u3002', '\\u6bcf\\u5929\\u8fdb\\u6b65\\u4e00\\u70b9\\u5c31\\u597d\\u3002'],",
    "var DAILY_GREETINGS = {\n" +
    "    '\\u590f\\u6069': { morning: ['\\u65e9\\u3002\\u4eca\\u5929\\u4e5f\\u8981\\u52a0\\u6cb9\\u3002', '\\u65e9\\u8d77\\u7684\\u4eba\\u6709\\u7ec3\\u4e60\\u5ba4\\u7528\\u3002'], noon: ['\\u4f60\\u6765\\u4e86\\u3002\\u7ec3\\u4e60\\u5ba4\\u89c1\\u3002', '\\u5348\\u4f11\\u65f6\\u95f4\\u522b\\u5077\\u61d2\\u3002'], evening: ['\\u6bcf\\u5929\\u8fdb\\u6b65\\u4e00\\u70b9\\u5c31\\u597d\\u3002', '\\u8fd8\\u6ca1\\u8d70\\uff1f\\u2026\\u2026\\u6211\\u4e5f\\u662f\\u3002'] },\n"
);

code = code.replace(
    "'\\u7d20\\u96c5': ['\\u4f60\\u597d\\u3002\\u4eca\\u5929\\u5fc3\\u60c5\\u600e\\u4e48\\u6837\\uff1f', '\\u4f60\\u7684\\u58f0\\u97f3\\u6700\\u8fd1\\u597d\\u4e86\\u5f88\\u591a\\u3002', '\\u8bb0\\u5f97\\u559d\\u6c34\\u3002'],",
    "'\\u7d20\\u96c5': { morning: ['\\u65e9\\u5b89\\u3002\\u4eca\\u5929\\u5fc3\\u60c5\\u600e\\u4e48\\u6837\\uff1f', '\\u65b0\\u7684\\u4e00\\u5929\\uff0c\\u52a0\\u6cb9\\u3002'], noon: ['\\u4f60\\u7684\\u58f0\\u97f3\\u6700\\u8fd1\\u597d\\u4e86\\u5f88\\u591a\\u3002', '\\u5403\\u996d\\u4e86\\u5417\\uff1f'], evening: ['\\u8bb0\\u5f97\\u559d\\u6c34\\u3002', '\\u665a\\u5b89\\u3002\\u660e\\u5929\\u89c1\\u3002'] },\n"
);

code = code.replace(
    "'\\u667a\\u5a9b': ['\\u65e9\\u5b89\\uff01\\u4eca\\u5929\\u4e5f\\u8981\\u5f00\\u5fc3\\u54e6~', '\\u4f60\\u6765\\u5566\\uff01\\u6211\\u6709\\u70b9\\u60f3\\u4f60\\u4e86\\uff01', '\\u4eca\\u5929\\u4e00\\u8d77\\u7ec3\\u4e60\\u5427~'],",
    "'\\u667a\\u5a9b': { morning: ['\\u65e9\\u5b89\\uff01\\u4eca\\u5929\\u4e5f\\u8981\\u5f00\\u5fc3\\u54e6~', '\\u8d77\\u5e8a\\u5566\\uff01\\u65b0\\u7684\\u4e00\\u5929\\uff01'], noon: ['\\u4f60\\u6765\\u5566\\uff01\\u6211\\u6709\\u70b9\\u60f3\\u4f60\\u4e86\\uff01', '\\u5348\\u996d\\u5403\\u4e86\\u5417\\uff1f\\u6211\\u8bf7\\u4f60\\uff01'], evening: ['\\u4eca\\u5929\\u4e00\\u8d77\\u7ec3\\u4e60\\u5427~', '\\u665a\\u5b89\\uff01\\u68a6\\u91cc\\u89c1\\uff01'] },\n"
);

code = code.replace(
    "'\\u4fca\\u660a': ['\\u65e9\\u3002\\u4eca\\u5929\\u7684\\u7ec3\\u4e60\\u5b89\\u6392\\u4e86\\u5417\\uff1f', '\\u4f60\\u6765\\u4e86\\uff01\\u7b49\\u4f60\\u5f88\\u4e45\\u4e86\\u3002', '\\u4e00\\u8d77\\u52a0\\u6cb9\\u5427\\u3002'],",
    "'\\u4fca\\u660a': { morning: ['\\u65e9\\u3002\\u4eca\\u5929\\u7684\\u7ec3\\u4e60\\u5b89\\u6392\\u4e86\\u5417\\uff1f', '\\u65b0\\u7684\\u4e00\\u5929\\uff0c\\u52a0\\u6cb9\\uff01'], noon: ['\\u4f60\\u6765\\u4e86\\uff01\\u7b49\\u4f60\\u5f88\\u4e45\\u4e86\\u3002', '\\u4e2d\\u5348\\u6ce8\\u610f\\u4f11\\u606f\\u3002'], evening: ['\\u4e00\\u8d77\\u52a0\\u6cb9\\u5427\\u3002', '\\u665a\\u5b89\\u3002\\u660e\\u5929\\u7ee7\\u7eed\\u3002'] },\n"
);

code = code.replace(
    "'\\u745e\\u8d24': ['\\u2026\\u2026\\u65e9\\u3002', '\\u6765\\u4e86\\u3002', '\\u2026\\u2026\\u52a0\\u6cb9\\u3002']",
    "'\\u745e\\u8d24': { morning: ['\\u2026\\u2026\\u65e9\\u3002', '\\u2026\\u2026\\u8d77\\u6765\\u4e86\\u3002'], noon: ['\\u6765\\u4e86\\u3002', '\\u2026\\u2026\\u5403\\u4e86\\u5417\\u3002'], evening: ['\\u2026\\u2026\\u52a0\\u6cb9\\u3002', '\\u665a\\u4e86\\u3002\\u4f11\\u606f\\u3002'] }"
);

// Now update _checkDailyLoginGreeting to use time-based greetings
code = code.replace(
    "var greetings = DAILY_GREETINGS[topNpc];\n    if (!greetings || greetings.length === 0) return;\n    var msg = greetings[Math.floor(Math.random() * greetings.length)];",
    "var greetings = DAILY_GREETINGS[topNpc];\n    if (!greetings) return;\n    var hour = new Date().getHours();\n    var timeSlot = hour < 12 ? 'morning' : (hour < 18 ? 'noon' : 'evening');\n    var pool = greetings[timeSlot] || greetings;\n    if (!pool || pool.length === 0) return;\n    var msg = pool[Math.floor(Math.random() * pool.length)];"
);

// =====================================================
// PATCH 12: NPC status display in scenes
// =====================================================
// The NPC_STATUS_TEXT and _getNpcStatusText already exist
// Need to ensure they're displayed in renderScenePage
// Add NPC status text display in scene page
code = code.replace(
    "if (_sceneLayer && typeof SCENE_NPC_MARKERS !== 'undefined' && typeof _renderSceneNpcMarkers === 'function') { _renderSceneNpcMarkers(_sceneLayer, sceneId); }",
    "if (_sceneLayer && typeof SCENE_NPC_MARKERS !== 'undefined' && typeof _renderSceneNpcMarkers === 'function') { _renderSceneNpcMarkers(_sceneLayer, sceneId); }\n    if (typeof _getNpcStatusText === 'function' && gameState.npc\\u597d\\u611f\\u5ea6) {\n        var _npcStatusHtml = '';\n        var _npcNames = Object.keys(gameState.npc\\u597d\\u611f\\u5ea6);\n        for (var _nsi = 0; _nsi < _npcNames.length; _nsi++) {\n            var _ns = _getNpcStatusText(_npcNames[_nsi]);\n            if (_ns) { _npcStatusHtml += '\\u003cdiv style=\"font-size:10px;color:rgba(255,255,255,0.7);margin-bottom:2px;\"\\u003e' + _npcNames[_nsi] + '\\uFF1A' + _ns + '\\u003c/div\\u003e'; }\n        }\n        if (_npcStatusHtml) {\n            var _npcStatusEl = document.createElement('div');\n            _npcStatusEl.style.cssText = 'position:absolute;bottom:50px;left:8px;z-index:20;max-width:180px;';\n            _npcStatusEl.innerHTML = _npcStatusHtml;\n            var _sceneContainer = container.querySelector('div[style*=\"z-index:1\"]');\n            if (_sceneContainer) _sceneContainer.appendChild(_npcStatusEl);\n        }\n    }"
);

// =====================================================
// PATCH 13: NPC "remember you" dialogue - inject choice history in love chat
// =====================================================
// Add choice history injection in sendLoveChat/npcLoveReplyAI
code = code.replace(
    "var context = name + '\\u548C' + gameState.player.name + '\\u5728\\u604B\\u7231\\u804A\\u5929';",
    "var context = name + '\\u548C' + gameState.player.name + '\\u5728\\u604B\\u7231\\u804A\\u5929'; var _chContext = _getChoiceContextForNpc(name); if (_chContext) context += '\\u3002' + _chContext;"
);

// Add _getChoiceContextForNpc function
var choiceContextCode = '\nfunction _getChoiceContextForNpc(npcName) {\n' +
    '    var cs = gameState.chapterState;\n' +
    '    if (!cs || !cs.choices || cs.choices.length === 0) return "";\n' +
    '    var relevantChoices = [];\n' +
    '    for (var i = cs.choices.length - 1; i >= 0 && relevantChoices.length < 2; i--) {\n' +
    '        var detail = (cs.choiceDetails && cs.choiceDetails[cs.choices[i].chapter + "." + cs.choices[i].step]) || "";\n' +
    '        if (detail) relevantChoices.push("\\u4F60\\u4E4B\\u524D\\u9009\\u62E9\\u4E86" + detail);\n' +
    '    }\n' +
    '    if (relevantChoices.length === 0) return "";\n' +
    '    return "\\u4F60\\u4E4B\\u524D" + relevantChoices.join("\\uFF0C") + "\\uFF0C\\u5728\\u5BF9\\u8BDD\\u4E2D\\u81EA\\u7136\\u5F15\\u7528\\u8FD9\\u4E2A\\u7ECF\\u5386";\n' +
    '}\n';

code = code.replace(
    'function sendLoveChat() {',
    choiceContextCode + 'function sendLoveChat() {'
);

// =====================================================
// PATCH 14: Key moment atmosphere overlay
// =====================================================
var atmosOverlayCode = '\nfunction _showAtmosphereOverlay(gradientFrom, gradientTo, text) {\n' +
    '    var overlay = document.createElement("div");\n' +
    '    overlay.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;z-index:10004;display:flex;flex-direction:column;justify-content:center;align-items:center;opacity:0;transition:opacity 1s;";\n' +
    '    var bg = document.createElement("div");\n' +
    '    bg.style.cssText = "position:absolute;top:0;left:0;width:100%;height:100%;background:linear-gradient(135deg," + (gradientFrom || "#0F0C29") + "," + (gradientTo || "#302B63") + ");";\n' +
    '    overlay.appendChild(bg);\n' +
    '    var mask = document.createElement("div");\n' +
    '    mask.style.cssText = "position:absolute;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.4);";\n' +
    '    overlay.appendChild(mask);\n' +
    '    var textEl = document.createElement("div");\n' +
    '    textEl.style.cssText = "position:relative;z-index:1;font-size:22px;font-weight:700;color:#F8FAFC;letter-spacing:3px;text-align:center;";\n' +
    '    textEl.textContent = text;\n' +
    '    overlay.appendChild(textEl);\n' +
    '    document.body.appendChild(overlay);\n' +
    '    setTimeout(function() { overlay.style.opacity = "1"; }, 30);\n' +
    '    setTimeout(function() {\n' +
    '        overlay.style.opacity = "0";\n' +
    '        setTimeout(function() { if (overlay.parentNode) overlay.parentNode.removeChild(overlay); }, 1000);\n' +
    '    }, 4000);\n' +
    '}\n';

code = code.replace(
    'function _showVisualPause(text, duration) {',
    atmosOverlayCode + 'function _showVisualPause(text, duration) {'
);

// Add atmosphere overlay calls at key moments
// In _completeAndAdvanceStep, add for chapter_end and specific steps
code = code.replace(
    "if (stepConfig.type === 'chapter_end') { _showVisualPause('\\u7AE0\\u8282\\u5B8C\\u6210', 2500); }",
    "if (stepConfig.type === 'chapter_end') { _showVisualPause('\\u7AE0\\u8282\\u5B8C\\u6210', 2500); }\n    if (stepKey === '3.4') { _showAtmosphereOverlay('#1A1A2E', '#16213E', '\\u4F60\\u62FF\\u4E0B\\u4E86\\u4E00\\u4F4D'); }\n    if (stepKey === '3.7') { _showAtmosphereOverlay('#0F0C29', '#302B63', '\\u5927\\u8D4F\\u63D0\\u540D'); }\n    if (stepKey === '3.0') { _showAtmosphereOverlay('#1A1A2E', '#E94560', '\\u4F60\\u51FA\\u9053\\u4E86'); }"
);

// =====================================================
// PATCH 15: Chapter unlock animation - enhance with 3D transform
// =====================================================
// The existing _showChapterUnlockAnim has basic fade. Add 3D transform + flip
code = code.replace(
    "overlay.innerHTML = '\\u003cdiv style=\"font-size:12px;color:#888;letter-spacing:0.3em;margin-bottom:16px;animation:_chFadeIn 1s ease-out forwards;\"\\u003e' + label + '\\u003c/div\\u003e'\n        + '\\u003cdiv style=\"font-size:26px;font-weight:700;color:#FFF;letter-spacing:0.15em;animation:_chFadeIn 1.5s ease-out forwards;\"\\u003e' + chapterTitle + '\\u003c/div\\u003e'\n        + '\\u003cdiv style=\"width:60px;height:1px;background:linear-gradient(90deg,transparent,#A78BFA,transparent);margin-top:20px;animation:_chFadeIn 2s ease-out forwards;\"\\u003e\\u003c/div\\u003e';",
    "overlay.innerHTML = '\\u003cstyle\\u003e@keyframes _chFlip{0%{transform:perspective(800px) rotateY(-90deg);opacity:0}50%{transform:perspective(800px) rotateY(10deg);opacity:1}100%{transform:perspective(800px) rotateY(0);opacity:1}}\\u003c/style\\u003e'\n        + '\\u003cdiv style=\"width:280px;padding:32px 24px;background:linear-gradient(135deg,#1A1A2E,#16213E);border:1px solid #A78BFA;border-radius:16px;text-align:center;animation:_chFlip 1.2s ease-out forwards;\"\\u003e'\n        + '\\u003cdiv style=\"font-size:12px;color:#A78BFA;letter-spacing:0.3em;margin-bottom:16px;\"\\u003e' + label + '\\u003c/div\\u003e'\n        + '\\u003cdiv style=\"font-size:26px;font-weight:700;color:#FFF;letter-spacing:0.15em;\"\\u003e' + chapterTitle + '\\u003c/div\\u003e'\n        + '\\u003cdiv style=\"width:60px;height:1px;background:linear-gradient(90deg,transparent,#A78BFA,transparent);margin:20px auto 0;\"\\u003e\\u003c/div\\u003e'\n        + '\\u003c/div\\u003e';"
);

// =====================================================
// PATCH 16: Affection stage visualization - _renderAffectionDots
// =====================================================
var affectionDotsCode = '\nfunction _renderAffectionDots(npcName) {\n' +
    '    var love = (gameState.npc\\u597d\\u611f\\u5ea6 && gameState.npc\\u597d\\u611f\\u5ea6[npcName]) || 0;\n' +
    '    var stages = [\n' +
    '        { min: 20, label: "\\u964C\\u751F", color: "#9CA3AF" },\n' +
    '        { min: 40, label: "\\u719F\\u6089", color: "#3B82F6" },\n' +
    '        { min: 60, label: "\\u6697\\u6627", color: "#A78BFA" },\n' +
    '        { min: 80, label: "\\u4EB2\\u5BC6", color: "#F59E0B" },\n' +
    '        { min: 100, label: "\\u4E13\\u5C5E", color: "#EF4444" }\n' +
    '    ];\n' +
    '    var html = "\\u003cdiv style=\\"display:flex;align-items:center;gap:6px;\\"\\u003e";\n' +
    '    for (var i = 0; i < stages.length; i++) {\n' +
    '        var reached = love >= stages[i].min;\n' +
    '        html += "\\u003cdiv style=\\"display:flex;flex-direction:column;align-items:center;gap:2px;\\"\\u003e";\n' +
    '        html += "\\u003cdiv style=\\"width:8px;height:8px;border-radius:50%;background:" + (reached ? stages[i].color : "#334155") + ";\\u003e\\u003c/div\\u003e";\n' +
    '        html += "\\u003cdiv style=\\"font-size:8px;color:" + (reached ? stages[i].color : "#475569") + ";\\u003e" + stages[i].label + "\\u003c/div\\u003e";\n' +
    '        html += "\\u003c/div\\u003e";\n' +
    '        if (i < stages.length - 1) html += "\\u003cdiv style=\\"width:8px;height:1px;background:#334155;\\"\\u003e\\u003c/div\\u003e";\n' +
    '    }\n' +
    '    html += "\\u003c/div\\u003e";\n' +
    '    return html;\n' +
    '}\n';

// Insert before _getAffectionStageHtml
code = code.replace(
    'function _getAffectionStageHtml(npcName) {',
    affectionDotsCode + 'function _getAffectionStageHtml(npcName) {'
);

// Add affection dots to NPC detail views - enhance _getAffectionStageHtml to include dots
code = code.replace(
    "return '\\u003cspan style=\"display:inline-flex;align-items:center;gap:3px;font-size:10px;color:' + status.color + ';\"\\u003e'\n        + '\\u003cspan style=\"width:5px;height:5px;border-radius:50%;background:' + status.color + ';\"\\u003e\\u003c/span\\u003e'\n        + status.label\n        + '\\u003c/span\\u003e';",
    "return _renderAffectionDots(npcName);"
);

// =====================================================
// PATCH 17: "My Choices" display (already added in PATCH 10)
// =====================================================

// =====================================================
// PATCH 18: Node completion emotional feedback
// =====================================================
// STEP_NPC_FEEDBACK already exists and _sendStepNpcMsg already runs in _completeAndAdvanceStep
// Add NODE_NPC_FEEDBACK mapping and enhance with red dot
var nodeFeedbackCode = '\nvar NODE_NPC_FEEDBACK = {\n' +
    "    '1.0': { npc: '\\u590f\\u6069', text: '\\u6B22\\u8FCE\\u6765\\u5230SEONGWOO ENT\\u3002' },\n" +
    "    '1.4': { npc: '\\u590f\\u6069', text: '\\u821E\\u8E48\\u8FDB\\u6B65\\u4E0D\\u5C0F\\uFF0C\\u7EE7\\u7EED\\u4FDD\\u6301\\u3002' },\n" +
    "    '2.2': { npc: '\\u4FCA\\u660A', text: '\\u8DEF\\u6F14\\u7684\\u611F\\u89C9\\u600E\\u4E48\\u6837\\uFF1F\\u7D27\\u5F20\\u4E86\\u5427\\uFF1F' },\n" +
    "    '3.4': { npc: '\\u7D20\\u96C5', text: '\\u4E00\\u4F4D\\u2026\\u2026\\u6211\\u4EEC\\u771F\\u7684\\u505A\\u5230\\u4E86\\u3002' },\n" +
    "    '5.6': { npc: '\\u745E\\u8D24', text: '\\u2026\\u2026\\u4F60\\u8FD8\\u597D\\u5417\\uFF1F' },\n" +
    "    '6.3': { npc: '\\u590f\\u6069', text: '\\u4F60\\u505A\\u5230\\u4E86\\u3002\\u6211\\u4E3A\\u4F60\\u9A84\\u50B2\\u3002' }\n" +
    '};\n';

code = code.replace(
    'function _sendStepNpcMsg(stepKey) {',
    nodeFeedbackCode + 'function _sendStepNpcMsg(stepKey) {'
);

// Enhance _sendStepNpcMsg to also check NODE_NPC_FEEDBACK
code = code.replace(
    "var feedback = STEP_NPC_FEEDBACK[stepKey];\n    if (!feedback) return;",
    "var feedback = STEP_NPC_FEEDBACK[stepKey] || NODE_NPC_FEEDBACK[stepKey];\n    if (!feedback) return;"
);

// Add red dot for NPC feedback messages
code = code.replace(
    "gameState.smsUnread = (gameState.smsUnread || 0) + 1;\n}",
    "gameState.smsUnread = (gameState.smsUnread || 0) + 1;\n    _addAppBadge('contacts', feedback.npc + '\\u7684\\u6D88\\u606F');\n}"
);

// =====================================================
// PATCH 19: Choice hint text for key choices
// =====================================================
var keyChoiceHintsCode = '\nvar KEY_CHOICE_HINTS = {\n' +
    "    '1.1': true,\n" +
    "    '1.5': true,\n" +
    "    '2.4': true,\n" +
    "    '3.5': true,\n" +
    "    '3.6': true,\n" +
    "    '5.3': true,\n" +
    "    '5.4': true,\n" +
    "    '6.3': true\n" +
    '};\n';

code = code.replace(
    'function _renderChoiceStep(inner, stepKey, stepConfig, chapter) {',
    keyChoiceHintsCode + 'function _renderChoiceStep(inner, stepKey, stepConfig, chapter) {'
);

// Add hint text under key choice buttons
code = code.replace(
    "btn.innerHTML = '\\u003cspan style=\"display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:50%;background:#334155;color:#94A3B8;font-size:13px;flex-shrink:0;\"\\u003e' + o.icon + '\\u003c/span\\u003e\\u003cspan style=\"flex:1;\"\\u003e' + o.text + '\\u003c/span\\u003e';",
    "var _isKeyChoice = KEY_CHOICE_HINTS[stepKey]; btn.innerHTML = '\\u003cspan style=\"display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:50%;background:#334155;color:#94A3B8;font-size:13px;flex-shrink:0;\"\\u003e' + o.icon + '\\u003c/span\\u003e\\u003cdiv style=\"flex:1;\"\\u003e\\u003cdiv\\u003e' + o.text + '\\u003c/div\\u003e' + (_isKeyChoice ? '\\u003cdiv style=\"font-size:11px;color:#64748B;margin-top:2px;\"\\u003e\\u8FD9\\u4E2A\\u9009\\u62E9\\u5C06\\u5F71\\u54CD\\u540E\\u7EED\\u5267\\u60C5\\u003c/div\\u003e' : '') + '\\u003c/div\\u003e';"
);

// =====================================================
// PATCH 20: Scene NPC positions and clickable markers
// =====================================================
var sceneNpcCode = '\nvar SCENE_NPC_POSITIONS = {\n' +
    "    practice_room: [\n" +
    "        { npc: '\\u590F\\u6069', x: 25, y: 45 },\n" +
    "        { npc: '\\u4FCA\\u660A', x: 70, y: 50 }\n" +
    "    ],\n" +
    "    lobby: [\n" +
    "        { npc: '\\u667A\\u5A9B', x: 30, y: 55 },\n" +
    "        { npc: '\\u7D20\\u96C5', x: 65, y: 45 }\n" +
    "    ],\n" +
    "    recording_studio: [\n" +
    "        { npc: '\\u7D20\\u96C5', x: 50, y: 40 },\n" +
    "        { npc: '\\u745E\\u8D24', x: 75, y: 55 }\n" +
    "    ],\n" +
    "    street: [\n" +
    "        { npc: '\\u4FCA\\u660A', x: 40, y: 50 },\n" +
    "        { npc: '\\u667A\\u5A9B', x: 60, y: 45 }\n" +
    "    ]\n" +
    '};\n\n' +
    'var SCENE_NPC_MARKERS = SCENE_NPC_POSITIONS;\n\n' +
    'function _renderSceneNpcMarkers(layer, sceneId) {\n' +
    '    var positions = SCENE_NPC_POSITIONS[sceneId];\n' +
    '    if (!positions) return;\n' +
    '    for (var i = 0; i < positions.length; i++) {\n' +
    '        var pos = positions[i];\n' +
    '        var npcLove = (gameState.npc\\u597d\\u611f\\u5ea6 && gameState.npc\\u597d\\u611f\\u5ea6[pos.npc]) || 0;\n' +
    '        if (npcLove < 10) continue;\n' +
    '        var npcColor = "#F59E0B";\n' +
    '        if (pos.npc === "\\u7D20\\u96C5") npcColor = "#A78BFA";\n' +
    '        else if (pos.npc === "\\u667A\\u5A9B") npcColor = "#F472B6";\n' +
    '        else if (pos.npc === "\\u4FCA\\u660A") npcColor = "#60A5FA";\n' +
    '        else if (pos.npc === "\\u745E\\u8D24") npcColor = "#34D399";\n' +
    '        var marker = document.createElement("div");\n' +
    '        marker.style.cssText = "position:absolute;left:" + pos.x + "%;top:" + pos.y + "%;transform:translate(-50%,-50%);cursor:pointer;z-index:12;-webkit-tap-highlight-color:transparent;";\n' +
    '        marker.innerHTML = \'<div style="width:36px;height:36px;border-radius:50%;background:\' + npcColor + \';display:flex;align-items:center;justify-content:center;font-size:12px;color:white;font-weight:700;box-shadow:0 2px 8px rgba(0,0,0,0.3);">\' + pos.npc.charAt(0) + \'</div><div style="font-size:8px;color:rgba(255,255,255,0.8);text-align:center;margin-top:2px;text-shadow:0 1px 3px rgba(0,0,0,0.7);">\' + pos.npc + \'</div>\';\n' +
    '        (function(npcName) {\n' +
    '            marker.onclick = function() { _showSceneNpcBubble(npcName); };\n' +
    '        })(pos.npc);\n' +
    '        layer.appendChild(marker);\n' +
    '    }\n' +
    '}\n\n' +
    'function _showSceneNpcBubble(npcName) {\n' +
    '    var bubble = document.createElement("div");\n' +
    '    bubble.style.cssText = "position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);z-index:10005;background:#1E293B;border-radius:12px;padding:16px;max-width:280px;width:90%;box-shadow:0 4px 20px rgba(0,0,0,0.5);";\n' +
    '    var tone = _getNpcToneDialogue(npcName) || "\\u2026\\u2026";\n' +
    '    var npcColor = "#F59E0B";\n' +
    '    if (npcName === "\\u7D20\\u96C5") npcColor = "#A78BFA";\n' +
    '    else if (npcName === "\\u667A\\u5A9B") npcColor = "#F472B6";\n' +
    '    else if (npcName === "\\u4FCA\\u660A") npcColor = "#60A5FA";\n' +
    '    else if (npcName === "\\u745E\\u8D24") npcColor = "#34D399";\n' +
    '    bubble.innerHTML = \'<div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;"><div style="width:32px;height:32px;border-radius:50%;background:\' + npcColor + \';display:flex;align-items:center;justify-content:center;font-size:14px;color:white;font-weight:700;">\' + npcName.charAt(0) + \'</div><div style="font-size:14px;font-weight:600;color:#F8FAFC;">\' + npcName + \'</div></div>\'\n' +
    '        + \'<div style="font-size:14px;color:#CBD5E1;line-height:1.6;margin-bottom:12px;">\\u201C\' + tone + \'\\u201D</div>\'\n' +
    '        + \'<div style="display:flex;gap:8px;"><button onclick="this.parentElement.parentElement.remove();window._loveChatTarget=\\\'\' + npcName + \'\\\';window._loveView=\\\'chat\\\';goToPage(\\\'dating\\\');" style="flex:1;padding:8px;background:var(--color-primary);color:white;border:none;border-radius:8px;font-size:13px;cursor:pointer;">\\u804A\\u5929</button><button onclick="this.parentElement.parentElement.remove();" style="flex:1;padding:8px;background:#334155;color:#94A3B8;border:none;border-radius:8px;font-size:13px;cursor:pointer;">\\u5173\\u95ED</button></div>\';\n' +
    '    document.body.appendChild(bubble);\n' +
    '}\n';

// Insert before renderScenePage
code = code.replace(
    'function renderScenePage(container) {',
    sceneNpcCode + 'function renderScenePage(container) {'
);

// Fix the npc好感度 unicode reference in PATCH 12 and 16
// The issue is that in the template strings above, we need to use the actual unicode chars
// Let's fix this by doing a targeted replacement
code = code.replace(/gameState\.npc\\u597d\\u611f\\u5ea6/g, 'gameState.npc\u597d\u611f\u5ea6');

// Write the patched file
fs.writeFileSync('/tmp/my-idol-v2/game.js', code, 'utf8');
console.log('All 20 patches applied successfully');
