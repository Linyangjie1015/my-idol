import re

with open('/tmp/my-idol-v2/game.js', 'r') as f:
    lines = f.readlines()

total = len(lines)
print(f"Total lines: {total}")

# Helper: find function by name and approximate line
def find_func(name, approx_line, lines):
    """Find a top-level function starting near approx_line.
    Returns (start_line, end_line) both 1-based."""
    # Search around approx_line
    start = None
    for i in range(max(0, approx_line - 5), min(len(lines), approx_line + 20)):
        stripped = lines[i].strip()
        # Match: function name( or var name = function
        if re.match(r'function\s+' + re.escape(name) + r'\s*\(', stripped):
            start = i
            break
        if re.match(r'var\s+' + re.escape(name) + r'\s*=\s*function', stripped):
            start = i
            break
    if start is None:
        print(f"  WARNING: Could not find start of '{name}' near line {approx_line}")
        return None
    
    # Find matching closing brace using brace counting
    # First, find the opening brace
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
        print(f"  WARNING: Could not find end of '{name}' starting at line {start+1}")
        return None
    
    return (start + 1, end + 1)  # 1-based

# All functions to locate
targets = [
    # Exam system
    ("_ensureExamState", 1781),
    ("_examResultHtml", 1819),
    ("_finishExam", 1832),
    ("_ensureWeeklyMonthlyExam", 11336),
    ("_checkWeeklyMonthlyExamPenalty", 11371),
    ("takeWeeklyExam", 11406),
    ("takeMonthlyExam", 11436),
    ("takeRandomInspection", 11520),
    # Food page
    ("renderFoodPage", 7454),
    # Express
    ("render快递服务Page", 7549),
    ("order快递服务", 7633),
    # Loan
    ("applyLoan", 7674),
    ("repayLoan", 7694),
    # Gacha
    ("initGachaPool", 11570),
    ("getGachaCard", 11649),
    ("pullGacha", 11694),
    ("_countTotalGachaCards", 11771),
    ("doGachaPull", 11853),
    ("_injectGachaCSS", 11863),
    ("_showGachaParticleBurst", 11885),
    ("showGachaResult", 11897),
    ("notifyGacha", 8802),
    # Earn system
    ("doEarnJob", 14333),
    ("_completeEarnJob", 14450),
    ("switchEarnTab", 14327),
]

print("\n=== Located Functions ===")
results = {}
for name, approx in targets:
    r = find_func(name, approx, lines)
    if r:
        results[name] = r
        print(f"  {name}: L{r[0]}-L{r[1]} ({r[1]-r[0]+1} lines)")
    else:
        print(f"  {name}: NOT FOUND")

# Also check for variable declarations to remove
print("\n=== Searching for exam variables ===")
for i, line in enumerate(lines):
    s = line.strip()
    for var in ['isExamInProgress', 'currentExamSubject', 'currentExamLevel', 'currentExamAttempt']:
        if var in s and ('var ' + var in s or 'var ' in s and var in s):
            print(f"  L{i+1}: {s[:100]}")

print("\n=== Searching for loan fields ===")
for i, line in enumerate(lines):
    s = line.strip()
    if 'loanAmount' in s or 'loanInterest' in s:
        print(f"  L{i+1}: {s[:100]}")

print("\n=== Searching for looks/颜值 references ===")
count = 0
for i, line in enumerate(lines):
    s = line.strip()
    if ('looksVal' in s or '颜值' in s) and not s.startswith('//'):
        count += 1
        if count <= 30:
            print(f"  L{i+1}: {s[:120]}")
print(f"  Total looks/颜值 refs: {count}")

print("\n=== Searching for earn type achievements ===")
for i, line in enumerate(lines):
    s = line.strip()
    if "'earn'" in s or '"earn"' in s:
        print(f"  L{i+1}: {s[:120]}")

