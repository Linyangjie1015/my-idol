with open('/tmp/my-idol-v2/game.js', 'r') as f:
    lines = f.readlines()

changes = 0

# 1. Remove failExam function
for i, line in enumerate(lines):
    if line is not None and 'function failExam()' in line:
        j = i
        brace = 0
        found_open = False
        while j < len(lines):
            for ch in lines[j]:
                if ch == '{':
                    brace += 1
                    found_open = True
                elif ch == '}':
                    brace -= 1
                    if found_open and brace == 0:
                        break
            if found_open and brace == 0:
                break
            j += 1
        end = j + 1
        while end < len(lines) and lines[end].strip() == '':
            end += 1
        for k in range(i, end):
            lines[k] = None
        changes += 1
        print(f"Removed failExam at L{i+1}-L{end}")
        break

# 2. Remove isExamInProgress check in goToPage
for i, line in enumerate(lines):
    if line is None:
        continue
    s = line.strip()
    if s == 'if (isExamInProgress) {':
        j = i + 1
        brace = 1
        while j < len(lines) and brace > 0:
            if lines[j] is not None:
                brace += lines[j].count('{') - lines[j].count('}')
            j += 1
        for k in range(i, j):
            lines[k] = None
        changes += 1
        print(f"Removed isExamInProgress check in goToPage at L{i+1}-L{j}")
        break

# 3. Remove isExamInProgress = false in _resetGlobalState
for i, line in enumerate(lines):
    if line is None:
        continue
    if 'isExamInProgress = false;' in line.strip():
        prev = lines[i-1].strip() if i > 0 and lines[i-1] is not None else ''
        if 'isLive = false' in prev:
            lines[i] = None
            changes += 1
            print(f"Removed isExamInProgress reset at L{i+1}")
            break

# 4. Remove isExamInProgress = false in _clearPageTimers
for i, line in enumerate(lines):
    if line is None:
        continue
    s = line.strip()
    if s == 'isExamInProgress = false;':
        prev = lines[i-1].strip() if i > 0 and lines[i-1] is not None else ''
        if 'isResting' in prev:
            lines[i] = None
            changes += 1
            print(f"Removed isExamInProgress clear at L{i+1}")
            break

# 5. Remove _checkWeeklyMonthlyExamPenalty() call
for i, line in enumerate(lines):
    if line is None:
        continue
    if line.strip() == '_checkWeeklyMonthlyExamPenalty();':
        lines[i] = None
        changes += 1
        print(f"Removed _checkWeeklyMonthlyExamPenalty() call at L{i+1}")
        break

# 6. Remove initGachaPool() calls
for i, line in enumerate(lines):
    if line is None:
        continue
    s = line.strip()
    if s == 'initGachaPool();' or s == "if (typeof initGachaPool === 'function') initGachaPool();":
        lines[i] = None
        changes += 1
        print(f"Removed initGachaPool call at L{i+1}")

# 7. Find and remove doEarnJob reference
for i, line in enumerate(lines):
    if line is None:
        continue
    if "onclick=\"doEarnJob(" in line and 'earn-job-card' in line:
        print(f"Found doEarnJob onclick at L{i+1}: {line.strip()[:200]}")
        # Need to find the broader context - this is inside a buildJobsHtml function or similar
        # Look for the surrounding function
        func_start = i
        while func_start > 0:
            if lines[func_start] is not None and lines[func_start].strip().startswith('function '):
                break
            func_start -= 1
        print(f"  Inside function starting at L{func_start+1}: {lines[func_start].strip()[:100]}")

# 8. Remove _completeEarnJob reference
for i, line in enumerate(lines):
    if line is None:
        continue
    if '_completeEarnJob(st.job)' in line:
        lines[i] = None
        changes += 1
        print(f"Removed _completeEarnJob call at L{i+1}")

# Now write back, skipping None lines
new_lines = [l for l in lines if l is not None]
with open('/tmp/my-idol-v2/game.js', 'w') as f:
    f.writelines(new_lines)

print(f"\nTotal changes: {changes}")
print(f"Lines after: {len(new_lines)}")
