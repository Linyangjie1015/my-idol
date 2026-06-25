import re

with open('/tmp/my-idol-v2/game.js', 'r') as f:
    lines = f.readlines()

# All identifiers that should no longer exist
identifiers = {
    # Exam
    'isExamInProgress': 'exam', 'currentExamSubject': 'exam', 'currentExamLevel': 'exam', 'currentExamAttempt': 'exam',
    '_ensureExamState': 'exam', '_examResultHtml': 'exam', '_finishExam': 'exam', 'passExam': 'exam',
    'renderDanceExam': 'exam', 'renderVocalExam': 'exam', 'renderRapExam': 'exam', 'renderActingExam': 'exam',
    'renderVarietyExam': 'exam', 'renderComprehensiveExam': 'exam',
    '_ensureWeeklyMonthlyExam': 'exam', '_checkWeeklyMonthlyExamPenalty': 'exam',
    'takeWeeklyExam': 'exam', 'takeMonthlyExam': 'exam', 'takeRandomInspection': 'exam',
    'renderWeeklyMonthlyExamSection': 'exam', 'failExam': 'exam',
    # Food
    'renderFoodPage': 'food',
    # Express
    'render快递服务Page': 'express', 'order快递服务': 'express',
    # Loan
    'applyLoan': 'loan', 'repayLoan': 'loan', 'loanAmount': 'loan', 'loanInterest': 'loan',
    # Gacha
    'initGachaPool': 'gacha', 'getGachaCard': 'gacha', 'pullGacha': 'gacha', '_countTotalGachaCards': 'gacha',
    'doGachaPull': 'gacha', '_injectGachaCSS': 'gacha', '_showGachaParticleBurst': 'gacha',
    'showGachaResult': 'gacha', 'notifyGacha': 'gacha',
    # Earn
    'doEarnJob': 'earn', '_completeEarnJob': 'earn', 'switchEarnTab': 'earn', 'render赚钱中心Page': 'earn',
}

for ident, system in sorted(identifiers.items(), key=lambda x: x[1]):
    sites = []
    for i, line in enumerate(lines):
        s = line.strip()
        if s.startswith('//'):
            continue
        pattern = r'(?<![a-zA-Z_$])' + re.escape(ident) + r'(?![a-zA-Z_$0-9])'
        if re.search(pattern, s):
            sites.append(i + 1)
    if sites:
        print(f"[{system}] {ident}: {len(sites)} refs at L{sites}")

