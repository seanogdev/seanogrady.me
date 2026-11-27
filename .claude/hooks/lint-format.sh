#!/usr/bin/env bash
f=$(jq -r '.tool_input.file_path // empty')
[ -f "$f" ] || exit 0
case "$f" in "$CLAUDE_PROJECT_DIR"/*) ;; *) exit 0 ;; esac
bin="$CLAUDE_PROJECT_DIR/node_modules/.bin"
[ -x "$bin/oxlint" ] || exit 0

lint=$("$bin/oxlint" --fix --quiet --no-error-on-unmatched-pattern "$f" 2>&1)
status=$?
"$bin/oxfmt" --no-error-on-unmatched-pattern "$f" >/dev/null 2>&1

if [ $status -ne 0 ]; then
  echo "$lint" >&2
  exit 2
fi
