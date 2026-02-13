#!/bin/bash
set -euo pipefail

# Ralph Overnight Runner - Process multiple stories sequentially
# Usage: ./scripts/ralph/run-overnight.sh [phase]

PROJECT_DIR="$(cd "$(dirname "$0")/../.." && pwd)"
PRD_FILE="$PROJECT_DIR/scripts/ralph/prd.json"
PHASE="${1:-1}"
LOG_DIR="$PROJECT_DIR/scripts/ralph/logs"
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
MASTER_LOG="$LOG_DIR/overnight-phase${PHASE}-${TIMESTAMP}.log"

mkdir -p "$LOG_DIR"

echo "🌙 Ralph Overnight Runner — Phase $PHASE" | tee "$MASTER_LOG"
echo "Started: $(date)" | tee -a "$MASTER_LOG"
echo "================================" | tee -a "$MASTER_LOG"

# Get Phase stories
STORIES=$(python3 -c "
import json
with open('$PRD_FILE') as f:
    prd = json.load(f)
for s in prd['user_stories']:
    if s['phase'] == $PHASE:
        print(s['id'])
")

TOTAL=$(echo "$STORIES" | wc -l | tr -d ' ')
CURRENT=0
PASSED=0
FAILED=0

for STORY_ID in $STORIES; do
  CURRENT=$((CURRENT + 1))
  TITLE=$(python3 -c "
import json
with open('$PRD_FILE') as f:
    prd = json.load(f)
for s in prd['user_stories']:
    if s['id'] == '$STORY_ID':
        print(s['title'])
        break
")

  echo "" | tee -a "$MASTER_LOG"
  echo "[$CURRENT/$TOTAL] $STORY_ID: $TITLE" | tee -a "$MASTER_LOG"
  echo "Started: $(date)" | tee -a "$MASTER_LOG"

  if "$PROJECT_DIR/scripts/ralph/run-ralph.sh" "$STORY_ID" >> "$MASTER_LOG" 2>&1; then
    PASSED=$((PASSED + 1))
    echo "  ✅ PASSED" | tee -a "$MASTER_LOG"
  else
    FAILED=$((FAILED + 1))
    echo "  ❌ FAILED" | tee -a "$MASTER_LOG"
  fi

  echo "Completed: $(date)" | tee -a "$MASTER_LOG"
done

echo "" | tee -a "$MASTER_LOG"
echo "================================" | tee -a "$MASTER_LOG"
echo "🏁 Overnight Run Complete" | tee -a "$MASTER_LOG"
echo "Phase: $PHASE" | tee -a "$MASTER_LOG"
echo "Total: $TOTAL | Passed: $PASSED | Failed: $FAILED" | tee -a "$MASTER_LOG"
echo "Finished: $(date)" | tee -a "$MASTER_LOG"
echo "Master log: $MASTER_LOG" | tee -a "$MASTER_LOG"
