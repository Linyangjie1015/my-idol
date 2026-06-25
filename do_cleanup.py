import re

with open('/tmp/my-idol-v2/game.js', 'r') as f:
    lines = f.readlines()

total = len(lines)
print(f"Starting with {total} lines")

# Helper to find a function's line range
def find_func(name, approx_line, lines):
    start = None
    for i in range(max(0, approx_line - 5), min(len(lines), approx_line + 20)):
        stripped = lines[i].strip()
        if re.match(r'function\s+' + re.escape(name) + r'\s*\(', stripped):
            start = i
            break
        if re.match(r'var\s+' + re.escape(name) + r'\s*=\s*function', stripped):
            start = i
            break
    if start is None:
        return None
    brace_count = 0
    found_open = False
    end = None
    for i in range(start, len(lines)):
        for ch in lines[i]:
            if ch == '{':
                brace_count += 1
                found_open = True
            elif ch == '}':
                brace_count -= 1
                if found_open and brace_count == 0:
                    end = i
                    break
        if end is not None:
            break
    if end is None:
        return None
    return (start, end)  # 0-based inclusive

# Collect all ranges to delete (0-based line indices)
ranges_to_delete = []

def add_range(start, end, label=""):
    """Add a range of lines to delete (0-based, inclusive)"""
    ranges_to_delete.append((start, end, label))

# ==========================================
# 1. EXAM SYSTEM
# ==========================================

# Exam variables and IIFE (L1711-1717, 0-based: 1710-1716)
# L1711: // ==================== EXAM SYSTEM ====================
# L1712: var isExamInProgress = false;
# L1713: // Reset stuck exam state on load
# L1714: (function(){...})();
# L1715: var currentExamSubject = '';
# L1716: var currentExamLevel = 0;
# L1717: var currentExamAttempt = 0;
# L1718: (empty line)
add_range(1710, 1717, "exam vars + IIFE")

# passExam (L1800-L1813)
r = find_func('passExam', 1800, lines)
if r: add_range(r[0], r[1], "passExam")

# _ensureExamState (L1781-L1798)
r = find_func('_ensureExamState', 1781, lines)
if r: add_range(r[0], r[1], "_ensureExamState")

# _examResultHtml (L1819-L1830)
r = find_func('_examResultHtml', 1819, lines)
if r: add_range(r[0], r[1], "_examResultHtml")

# _finishExam (L1832-L1840)
r = find_func('_finishExam', 1832, lines)
if r: add_range(r[0], r[1], "_finishExam")

# Exam game renderers
for fname, approx in [
    ('renderDanceExam', 1843),
    ('renderVocalExam', 1951),
    ('renderRapExam', 2042),
    ('renderActingExam', 2122),
    ('renderVarietyExam', 2202),
    ('renderComprehensiveExam', 2282),
]:
    r = find_func(fname, approx, lines)
    if r: add_range(r[0], r[1], fname)

# _ensureWeeklyMonthlyExam (L11336-L11343)
r = find_func('_ensureWeeklyMonthlyExam', 11336, lines)
if r: add_range(r[0], r[1], "_ensureWeeklyMonthlyExam")

# _checkWeeklyMonthlyExamPenalty (L11371-L11404)
r = find_func('_checkWeeklyMonthlyExamPenalty', 11371, lines)
if r: add_range(r[0], r[1], "_checkWeeklyMonthlyExamPenalty")

# takeWeeklyExam (L11406-L11434)
r = find_func('takeWeeklyExam', 11406, lines)
if r: add_range(r[0], r[1], "takeWeeklyExam")

# takeMonthlyExam (L11436-L11465)
r = find_func('takeMonthlyExam', 11436, lines)
if r: add_range(r[0], r[1], "takeMonthlyExam")

# renderWeeklyMonthlyExamSection (L11467-L11518)
r = find_func('renderWeeklyMonthlyExamSection', 11467, lines)
if r: add_range(r[0], r[1], "renderWeeklyMonthlyExamSection")

# takeRandomInspection (L11520-L11550)
r = find_func('takeRandomInspection', 11520, lines)
if r: add_range(r[0], r[1], "takeRandomInspection")

# ==========================================
# 2. FOOD PAGE (外卖APP)
# ==========================================
r = find_func('renderFoodPage', 7454, lines)
if r: add_range(r[0], r[1], "renderFoodPage")

# ==========================================
# 3. EXPRESS (快递APP)
# ==========================================
r = find_func('render快递服务Page', 7549, lines)
if r: add_range(r[0], r[1], "render快递服务Page")

r = find_func('order快递服务', 7633, lines)
if r: add_range(r[0], r[1], "order快递服务")

# ==========================================
# 4. LOAN APP
# ==========================================
r = find_func('applyLoan', 7674, lines)
if r: add_range(r[0], r[1], "applyLoan")

r = find_func('repayLoan', 7694, lines)
if r: add_range(r[0], r[1], "repayLoan")

# ==========================================
# 5. GACHA SYSTEM
# ==========================================
for fname, approx in [
    ('initGachaPool', 11570),
    ('getGachaCard', 11649),
    ('pullGacha', 11694),
    ('_countTotalGachaCards', 11771),
    ('doGachaPull', 11853),
    ('_injectGachaCSS', 11863),
    ('_showGachaParticleBurst', 11885),
    ('showGachaResult', 11897),
]:
    r = find_func(fname, approx, lines)
    if r: add_range(r[0], r[1], fname)

# notifyGacha (one-liner at L8802)
# Find the exact line
for i, line in enumerate(lines):
    if 'function notifyGacha(' in line:
        add_range(i, i, "notifyGacha")
        break

# ==========================================
# 6. EARN SYSTEM (赚钱)
# ==========================================
r = find_func('render赚钱中心Page', 14202, lines)
if r: add_range(r[0], r[1], "render赚钱中心Page")

r = find_func('switchEarnTab', 14327, lines)
if r: add_range(r[0], r[1], "switchEarnTab")

r = find_func('doEarnJob', 14333, lines)
if r: add_range(r[0], r[1], "doEarnJob")

r = find_func('_completeEarnJob', 14450, lines)
if r: add_range(r[0], r[1], "_completeEarnJob")

# Also find the EARN CENTER APP comment line
for i, line in enumerate(lines):
    if '// ==================== EARN CENTER APP ====================' in line:
        add_range(i, i, "earn comment header")
        break

# ==========================================
# Now merge overlapping ranges and sort
# ==========================================
ranges_to_delete.sort(key=lambda x: x[0])

# Merge overlapping
merged = []
for start, end, label in ranges_to_delete:
    if merged and start <= merged[-1][1] + 1:
        # Overlapping or adjacent
        merged[-1] = (merged[-1][0], max(merged[-1][1], end), merged[-1][2] + " + " + label)
    else:
        merged.append((start, end, label))

print(f"\n=== Ranges to delete ({len(merged)} ranges) ===")
total_lines_to_delete = 0
for start, end, label in merged:
    count = end - start + 1
    total_lines_to_delete += count
    print(f"  L{start+1}-L{end+1} ({count} lines): {label}")

print(f"\nTotal lines to delete: {total_lines_to_delete}")

# Delete ranges from back to front
new_lines = list(lines)
for start, end, label in reversed(merged):
    del new_lines[start:end+1]

print(f"Lines after deletion: {len(new_lines)}")

# Write intermediate result
with open('/tmp/my-idol-v2/game.js', 'w') as f:
    f.writelines(new_lines)

print("Phase 1 (function deletion) complete.")

