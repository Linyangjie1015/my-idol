const fs = require('fs');
const acorn = require('acorn');

let code = fs.readFileSync('game.js', 'utf8');

// Simple approach: rename deleted function calls to safe stub names
code = code.replace(/doEarnJob/g, '_removedEarnJob');
code = code.replace(/doGachaPull/g, '_removedGachaPull');
code = code.replace(/initGachaPool/g, '_removedInitGachaPool');
code = code.replace(/applyLoan/g, '_removedApplyLoan');
code = code.replace(/repayLoan/g, '_removedRepayLoan');

// Add stub functions at the end
var stubs = '\n\n// V2: Stubs for removed functions\n';
stubs += 'function _removedEarnJob(id) { showToast(\'此功能已下线\'); }\n';
stubs += 'function _removedGachaPull(n) { showToast(\'此功能已下线\'); }\n';
stubs += 'function _removedInitGachaPool() { return; }\n';
stubs += 'function _removedApplyLoan() { showToast(\'此功能已下线\'); }\n';
stubs += 'function _removedRepayLoan() { showToast(\'此功能已下线\'); }\n';

code += stubs;

try {
  acorn.parse(code, {ecmaVersion: 5, sourceType: 'script'});
  fs.writeFileSync('game.js', code, 'utf8');
  console.log('OK: Stubs added, syntax valid');
  console.log('Lines:', code.split('\n').length);
} catch(e) {
  console.log('ERROR:', e.message.substring(0,80), 'line', e.loc?.line);
}
