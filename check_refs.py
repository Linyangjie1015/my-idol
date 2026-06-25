with open('/tmp/my-idol-v2/game.js', 'r') as f:
    lines = f.readlines()

# All deleted identifiers
identifiers = [
    'isExamInProgress', 'currentExamSubject', 'currentExamLevel', 'currentExamAttempt',
    '_ensureExamState', '_examResultHtml', '_finishExam', 'passExam',
    'renderDanceExam', 'renderVocalExam', 'renderRapExam', 'renderActingExam', 
    'renderVarietyExam', 'renderComprehensiveExam',
    '_ensureWeeklyMonthlyExam', '_checkWeeklyMonthlyExamPenalty',
    'takeWeeklyExam', 'takeMonthlyExam', 'takeRandomInspection',
    'renderWeeklyMonthlyExamSection',
    'renderFoodPage', 'render快递服务Page', 'order快递服务',
    'applyLoan', 'repayLoan',
    'initGachaPool', 'getGachaCard', 'pullGacha', '_countTotalGachaCards',
    'doGachaPull', '_injectGachaCSS', '_showGachaParticleBurst', 'showGachaResult',
    'notifyGacha',
    'doEarnJob', '_completeEarnJob', 'switchEarnTab', 'render赚钱中心Page',
]

import re
for ident in identifiers:
    sites = []
    for i, line in enumerate(lines):
        s = line.strip()
        if s.startswith('//'):
            continue
        # Check for the identifier used as a call or reference
        pattern = r'(?<![a-zA-Z_$])' + re.escape(ident) + r'(?![a-zA-Z_$0-9])'
        if re.search(pattern, s):
            sites.append(i + 1)
    if sites:
        print(f"\n=== {ident} still referenced at {len(sites)} locations ===")
        for s in sites[:15]:
            print(f"  L{s}: {lines[s-1].strip()[:130]}")
