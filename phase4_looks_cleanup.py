with open('/tmp/my-idol-v2/game.js', 'r') as f:
    content = f.read()

import re

changes = 0

# 1. Remove looksVal from item data - replace looksVal: N with nothing
# This handles things like: { name: '基础护肤套装', price: 15000, lifeVal: 3, looksVal: 8, category: '护肤', effect: '颜值' }
# Strategy: remove looksVal property from objects, remove 颜值 effect references

# Remove ", looksVal: N" patterns from item objects
content_new = re.sub(r',\s*looksVal:\s*\d+', '', content)
if content_new != content:
    changes += 1
    content = content_new

# Remove "looksVal: N," patterns (when looksVal is first property)
content_new = re.sub(r'looksVal:\s*\d+,\s*', '', content)
if content_new != content:
    changes += 1
    content = content_new

# 2. Replace 颜值 effect with empty/体力 effect
content_new = content.replace("effect: '颜值'", "effect: ''")
if content_new != content:
    changes += 1
    content = content_new

content_new = content.replace("effect: '\\u989c\\u503c'", "effect: ''")
if content_new != content:
    changes += 1
    content = content_new

# 3. Remove looksVal display logic in wardrobe
# "提升颜值" -> "选择穿搭风格"
content_new = content.replace("选择穿搭风格，提升颜值", "选择穿搭风格")
if content_new != content:
    changes += 1
    content = content_new

# Remove '+ item.looksVal + '颜值' display
content_new = re.sub(r"\s*\|\s*\+\s*item\.looksVal\s*\+\s*'颜值'", '', content)
if content_new != content:
    changes += 1
    content = content_new

# Remove showToast with looksVal
content_new = re.sub(r"showToast\('换上了 '\s*\+\s*item\.name\s*\+\s*'\s*\+'\s*\+\s*item\.looksVal\s*\+\s*'颜值'\)", 
                      "showToast('换上了 ' + item.name)", content)
if content_new != content:
    changes += 1
    content = content_new

# 4. Remove 颜值 effect text display
# "else if (item.effect === '颜值') effectText = '+' + (item.looksVal || 0) + ' 颜值';"
content_new = re.sub(
    r"else\s+if\s*\(\s*item\.effect\s*===\s*'\\?u989c\\?u503c?'\s*\)\s*effectText\s*=\s*'\+'\s*\+\s*\(\s*item\.looksVal\s*\|\|\s*0\s*\)\s*\+\s*'\s*\\?u989c\\?u503c?'\s*;",
    '', content)
if content_new != content:
    changes += 1
    content = content_new

# 5. Remove looksVal from itemVal calculation
# "var itemVal = item.looksVal || item.lifeVal || item.fameVal || Math.abs(item.dangerVal || 0);"
content_new = content.replace("item.looksVal || item.lifeVal", "item.lifeVal")
if content_new != content:
    changes += 1
    content = content_new

# 6. Remove g.looksVal display
# "else if (g.looksVal) { gEffectText = '+' + g.looksVal + ' 颜值'; gVal = g.looksVal; gEffect = '颜值'; }"
content_new = re.sub(
    r"else\s+if\s*\(\s*g\.looksVal\s*\)\s*\{\s*gEffectText\s*=\s*'\+'\s*\+\s*g\.looksVal\s*\+\s*'\s*\\?u989c\\?u503c?'\s*;\s*gVal\s*=\s*g\.looksVal\s*;\s*gEffect\s*=\s*'\\?u989c\\?u503c?'\s*;\s*\}",
    '', content)
if content_new != content:
    changes += 1
    content = content_new

# 7. Remove gameState.looks initialization
content_new = re.sub(r"if\s*\(\s*!gameState\.looks\s*\)\s*gameState\.looks\s*=\s*50\s*;\s*", '', content)
if content_new != content:
    changes += 1
    content = content_new

# 8. Remove gameState.looks increment
content_new = re.sub(r"gameState\.looks\s*=\s*gameState\.looks\s*\+\s*value\s*;\s*", '', content)
if content_new != content:
    changes += 1
    content = content_new

# 9. Remove loan-related references still remaining
# loanWarning, hasBusinessLoan
content_new = re.sub(r"var\s+loanWarning\s*=\s*[^;]+;\s*", '', content)
if content_new != content:
    changes += 1
    content = content_new

content_new = re.sub(r"var\s+hasBusinessLoan\s*=\s*[^;]+;\s*", '', content)
if content_new != content:
    changes += 1
    content = content_new

# 10. Remove earnCooldowns initialization that might still be there
content_new = re.sub(r"if\s*\(\s*!gameState\.earnCooldowns\s*\)\s*gameState\.earnCooldowns\s*=\s*\{\}\s*;\s*", '', content)
if content_new != content:
    changes += 1
    content = content_new

with open('/tmp/my-idol-v2/game.js', 'w') as f:
    f.write(content)

lines = content.count('\n') + 1
print(f"Phase 4 changes: {changes}")
print(f"Lines after: {lines}")
