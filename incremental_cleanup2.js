const fs = require('fs');
const acorn = require('acorn');

let code = fs.readFileSync('game.js', 'utf8');

function checkSyntax(code, label) {
  try {
    acorn.parse(code, {ecmaVersion: 5, sourceType: 'script'});
    return true;
  } catch(e) {
    console.log('ERROR after ' + label + ': line ' + e.loc?.line);
    return false;
  }
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
  if (!checkSyntax(code, 'GACHA_POOL')) console.log('ROLLBACK GACHA_POOL');
  else console.log('Removed GACHA_POOL: OK');
}

// === Remove exam variables ===
code = code.replace("var isExamInProgress = false;\n", '');
code = code.replace("var currentExamSubject = '';\n", '');
code = code.replace("var currentExamLevel = 0;\n", '');
code = code.replace("var currentExamAttempt = 0;\n", '');
if (!checkSyntax(code, 'exam_vars')) console.log('ROLLBACK exam vars');
else console.log('Removed exam vars: OK');

// === Remove gameState defaults ===
code = code.replace("    earnCooldowns: {},\n", '');
code = code.replace("    gacha: null,\n", '');
if (!checkSyntax(code, 'defaults')) console.log('ROLLBACK defaults');
else console.log('Removed defaults: OK');

// === Fix loanWarning - line-by-line ===
let lines = code.split('\n');
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
if (!checkSyntax(code, 'loan_fix')) console.log('ROLLBACK loan fix');
else console.log('Fixed loan refs: OK');

// === Remove notifyGacha ===
code = code.replace("function notifyGacha(title, text) { showPhoneNotification('Gacha', title, text, '#FFD700'); }\n", '');
if (!checkSyntax(code, 'notifyGacha')) console.log('ROLLBACK notifyGacha');
else console.log('Removed notifyGacha: OK');

// === Zero looksVal ===
code = code.replace(/looksVal: \d+/g, 'looksVal: 0');
if (!checkSyntax(code, 'looksVal')) console.log('ROLLBACK looksVal');
else console.log('Zeroed looksVal: OK');

// === Remove earn section ===
const earnMarker = "// Earn jobs section";
const earnIdx = code.indexOf(earnMarker);
if (earnIdx >= 0) {
  const afterEarn = code.indexOf("getAppLinkHtml('schedule')", earnIdx);
  if (afterEarn >= 0) {
    const earnLineStart = code.lastIndexOf('\n', earnIdx) + 1;
    const linkLineStart = code.lastIndexOf('\n', afterEarn) + 1;
    code = code.substring(0, earnLineStart) + code.substring(linkLineStart);
    if (!checkSyntax(code, 'earn_section')) console.log('ROLLBACK earn section');
    else console.log('Removed earn section: OK');
  }
}

// === Remove gacha scene ===
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
      break;
    }
  }
  if (!checkSyntax(code, 'gacha_scene')) console.log('ROLLBACK gacha scene');
  else console.log('Removed gacha scene: OK');
}

// === Remove IIFE exam block ===
// Look for the exam IIFE pattern
const examIife = "(function() {";
// Actually let me find the isolated exam code block
// From previous analysis, there was an isolated code block around line 1709
// Let me search for it
const examPattern = "// exam";
let examCommentIdx = code.indexOf(examPattern);
while (examCommentIdx >= 0) {
  // Check if this is followed by exam-related code
  const nextChars = code.substring(examCommentIdx, examCommentIdx + 200);
  if (nextChars.includes('weekly') || nextChars.includes('Weekly') || nextChars.includes('monthly') || nextChars.includes('Monthly')) {
    // This might be the exam IIFE - skip for now
    console.log('Found exam comment at char ' + examCommentIdx + ': ' + nextChars.substring(0, 80));
  }
  examCommentIdx = code.indexOf(examPattern, examCommentIdx + 1);
}

// === Final check ===
const finalLines = code.split('\n').length;
console.log('\nFinal: ' + finalLines + ' lines');
checkSyntax(code, 'FINAL');

fs.writeFileSync('game.js', code, 'utf8');
