const fs = require('fs');
const acorn = require('acorn');

let code = fs.readFileSync('game.js', 'utf8');

function checkSyntax(code) {
  try { acorn.parse(code, {ecmaVersion: 5, sourceType: 'script'}); return true; }
  catch(e) { console.log('SYNTAX ERROR: ' + e.message.substring(0,60) + ' line ' + e.loc?.line); return false; }
}

// Fix 1: Replace doEarnJob onclick references in the earn section HTML
// These are in the earn jobs cards - but the earn section deletion failed
// Let me just comment out the onclick for now by replacing the function call
code = code.replace(/onclick="doEarnJob\([^)]*\)"/g, 'onclick="showToast(\'此功能已下线\')"');

// Fix 2: Replace doGachaPull references  
// These are in the gacha store page - need to disable the buttons
code = code.replace(/onclick="doGachaPull\([^)]*\)"/g, 'onclick="showToast(\'此功能已下线\')"');

// Fix 3: Replace initGachaPool calls
code = code.replace(/initGachaPool\(\)/g, '/* initGachaPool removed */');
code = code.replace(/if \(typeof initGachaPool === 'function'\) initGachaPool\(\);/g, '/* initGachaPool removed */');

// Fix 4: The applyLoan/repayLoan references are in a render function for the loan page
// Find the function that contains these references
let lines = code.split('\n');
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('applyLoan(') || lines[i].includes('repayLoan(')) {
    // Check what function this belongs to
    // Just replace the onclick
    lines[i] = lines[i].replace(/onclick="applyLoan\(\)"/g, 'onclick="showToast(\'此功能已下线\')"');
    lines[i] = lines[i].replace(/onclick="repayLoan\(\)"/g, 'onclick="showToast(\'此功能已下线\')"');
  }
}
code = lines.join('\n');

if (checkSyntax(code)) {
  fs.writeFileSync('game.js', code, 'utf8');
  console.log('All refs fixed, syntax OK');
  console.log('Lines: ' + code.split('\n').length);
} else {
  console.log('FAILED - not saving');
}
