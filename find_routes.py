with open('/tmp/my-idol-v2/game.js', 'r') as f:
    lines = f.readlines()

# Find render function
for i, line in enumerate(lines):
    s = line.strip()
    if s.startswith('function render(') or s.startswith('function render ('):
        print(f"render() starts at L{i+1}")
        break

# Find all case branches in render()
in_render = False
brace_depth = 0
for i, line in enumerate(lines):
    s = line.strip()
    if 'function render(' in s or 'function render (' in s:
        in_render = True
        brace_depth = 0
    if in_render:
        brace_depth += line.count('{') - line.count('}')
        if s.startswith("case '") or s.startswith('case "'):
            # Extract case label
            label = s.split("'")[1] if "'" in s else s.split('"')[1]
            print(f"  L{i+1}: case '{label}' -- {s[:100]}")
        if brace_depth == 0 and i > 0:
            break

