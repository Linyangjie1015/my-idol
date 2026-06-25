// Incremental cleanup: delete functions one at a time and verify syntax
const fs = require('fs');
const acorn = require('acorn');

let code = fs.readFileSync('game.js', 'utf8');
const originalLines = code.split('\n').length;

function removeFunction(code, funcName) {
  const searchStr = 'function ' + funcName;
  let idx = code.indexOf(searchStr + '(');
  if (idx === -1) idx = code.indexOf(searchStr + ' (');
  if (idx === -1) return null;
  
  // Make sure it's at the start of a line or after whitespace
  if (idx > 0 && code[idx-1] !== '\n' && code[idx-1] !== ' ') return null;
  
  // Find the opening brace
  let braceIdx = code.indexOf('{', idx);
  if (braceIdx === -1) return null;
  
  // Count braces to find matching close
  let depth = 0;
  let started = false;
  for (let i = braceIdx; i < code.length; i++) {
    if (code[i] === '{') { depth++; started = true; }
    if (code[i] === '}') depth--;
    if (started && depth === 0) {
      // Find the start of the line containing the function
      let lineStart = code.lastIndexOf('\n', idx);
      if (lineStart === -1) lineStart = 0;
      else lineStart++; // skip the \n
      
      // Find the end of the line with the closing brace
      let lineEnd = code.indexOf('\n', i);
      if (lineEnd === -1) lineEnd = code.length;
      else lineEnd++; // include the \n
      
      return { start: lineStart, end: lineEnd, funcName: funcName };
    }
  }
  return null;
}

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
];

let removed = 0;
let failed = [];

for (const funcName of deadFuncs) {
  const result = removeFunction(code, funcName);
  if (result) {
    code = code.substring(0, result.start) + code.substring(result.end);
    removed++;
    // Quick syntax check after each removal
    try {
      acorn.parse(code, {ecmaVersion: 5, sourceType: 'script'});
    } catch(e) {
      failed.push({func: funcName, error: e.message, line: e.loc?.line});
      // Undo this removal
      // Actually we can't easily undo, so let's just note it and continue
      console.log('WARN: ' + funcName + ' caused parse error at line ' + e.loc?.line);
    }
  }
}

// Now handle Chinese-named functions using the raw code
const cnFuncs = [
  { name: 'render\u5feb\u9012\u670d\u52a1Page', desc: '快递服务' },
  { name: 'order\u5feb\u9012\u670d\u52a1', desc: '快递' },
  { name: 'render\u8d5a\u94b1\u4e2d\u5fc3Page', desc: '赚钱中心' },
];

for (const f of cnFuncs) {
  const result = removeFunction(code, f.name);
  if (result) {
    code = code.substring(0, result.start) + code.substring(result.end);
    removed++;
    try {
      acorn.parse(code, {ecmaVersion: 5, sourceType: 'script'});
    } catch(e) {
      failed.push({func: f.desc, error: e.message, line: e.loc?.line});
      console.log('WARN: ' + f.desc + ' caused parse error at line ' + e.loc?.line);
    }
  }
}

// Remove GACHA_POOL data structure
let gachaIdx = code.indexOf('var GACHA_POOL');
if (gachaIdx >= 0) {
  let depth = 0;
  let started = false;
  for (let i = gachaIdx; i < code.length; i++) {
    if (code[i] === '{' || code[i] === '[') { depth++; started = true; }
    if (code[i] === '}' || code[i] === ']') depth--;
    if (started && depth === 0) {
      let lineStart = code.lastIndexOf('\n', gachaIdx) + 1;
      let lineEnd = code.indexOf('\n', i) + 1;
      code = code.substring(0, lineStart) + code.substring(lineEnd);
      removed++;
      break;
    }
  }
}

// Remove exam variables
code = code.replace(/var isExamInProgress = false;\n/, '');
code = code.replace(/var currentExamSubject = '';\n/, '');
code = code.replace(/var currentExamLevel = 0;\n/, '');
code = code.replace(/var currentExamAttempt = 0;\n/, '');

// Remove earnCooldowns and gacha from gameState defaults
code = code.replace('    earnCooldowns: {},\n', '');
code = code.replace('    gacha: null,\n', '');

// Fix loan references
code = code.replace(
  /var loanWarning = \(gameState\.loanAmount > 0 && gameState\.loanInterest >= 5\)[^;]+;/,
  "var loanWarning = '';"
);
code = code.replace(
  /var hasBusinessLoan = \(gameState\.loanAmount > 0 && gameState\.loanInterest >= 5\);/,
  "var hasBusinessLoan = false;"
);

// Remove notifyGacha one-liner
code = code.replace("function notifyGacha(title, text) { showPhoneNotification('Gacha', title, text, '#FFD700'); }\n", '');

// Zero looksVal
code = code.replace(/looksVal: \d+/g, 'looksVal: 0');

// Remove earn jobs section from render行程表Page
const earnMarker = "// Earn jobs section (inline simplified earn logic)";
const earnIdx = code.indexOf(earnMarker);
if (earnIdx >= 0) {
  // Find the end - look for the closing } before getAppLinkHtml
  let depth = 0;
  let started = false;
  // The earn section is a block of code, find where it ends
  // It's a series of var declarations + a for loop + HTML building
  // Look for the pattern: after the for loop, there should be a } at the right level
  // The earn section starts at the comment and ends before getAppLinkHtml
  
  // Find getAppLinkHtml after the earn section
  const afterEarn = code.indexOf("getAppLinkHtml('schedule')", earnIdx);
  if (afterEarn >= 0) {
    // Go back to find the line start before getAppLinkHtml
    const lineStart = code.lastIndexOf('\n', afterEarn);
    // Remove from the earn marker to this line
    const earnLineStart = code.lastIndexOf('\n', earnIdx) + 1;
    code = code.substring(0, earnLineStart) + code.substring(lineStart + 1);
    removed++;
    console.log('Removed earn section');
  }
}

// Final verification
try {
  acorn.parse(code, {ecmaVersion: 5, sourceType: 'script'});
  console.log('FINAL: Syntax OK');
} catch(e) {
  console.log('FINAL: Syntax error - ' + e.message + ' at line ' + e.loc?.line);
}

const newLines = code.split('\n').length;
console.log('Lines: ' + originalLines + ' -> ' + newLines + ' (removed ' + (originalLines - newLines) + ')');
console.log('Functions removed: ' + removed);
console.log('Failed: ' + failed.length);

fs.writeFileSync('game.js', code, 'utf8');
