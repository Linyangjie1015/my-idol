import re

with open('/tmp/my-idol-v2/game.js', 'r') as f:
    lines = f.readlines()

# Functions to find call sites for
funcs = [
    'isExamInProgress', 'currentExamSubject', 'currentExamLevel', 'currentExamAttempt',
    '_ensureExamState', '_examResultHtml', '_finishExam',
    '_ensureWeeklyMonthlyExam', '_checkWeeklyMonthlyExamPenalty',
    'takeWeeklyExam', 'takeMonthlyExam', 'takeRandomInspection',
    'renderFoodPage', 'render快递服务Page', 'order快递服务',
    'applyLoan', 'repayLoan',
    'initGachaPool', 'getGachaCard', 'pullGacha', '_countTotalGachaCards',
    'doGachaPull', '_injectGachaCSS', '_showGachaParticleBurst', 'showGachaResult', 'notifyGacha',
    'doEarnJob', '_completeEarnJob', 'switchEarnTab',
]

for func in funcs:
    sites = []
    for i, line in enumerate(lines):
        stripped = line.strip()
        if stripped.startswith('//'):
            continue
        # Check if func name appears as a call (not just declaration)
        # Look for func( or func ( pattern, but exclude "function func("
        pattern = re.escape(func) + r'\s*\('
        if re.search(pattern, stripped):
            # Make sure it's not a declaration
            if not re.match(r'function\s+' + re.escape(func), stripped) and \
               not re.match(r'var\s+' + re.escape(func) + r'\s*=\s*function', stripped):
                sites.append(i + 1)
    
    if sites:
        print(f"\n=== {func} call sites ===")
        for s in sites:
            print(f"  L{s}: {lines[s-1].strip()[:120]}")
    else:
        print(f"\n=== {func}: NO call sites found ===")

