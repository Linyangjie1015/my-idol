const fs = require('fs');
const acorn = require('acorn');

let code = fs.readFileSync('game.js.backup', 'utf8');

function removeFunction(code, funcName) {
  const searchStr = 'function ' + funcName + '(';
  let idx = code.indexOf(searchStr);
  if (idx === -1) return {code, found: false};
  if (idx > 0 && code[idx-1] !== '\n' && code[idx-1] !== ' ' && code[idx-1] !== '\t') return {code, found: false};
  
  let braceIdx = code.indexOf('{', idx);
  if (braceIdx === -1) return {code, found: false};
  
  let depth = 0, started = false;
  for (let i = braceIdx; i < code.length; i++) {
    if (code[i] === '{') { depth++; started = true; }
    if (code[i] === '}') depth--;
    if (started && depth === 0) {
      let lineStart = code.lastIndexOf('\n', idx);
      if (lineStart === -1) lineStart = 0; else lineStart++;
      let lineEnd = code.indexOf('\n', i);
      if (lineEnd === -1) lineEnd = code.length; else lineEnd++;
      return {code: code.substring(0, lineStart) + code.substring(lineEnd), found: true};
    }
  }
  return {code, found: false};
}

function checkSyntax(code, label) {
  try {
    acorn.parse(code, {ecmaVersion: 5, sourceType: 'script'});
    return true;
  } catch(e) {
    console.log('SYNTAX ERROR after ' + label + ': ' + e.message.substring(0,60) + ' at line ' + e.loc?.line);
    return false;
  }
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
  'render\u5feb\u9012\u670d\u52a1Page',
  'order\u5feb\u9012\u670d\u52a1',
  'render\u8d5a\u94b1\u4e2d\u5fc3Page',
];

let removedCount = 0;
for (const fn of deadFuncs) {
  const result = removeFunction(code, fn);
  if (result.found) {
    code = result.code;
    removedCount++;
    if (!checkSyntax(code, fn)) {
      console.log('ROLLBACK: ' + fn + ' broke syntax, reverting');
      // Can't easily revert, so just report
      break;
    }
  }
}

console.log('Removed ' + removedCount + ' functions, syntax still OK');
fs.writeFileSync('game.js', code, 'utf8');
