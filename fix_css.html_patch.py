with open('/tmp/my-idol/index.html', 'r', encoding='utf-8') as f:
    code = f.read()

changes = []

# FIX: exam-entry needs cursor:pointer explicitly for iOS Safari click
code = code.replace(
    ".exam-entry:active { transform: scale(0.98); }\n    .exam-entry.locked { opacity: 0.5; cursor: not-allowed; }",
    ".exam-entry:active { transform: scale(0.98); cursor: pointer; -webkit-tap-highlight-color: transparent; }\n    .exam-entry.locked { opacity: 0.5; cursor: not-allowed; pointer-events: none; }"
)
changes.append('exam-entry: cursor:pointer + tap-highlight + locked pointer-events:none')

# FIX: exam-comprehensive-entry.unlocked needs cursor:pointer for iOS
code = code.replace(
    ".exam-comprehensive-entry.unlocked { border-style: solid; cursor: pointer; }",
    ".exam-comprehensive-entry.unlocked { border-style: solid; cursor: pointer; -webkit-tap-highlight-color: transparent; }"
)
changes.append('exam-comprehensive-entry: -webkit-tap-highlight for iOS')

# FIX: Ensure app-item (home icons) also has proper iOS touch handling
# Check if app-item style exists
if '.app-item {' in code:
    code = code.replace(
        ".app-item {",
        ".app-item { -webkit-tap-highlight-color: transparent;"
    )
    changes.append('app-item: -webkit-tap-highlight-color')

# FIX: Add touch-action for home page grid to allow horizontal swipe
if '.app-grid' in code:
    code = code.replace(
        ".app-grid {",
        ".app-grid { touch-action: pan-y;"
    )
    changes.append('app-grid: touch-action:pan-y for swipe support')

# FIX: Make the page dots on home screen bigger for touch
# They're 8px now, too small. Replace with 10px
code = code.replace(
    "width:8px;height:8px;border-radius:50%;background",
    "width:12px;height:12px;border-radius:50%;background"
)
changes.append('Home page dots: 8px -> 12px for touch')

with open('/tmp/my-idol/index.html', 'w', encoding='utf-8') as f:
    f.write(code)

print("index.html CSS patched!")
for i, c in enumerate(changes, 1):
    print(f"  {i}. {c}")
