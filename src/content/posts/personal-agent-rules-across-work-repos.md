---
title: 'The Missing Scope: Sharing Agent Rules Across Repos'
date: 2026-11-27
description: 'The AGENTS.md world has a scope for your machine and your team, but not for sharing your own rules across repos. Here is how I filled that gap with a SessionStart hook and a private gist.'
tags: ['developer-tooling', 'ai']
---

Agent config gives you two places to put rules: a global file for everything on your machine and the `AGENTS.md` your team checks into a repo.

What it doesn't give you is somewhere to keep your own rules and share them across repos. I have a handful of rules that need exactly that: open pull requests as ready rather than draft, don't sit waiting on the type check, pick the right PR label for whichever repo I'm in.

None of that belongs to the team. It doesn't belong in my [dotfiles](/posts/managing-ai-config-with-dotfiles) either, since that global file is public and loads in my side projects too.

## It started with someone else's skills

I didn't set out to build a new config scope. I wanted to use [Matt Pocock's skills](https://github.com/mattpocock/skills) at work, and they come with a setup step that configures each repo for them. It asks where your issues live and how you label them. Then it writes the answers into the repo, as a `docs/agents/issue-tracker.md` file and an "Agent skills" section in `AGENTS.md`.

That's a sensible default for a solo project, but it didn't fit a team repo. How I track my own work isn't something the rest of the team needs in their `AGENTS.md`, and stuffing a docs folder into an exclude file just to keep it out of Git felt arbitrary.

I also wanted the same setup in every work repo, not just the one I happened to run it in. So I skipped the setup step and went looking for a file the team would never see.

## Claude Code doesn't read AGENTS.local.md

`AGENTS.local.md` was the obvious candidate. The name says it's yours, and plenty of repos already ignore it. What I wanted was one at `~/projects/work/AGENTS.local.md`, in the folder that holds all my work repos, loading in every one of them.

Claude Code doesn't read it, not in a parent folder and not even at a repo root. It reads `AGENTS.md` and stops there. And a repo-level file would only cover one repo anyway, so five repos would mean five copies that drift apart the first time I change one.

Claude's own names do have this scope. It loads `CLAUDE.local.md` from every folder above the repo, so if you only use Claude, a parent `CLAUDE.local.md` gets you most of the way with no hook. I'd rather stay on the `AGENTS.md` standard, though. A `CLAUDE.local.md` anywhere above a repo also stops Claude reading that repo's `AGENTS.md` unless you change the Project instructions setting in `/config`.

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

The first line bails out unless the session is under the work folder, so my personal projects never see these rules. The loop handles `@path` imports. Hook output is just text, so the script inlines each imported file itself. That lets the parent file stay a short list that pulls in the bigger files:

```md
- Open pull requests as ready for review, not as drafts.
- Do not wait for the type check. Report it only if it fails.
- Before you drive the app in a browser, read ~/projects/work/browser.md.

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

## Every repo learns the lesson at once

The biggest win is that a fix written down in one repo reaches all of them. When I tell Claude how something should be done, the next session in any work repo starts with it.

Browser testing is the clearest example. Claude drives our app with agent-browser, and the notes on how to do that live in one file next to the work rules. They're the things Claude would otherwise have to rediscover each time: wait for text that shows the page is ready rather than a set time, take a fresh snapshot once a menu or dialog opens because the old refs go stale and treat dev data as disposable so a test can create and delete what it needs.

The parent file only points at those notes, so they load when Claude is about to open the app and stay out of the way otherwise. Every repo that runs the app gets the same approach, whichever one I start in.

Smaller habits travel the same way. PR labels sit in one table, so Claude picks the right one for whichever repo it's in, and the type check and ready-for-review rules apply everywhere without me repeating them.

None of it touches a team file either. I can change how I work without opening a PR or debating whether my preferences belong in the repo.

## How it's held up

Claude Code only keeps about a month of session logs, so this is a recent snapshot of a setup that's been running for longer. In the last five days the hook loaded my rules into 94 sessions. Ten of those synced the gist without me asking, and the gist is up to 30 revisions.

I couldn't find a session where I had to correct Claude on one of these rules. Most of them went in before the mistake ever happened, though, so that proves less than I'd like.

The one real limit is the path match in the hook. A session in a temp worktree outside the work folder gets none of these rules.

Still, this is a gap the tools should close. If Claude Code read `AGENTS.local.md` the way it reads `CLAUDE.local.md`, most of this post would go away. I'd happily delete the lot.
