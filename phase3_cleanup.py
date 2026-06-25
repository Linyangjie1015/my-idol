with open('/tmp/my-idol-v2/game.js', 'r') as f:
    content = f.read()
    lines = content.split('\n')

changes = 0

# 1. Remove loanAmount and loanInterest from gameState defaults
new_lines = []
for i, line in enumerate(lines):
    s = line.strip()
    # Remove loan fields
    if s == 'loanAmount: 0,' or s == 'loanInterest: 0,':
        changes += 1
        continue
    # Remove earnCooldowns
    if s == 'earnCooldowns: {},':
        changes += 1
        continue
    new_lines.append(line)

lines = new_lines

# 2. Remove examResult from gameState defaults
new_lines = []
for i, line in enumerate(lines):
    s = line.strip()
    if s == 'examResult: { comprehensive: [false, false] },':
        changes += 1
        continue
    new_lines.append(line)

lines = new_lines

# 3. Remove gacha: null from gameState defaults
new_lines = []
for i, line in enumerate(lines):
    s = line.strip()
    if s == 'gacha: null,':
        changes += 1
        continue
    new_lines.append(line)

lines = new_lines

# 4. Remove loan references
# L13840: loanWarning
# L14015: hasBusinessLoan
# These need more targeted removal

# 5. Remove scene entry for gacha
# gacha: { name: '周边店', img: 'imgs/scenes/gacha.jpg', hotspots: [...] }
# Find and remove this
in_gacha_scene = False
brace_depth = 0
new_lines = []
for i, line in enumerate(lines):
    s = line.strip()
    if s.startswith('gacha: {') and '周边店' in line:
        in_gacha_scene = True
        brace_depth = line.count('{') - line.count('}')
        changes += 1
        continue
    if in_gacha_scene:
        brace_depth += line.count('{') - line.count('}')
        if brace_depth <= 0:
            in_gacha_scene = False
        continue
    new_lines.append(line)

lines = new_lines

# 6. Remove loan warning and hasBusinessLoan references
# These are more complex - need to find and neutralize them
# loanWarning is typically used as a variable
# Let's find and handle them
new_lines = []
for line in lines:
    s = line.strip()
    # Remove loanWarning variable declaration
    if 'loanWarning' in s and 'var loanWarning' in s:
        # Replace with empty string
        new_lines.append('')
        changes += 1
        continue
    # Remove hasBusinessLoan variable declaration
    if 'hasBusinessLoan' in s and 'var hasBusinessLoan' in s:
        new_lines.append('')
        changes += 1
        continue
    # Remove loanWarning usage in HTML
    if 'loanWarning' in s and '+ loanWarning' in s:
        # Replace + loanWarning with empty
        new_lines.append(line.replace('+ loanWarning', ''))
        changes += 1
        continue
    # Remove hasBusinessLoan usage
    if 'hasBusinessLoan' in s and 'if (hasBusinessLoan)' in s:
        # Skip this line and its block
        new_lines.append('')
        changes += 1
        continue
    new_lines.append(line)

lines = new_lines

with open('/tmp/my-idol-v2/game.js', 'w') as f:
    f.write('\n'.join(lines))

print(f"Phase 3 changes: {changes}")
print(f"Lines after: {len(lines)}")
