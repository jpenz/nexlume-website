#!/bin/bash
set -euo pipefail

# Ralph Loop - Autonomous Development for Nexlume
# Usage: ./scripts/ralph/run-ralph.sh [story-id] [--phase N]

PROJECT_DIR="$(cd "$(dirname "$0")/../.." && pwd)"
PRD_FILE="$PROJECT_DIR/scripts/ralph/prd.json"
LOG_DIR="$PROJECT_DIR/scripts/ralph/logs"
TIMESTAMP=$(date +%Y%m%d-%H%M%S)

mkdir -p "$LOG_DIR"

STORY_ID="${1:-}"
PHASE="${2:-}"

if [ -z "$STORY_ID" ]; then
  echo "🔄 Ralph Loop - Nexlume Website"
  echo "================================"
  echo ""
  echo "Usage:"
  echo "  $0 NX-001              # Run specific story"
  echo "  $0 --phase 1           # Run all Phase 1 stories"
  echo "  $0 --next              # Run next uncompleted story"
  echo ""
  echo "Stories:"
  python3 -c "
import json
with open('$PRD_FILE') as f:
    prd = json.load(f)
for story in prd['user_stories']:
    print(f\"  {story['id']} [Phase {story['phase']}] [{story['priority']}] {story['title']} ({story['estimate_hours']}h)\")
"
  exit 0
fi

# Get story details
STORY_JSON=$(python3 -c "
import json, sys
with open('$PRD_FILE') as f:
    prd = json.load(f)
story_id = '$STORY_ID'
if story_id == '--next' or story_id == '--phase':
    phase = '${PHASE:-1}'
    for s in prd['user_stories']:
        if story_id == '--phase' and str(s['phase']) == phase:
            print(json.dumps(s))
            sys.exit(0)
        elif story_id == '--next':
            print(json.dumps(s))
            sys.exit(0)
else:
    for s in prd['user_stories']:
        if s['id'] == story_id:
            print(json.dumps(s))
            sys.exit(0)
print('{}')
")

if [ "$STORY_JSON" = "{}" ]; then
  echo "❌ Story not found: $STORY_ID"
  exit 1
fi

TITLE=$(echo "$STORY_JSON" | python3 -c "import json,sys; print(json.load(sys.stdin)['title'])")
echo "🚀 Starting Ralph Loop for: $STORY_ID - $TITLE"
echo "📝 Log: $LOG_DIR/ralph-${STORY_ID}-${TIMESTAMP}.log"

# Build the prompt for Claude
PROMPT="You are working on the Nexlume fiber optic e-commerce website.

PROJECT: ~/projects/nexlume-website
CLAUDE.md: Read CLAUDE.md for project rules and structure.

YOUR TASK (User Story $STORY_ID):
$(echo "$STORY_JSON" | python3 -c "
import json, sys
s = json.load(sys.stdin)
print(f\"Title: {s['title']}\")
print(f\"Description: {s['description']}\")
print(f\"Priority: {s['priority']}\")
print(f\"Acceptance Criteria:\")
for c in s['acceptance_criteria']:
    print(f\"  - {c}\")
")

INSTRUCTIONS:
1. Read CLAUDE.md first
2. Implement the user story completely
3. Write tests for your implementation
4. Run 'npm run build' — must have ZERO errors
5. Run tests — must all pass
6. Git commit with conventional commit message: feat($STORY_ID): <description>
7. If you encounter errors, fix them before committing

DO NOT skip any acceptance criteria. Implement everything listed."

# Run Claude Code with the prompt
cd "$PROJECT_DIR"
echo "$PROMPT" | claude --model claude-opus-4-6 --print 2>&1 | tee "$LOG_DIR/ralph-${STORY_ID}-${TIMESTAMP}.log"

echo ""
echo "✅ Ralph Loop complete for $STORY_ID"
echo "📝 Log saved to: $LOG_DIR/ralph-${STORY_ID}-${TIMESTAMP}.log"
