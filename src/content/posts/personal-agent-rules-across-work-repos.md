---
title: 'The Missing Scope: Sharing Agent Rules Across Repos'
date: 2026-11-27
description: 'Agent config has a scope for your machine, your team and your copy of one repo, but not for sharing your own rules across repos. Here is how I filled that gap with a SessionStart hook and a private gist.'
tags: ['developer-tooling', 'ai']
---

Agent config gives you three places to put rules: a global file for everything on your machine, the `AGENTS.md` your team checks into a repo and an `AGENTS.local.md` for your own copy of that one repo.

What it doesn't give you is somewhere to keep your own rules and share them across repos. That's where most of mine ended up: open pull requests as ready rather than draft, don't sit waiting on the type check, pick the right PR label for whichever repo I'm in.

None of that belongs to the team. It doesn't belong in my [dotfiles](/posts/managing-ai-config-with-dotfiles) either, since that global file is public and loads in my side projects too.

## It started with someone else's skills

I didn't set out to build a new config scope. I wanted to use [Matt Pocock's skills](https://github.com/mattpocock/skills) at work, and they come with a setup step that configures each repo for them. It asks where your issues live and how you label them. Then it writes the answers into the repo, as a `docs/agents/issue-tracker.md` file and an "Agent skills" section in `AGENTS.md`.

That's a sensible default for a solo project, but it didn't fit a team repo. How I track my own work isn't something the rest of the team needs in their `AGENTS.md`, and stuffing a docs folder into an exclude file just to keep it out of Git felt arbitrary.

I also wanted the same setup in every work repo, not just the one I happened to run it in. So I skipped the setup step and went looking for a file the team would never see.

## The closest scope stops at the repo

`AGENTS.local.md` was the obvious candidate. Claude loads it alongside the team's `AGENTS.md`, it's personal by design and plenty of repos already ignore it. The catch is that it only covers the repo it sits in, so five repos means five copies that drift apart the first time I change one.

The natural fix is to move it up a level, to `~/projects/work/AGENTS.local.md` in the folder that holds all my work repos. Claude doesn't look there. The folder that matches the scope I needed is the one place the tools skip.

A quick note on naming: I use the `AGENTS.md` names to stay on the open standard, but if you only use Claude, `CLAUDE.md` and `CLAUDE.local.md` work the same for everything here. Just don't mix them, because a `CLAUDE.local.md` in a repo that uses `AGENTS.md` stops Claude loading the team's file.

## A hook loads it instead

Claude Code won't load the file, but a [SessionStart hook](https://docs.claude.com/en/docs/claude-code/hooks) can. Whatever the hook prints when a session starts lands in the context, so a short script that prints the file does the job.

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

The first line bails out unless the session is under the work folder, so my personal projects never see these rules. The loop is there because Claude resolves `@path` imports in a memory file but not in hook output, so the script inlines them itself. That lets the parent file stay a short list that pulls in the bigger files:

```md
- Open pull requests as ready for review, not as drafts.
- Do not wait for the type check. Report it only if it fails.

@~/projects/work/work.md
```

`work.md` is where the skills config ended up, and it opens by saying it replaces the setup step from Matt's skills. It's also where having one file starts to pay off. PR labels, for example, are a single table with a row per repo, which no repo-level file could ever hold.

Registering the script is one entry in `~/.claude/settings.json`:

```json
{
  "hooks": {
    "SessionStart": [{ "hooks": [{ "type": "command", "command": "bash ~/.claude/hooks/work-instructions.sh" }] }]
  }
}
```

## Claude keeps the gist in sync

The files live in a private gist so they follow me between machines. Gists are flat, so each repo's file is stored as `<repo>.AGENTS.local.md`. I never run the sync myself. The last section of `work.md` tells Claude to do it whenever it edits one of the files:

```md
## Sync

After you edit one of these files, set `updatedAt` and `updatedBy` if the file has them, then run its line:

    gh gist edit <gist-id> -f AGENTS.local.md ~/projects/work/AGENTS.local.md
    gh gist edit <gist-id> -f work.md ~/projects/work/work.md
```

So when I say "from now on, do X", Claude writes the rule into the right file, stamps `updatedBy` with the model that made the change and pushes the gist.

A new machine is a few `gh gist view` calls. Any repo that doesn't already ignore `AGENTS.local.md` gets one line in `.git/info/exclude`, which is a lot easier to live with than a folder of generated docs.

## How it's held up

Claude Code only keeps about a month of session logs, so this is a recent snapshot of a setup that's been running for longer. In the last five days the hook loaded my rules into 94 sessions. Ten of those synced the gist without me asking, and the gist is up to 30 revisions.

I couldn't find a session where I had to correct Claude on one of these rules. Most of them went in before the mistake ever happened, though, so that proves less than I'd like.

The weak spot is that the sync only pushes. My laptop is behind the gist right now, missing a few rules another machine added, and a session in a temp worktree outside the work folder gets none of this.

Pulling is next on my list, but really this is a scope the tools should ship. If Claude Code loaded an `AGENTS.local.md` from a parent folder, most of this post would go away. I'd happily delete the lot.
