const fs = require('fs');
const acorn = require('acorn');

let code = fs.readFileSync('game.js', 'utf8');

function checkSyntax(code) {
  try { acorn.parse(code, {ecmaVersion: 5, sourceType: 'script'}); return true; }
  catch(e) { return false; }
}

function removeFunction(code, funcName) {
  const searchStr = 'function ' + funcName + '(';
  let idx = code.indexOf(searchStr);
  if (idx === -1) return null;
  if (idx > 0 && code[idx-1] !== '\n' && code[idx-1] !== ' ' && code[idx-1] !== '\t') return null;
  let braceIdx = code.indexOf('{', idx);
  if (braceIdx === -1) return null;
  let depth = 0, started = false;
  for (let i = braceIdx; i < code.length; i++) {
    if (code[i] === '{') { depth++; started = true; }
    if (code[i] === '}') depth--;
    if (started && depth === 0) {
      let ls = code.lastIndexOf('\n', idx) + 1;
      let le = code.indexOf('\n', i);
      if (le === -1) le = code.length; else le++;
      return code.substring(0, ls) + code.substring(le);
    }
  }
  return null;
}

function tryRemove(code, funcName) {
  const newCode = removeFunction(code, funcName);
  if (newCode === null) { console.log('NOT FOUND: ' + funcName); return code; }
  if (checkSyntax(newCode)) {
    console.log('OK: ' + funcName);
    return newCode;
  }
  console.log('FAILED (kept original): ' + funcName);
  return code;
}

// Phase 1: Remove dead functions one at a time with rollback
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
  'render\u5feb\u9012\u670d\u52a1Page',
  'order\u5feb\u9012\u670d\u52a1',
  'render\u8d5a\u94b1\u4e2d\u5fc3Page',
];

for (const fn of deadFuncs) {
  code = tryRemove(code, fn);
}

// Phase 2: Other cleanups with rollback
// GACHA_POOL
{
  let gachaIdx = code.indexOf('var GACHA_POOL');
  if (gachaIdx >= 0) {
    let depth = 0, started = false;
    for (let i = gachaIdx; i < code.length; i++) {
      if (code[i] === '{' || code[i] === '[') { depth++; started = true; }
      if (code[i] === '}' || code[i] === ']') depth--;
      if (started && depth === 0) {
        let ls = code.lastIndexOf('\n', gachaIdx) + 1;
        let le = code.indexOf('\n', i) + 1;
        let newCode = code.substring(0, ls) + code.substring(le);
        if (checkSyntax(newCode)) { code = newCode; console.log('OK: GACHA_POOL'); }
        else console.log('FAILED: GACHA_POOL');
        break;
      }
    }
  }
}

// Exam variables
for (const varLine of [
  "var isExamInProgress = false;\n",
  "var currentExamSubject = '';\n",
  "var currentExamLevel = 0;\n",
  "var currentExamAttempt = 0;\n"
]) {
  let newCode = code.replace(varLine, '');
  if (checkSyntax(newCode)) { code = newCode; console.log('OK: ' + varLine.trim()); }
  else console.log('FAILED: ' + varLine.trim());
}

// GameState defaults
for (const defLine of ["    earnCooldowns: {},\n", "    gacha: null,\n"]) {
  let newCode = code.replace(defLine, '');
  if (checkSyntax(newCode)) { code = newCode; console.log('OK: ' + defLine.trim()); }
  else console.log('FAILED: ' + defLine.trim());
}

// Loan references (line-by-line replacement)
{
  let lines = code.split('\n');
  let modified = false;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('var loanWarning') && lines[i].includes('loanAmount')) {
      let oldLine = lines[i];
      lines[i] = "    var loanWarning = '';";
      let newCode = lines.join('\n');
      if (checkSyntax(newCode)) { code = newCode; modified = true; console.log('OK: loanWarning'); }
      else { lines[i] = oldLine; console.log('FAILED: loanWarning'); }
    }
    if (lines[i].includes('var hasBusinessLoan') && lines[i].includes('loanAmount')) {
      let oldLine = lines[i];
      lines[i] = "    var hasBusinessLoan = false;";
      let newCode = lines.join('\n');
      if (checkSyntax(newCode)) { code = newCode; modified = true; console.log('OK: hasBusinessLoan'); }
      else { lines[i] = oldLine; console.log('FAILED: hasBusinessLoan'); }
    }
  }
}

// notifyGacha
{
  let newCode = code.replace("function notifyGacha(title, text) { showPhoneNotification('Gacha', title, text, '#FFD700'); }\n", '');
  if (checkSyntax(newCode)) { code = newCode; console.log('OK: notifyGacha'); }
  else console.log('FAILED: notifyGacha');
}

// looksVal
{
  let newCode = code.replace(/looksVal: \d+/g, 'looksVal: 0');
  if (checkSyntax(newCode)) { code = newCode; console.log('OK: looksVal'); }
  else console.log('FAILED: looksVal');
}

// Earn section
{
  const earnMarker = "// Earn jobs section";
  const earnIdx = code.indexOf(earnMarker);
  if (earnIdx >= 0) {
    const afterEarn = code.indexOf("getAppLinkHtml('schedule')", earnIdx);
    if (afterEarn >= 0) {
      const earnLineStart = code.lastIndexOf('\n', earnIdx) + 1;
      const linkLineStart = code.lastIndexOf('\n', afterEarn) + 1;
      let newCode = code.substring(0, earnLineStart) + code.substring(linkLineStart);
      if (checkSyntax(newCode)) { code = newCode; console.log('OK: earn_section'); }
      else console.log('FAILED: earn_section');
    }
  }
}

// Gacha scene
{
  const gachaSceneIdx = code.indexOf("    gacha: {");
  if (gachaSceneIdx >= 0) {
    let depth = 0, started = false;
    for (let i = gachaSceneIdx; i < code.length; i++) {
      if (code[i] === '{') { depth++; started = true; }
      if (code[i] === '}') depth--;
      if (started && depth === 0) {
        let ls = code.lastIndexOf('\n', gachaSceneIdx) + 1;
        let le = code.indexOf('\n', i) + 1;
        let newCode = code.substring(0, ls) + code.substring(le);
        if (checkSyntax(newCode)) { code = newCode; console.log('OK: gacha_scene'); }
        else console.log('FAILED: gacha_scene');
        break;
      }
    }
  }
}

console.log('\nFinal lines: ' + code.split('\n').length);
console.log('Final syntax: ' + (checkSyntax(code) ? 'OK' : 'FAILED'));

fs.writeFileSync('game.js', code, 'utf8');
