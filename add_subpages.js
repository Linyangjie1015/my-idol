const fs = require('fs');
const acorn = require('acorn');

let code = fs.readFileSync('game.js', 'utf8');

// Find the render我的Page function and add sub-page links before "账号" section
// Use line-by-line approach to avoid string escaping issues
let lines = code.split('\n');
let inserted = false;

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('账号操作') && !inserted) {
    // Insert sub-page HTML before this line
    const subPages = [
      "                '<div class=\"section-title\" style=\"margin-top:16px;\">更多</div>'",
      "                + '<div class=\"card\" onclick=\"_showSubPage(\\'ranking\\')\" style=\"cursor:pointer;display:flex;align-items:center;justify-content:space-between;\">'",
      "                + '<div><div style=\"font-weight:600;\">排行榜</div><div style=\"font-size:12px;color:var(--color-text-light);\">查看人气排名</div></div>'",
      "                + '<svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"var(--color-text-light)\" stroke-width=\"2\"><polyline points=\"9 18 15 12 9 6\"></polyline></svg>'",
      "                + '</div>'",
      "                + '<div class=\"card\" onclick=\"_showSubPage(\\'wiki\\')\" style=\"cursor:pointer;display:flex;align-items:center;justify-content:space-between;\">'",
      "                + '<div><div style=\"font-weight:600;\">Kpop百科</div><div style=\"font-size:12px;color:var(--color-text-light);\">K-Pop知识问答</div></div>'",
      "                + '<svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"var(--color-text-light)\" stroke-width=\"2\"><polyline points=\"9 18 15 12 9 6\"></polyline></svg>'",
      "                + '</div>'",
      "                + '<div class=\"card\" onclick=\"_showSubPage(\\'achievements\\')\" style=\"cursor:pointer;display:flex;align-items:center;justify-content:space-between;\">'",
      "                + '<div><div style=\"font-weight:600;\">成就</div><div style=\"font-size:12px;color:var(--color-text-light);\">查看你的成就进度</div></div>'",
      "                + '<svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"var(--color-text-light)\" stroke-width=\"2\"><polyline points=\"9 18 15 12 9 6\"></polyline></svg>'",
      "                + '</div>'",
    ];
    for (let j = 0; j < subPages.length; j++) {
      lines.splice(i + j, 0, subPages[j]);
    }
    inserted = true;
    break;
  }
}

code = lines.join('\n');

try {
  acorn.parse(code, {ecmaVersion: 5, sourceType: 'script'});
  fs.writeFileSync('game.js', code, 'utf8');
  console.log('OK: Sub-page links added');
  console.log('Lines:', code.split('\n').length);
} catch(e) {
  console.log('ERROR:', e.message.substring(0,80), 'line', e.loc?.line);
}
