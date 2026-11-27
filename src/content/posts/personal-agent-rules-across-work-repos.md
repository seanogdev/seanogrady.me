---
title: 'The Missing Scope: Personal Agent Rules Across a Group of Repos'
date: 2026-11-27
description: 'Agent config has a scope for your machine, your team and your copy of one repo, but not for your own rules across a group of repos. Here is how I filled that gap with a SessionStart hook and a private gist.'
tags: ['developer-tooling', 'ai']
---

Agent config comes in three scopes. There's a global file for everything on your machine, a repo `AGENTS.md` the team shares and an `AGENTS.local.md` for your own copy of one repo.

There's no scope for your rules across a group of repos. That's exactly where most of mine sit. Open pull requests as ready, not draft. Don't sit waiting on the type check. Use the right PR label for each repo.

They're not the team's, so the repo file is out. They're work-only, so the global file from my [dotfiles](/posts/managing-ai-config-with-dotfiles) is out too. That one's public, and it loads in my side projects. I needed the missing fourth scope, so I built it.

## The closest scope stops at the repo

`AGENTS.local.md` gets nearest. Drop it in a repo, keep it out of Git and Claude loads it next to the team's `AGENTS.md`. But it's one repo at a time. Five repos means five copies, and they drift the first time I change one.

Put it in the parent folder instead, `~/projects/work/AGENTS.local.md`, and Claude ignores it. The folder that groups my work repos is the one place the tools don't look.

I use the `AGENTS.md` names to stay on the open standard. If you only use Claude, `CLAUDE.md` and `CLAUDE.local.md` behave the same for everything here. Just don't mix them: a `CLAUDE.local.md` in a repo that uses `AGENTS.md` stops Claude loading the team's file.

## A hook loads it instead

A [SessionStart hook](https://docs.claude.com/en/docs/claude-code/hooks) runs a command when a session starts, and whatever it prints lands in the context. That's all it takes.

```bash
case "$PWD/" in "$HOME/projects/work/"*) ;; *) exit 0 ;; esac
f="$HOME/projects/work/AGENTS.local.md"
[ -f "$f" ] || exit 0
echo "Personal instructions for work repos, from $f:"
echo
while IFS= read -r l || [ -n "$l" ]; do
  case "$l" in
    @*) p="${l#@}"; p="${p/#\~/$HOME}"; if [ -f "$p" ]; then cat "$p"; else printf '%s\n' "$l"; fi ;;
    *) printf '%s\n' "$l" ;;
  esac
done < "$f"
```

The first line bails unless I'm under the work folder. The loop handles `@path` imports, which Claude resolves in a memory file but not in hook output. So the script inlines them itself, and the parent file stays a short list that pulls in the bigger files:

```md
- Open pull requests as ready for review, not as drafts.
- Do not wait for the type check. Report it only if it fails.

@~/projects/work/work.md
```

`work.md` is where the cross-repo rules pay off. PR labels are a single table with a row per repo. No repo-level file could hold that.

Register the script in `~/.claude/settings.json` and it's done:

```json
{
  "hooks": {
    "SessionStart": [{ "hooks": [{ "type": "command", "command": "bash ~/.claude/hooks/work-instructions.sh" }] }]
  }
}
```

## Claude keeps the gist in sync

The files live in a private gist so they follow me between machines. Gists are flat, so repo files go in as `<repo>.AGENTS.local.md`.

I never run the sync. The last section of `work.md` tells Claude to do it:

```md
## Sync

After you edit one of these files, set `updatedAt` and `updatedBy` if the file has them, then run its line:

    gh gist edit <gist-id> -f AGENTS.local.md ~/projects/work/AGENTS.local.md
    gh gist edit <gist-id> -f work.md ~/projects/work/work.md
```

So "from now on, do X" turns into a rule in the right file, a stamped `updatedBy` and a pushed gist. On a new machine, it's a few `gh gist view` calls. If a repo doesn't already ignore `AGENTS.local.md`, add it to `.git/info/exclude` so the team's `.gitignore` stays untouched.

## How it's held up

Claude Code only keeps about a month of session logs, so this is a recent snapshot of an older setup. The gist has 30 revisions. In the last five days, the hook loaded my rules into 94 sessions, and ten of them synced the gist without me asking. I couldn't find a single session where I had to correct Claude on one of these rules. Most were written before the mistake happened, though, so that proves less than I'd like.

The sync only pushes, which is the weak spot. My laptop is behind the gist right now, missing a few rules another machine added. And a session in a temp worktree outside the work folder gets none of this.

Pulling is next on the list. But really, this is a scope the tools should ship. Load an `AGENTS.local.md` from a parent folder and most of this post goes away. I'd happily delete the lot.
