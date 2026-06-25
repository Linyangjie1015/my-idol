const fs = require('fs');
const acorn = require('acorn');

let code = fs.readFileSync('game.js', 'utf8');
const originalLines = code.split('\n').length;

function removeFunction(code, funcName) {
  const searchStr = 'function ' + funcName + '(';
  let idx = code.indexOf(searchStr);
  if (idx === -1) return null;
  // Make sure it's a proper function declaration
  if (idx > 0 && code[idx-1] !== '\n' && code[idx-1] !== ' ' && code[idx-1] !== '\t') return null;
  
  let braceIdx = code.indexOf('{', idx);
  if (braceIdx === -1) return null;
  
  let depth = 0, started = false;
  for (let i = braceIdx; i < code.length; i++) {
    if (code[i] === '{') { depth++; started = true; }
    if (code[i] === '}') depth--;
    if (started && depth === 0) {
      let lineStart = code.lastIndexOf('\n', idx);
      if (lineStart === -1) lineStart = 0; else lineStart++;
      let lineEnd = code.indexOf('\n', i);
      if (lineEnd === -1) lineEnd = code.length; else lineEnd++;
      return { start: lineStart, end: lineEnd };
    }
  }
  return null;
}

function safeRemove(code, funcName) {
  const r = removeFunction(code, funcName);
  if (!r) { console.log('NOT FOUND: ' + funcName); return code; }
  code = code.substring(0, r.start) + code.substring(r.end);
  return code;
}

// === Remove dead functions ===
const deadFuncs = [
  '_ensureExamState', '_examResultHtml', '_finishExam',
  '_ensureWeeklyMonthlyExam', '_checkWeeklyMonthlyExamPenalty',
  'takeWeeklyExam', 'takeMonthlyExam', 'takeRandomInspection',
  'renderFoodPage', 'applyLoan', 'repayLoan',
  'doEarnJob', '_completeEarnJob',
  'initGachaPool', 'getGachaCard', 'pullGacha',
  '_countTotalGachaCards', 'doGachaPull',
  '_injectGachaCSS', '_showGachaParticleBurst', 'showGachaResult',
  'renderWeeklyMonthlyExamSection', '_isWeeklyExamTime', '_isMonthlyExamTime',
  'switchEarnTab',
  // Chinese-named functions
  'render\u5feb\u9012\u670d\u52a1Page',
  'order\u5feb\u9012\u670d\u52a1',
  'render\u8d5a\u94b1\u4e2d\u5fc3Page',
];

for (const fn of deadFuncs) {
  code = safeRemove(code, fn);
}

// === Remove GACHA_POOL ===
let gachaIdx = code.indexOf('var GACHA_POOL');
if (gachaIdx >= 0) {
  let depth = 0, started = false;
  for (let i = gachaIdx; i < code.length; i++) {
    if (code[i] === '{' || code[i] === '[') { depth++; started = true; }
    if (code[i] === '}' || code[i] === ']') depth--;
    if (started && depth === 0) {
      let ls = code.lastIndexOf('\n', gachaIdx) + 1;
      let le = code.indexOf('\n', i) + 1;
      code = code.substring(0, ls) + code.substring(le);
      break;
    }
  }
}

// === Remove exam variables ===
code = code.replace("var isExamInProgress = false;\n", '');
code = code.replace("var currentExamSubject = '';\n", '');
code = code.replace("var currentExamLevel = 0;\n", '');
code = code.replace("var currentExamAttempt = 0;\n", '');

// === Remove gameState defaults ===
code = code.replace("    earnCooldowns: {},\n", '');
code = code.replace("    gacha: null,\n", '');

// === Fix loanWarning - REPLACE ENTIRE LINE ===
const lines = code.split('\n');
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('var loanWarning') && lines[i].includes('loanAmount')) {
    lines[i] = "    var loanWarning = '';";
    console.log('Fixed loanWarning at line ' + (i+1));
  }
  if (lines[i].includes('var hasBusinessLoan') && lines[i].includes('loanAmount')) {
    lines[i] = "    var hasBusinessLoan = false;";
    console.log('Fixed hasBusinessLoan at line ' + (i+1));
  }
}
code = lines.join('\n');

// === Remove notifyGacha ===
code = code.replace("function notifyGacha(title, text) { showPhoneNotification('Gacha', title, text, '#FFD700'); }\n", '');

// === Zero looksVal ===
code = code.replace(/looksVal: \d+/g, 'looksVal: 0');

// === Remove earn section ===
const earnMarker = "// Earn jobs section";
const earnIdx = code.indexOf(earnMarker);
if (earnIdx >= 0) {
  // Find the end of this section
  // It's inside render行程表Page, after schedule items, before getAppLinkHtml
  const afterEarn = code.indexOf("getAppLinkHtml('schedule')", earnIdx);
  if (afterEarn >= 0) {
    // Find the line boundary
    const earnLineStart = code.lastIndexOf('\n', earnIdx) + 1;
    // Go back from getAppLinkHtml to find the line start
    const linkLineStart = code.lastIndexOf('\n', afterEarn) + 1;
    code = code.substring(0, earnLineStart) + code.substring(linkLineStart);
    console.log('Removed earn section');
  }
}

// === Remove gacha scene from SCENES ===
const gachaSceneIdx = code.indexOf("    gacha: {");
if (gachaSceneIdx >= 0) {
  let depth = 0, started = false;
  for (let i = gachaSceneIdx; i < code.length; i++) {
    if (code[i] === '{') { depth++; started = true; }
    if (code[i] === '}') depth--;
    if (started && depth === 0) {
      let ls = code.lastIndexOf('\n', gachaSceneIdx) + 1;
      let le = code.indexOf('\n', i) + 1;
      code = code.substring(0, ls) + code.substring(le);
      console.log('Removed gacha scene');
      break;
    }
  }
}

// === Final verification ===
try {
  acorn.parse(code, {ecmaVersion: 5, sourceType: 'script'});
  console.log('FINAL: Syntax OK');
} catch(e) {
  console.log('FINAL: Syntax error at line ' + e.loc?.line + ': ' + e.message.substring(0, 80));
}

const newLines = code.split('\n').length;
console.log('Lines: ' + originalLines + ' -> ' + newLines);
fs.writeFileSync('game.js', code, 'utf8');
