---
title: 'Bring Your Own Rules: Personal Agent Config Across Work Repos'
date: 2026-11-27
description: 'How I keep one set of personal Claude Code rules across a folder of work repos, using a parent AGENTS.local.md, a SessionStart hook and a private gist the agent syncs itself.'
tags: ['developer-tooling', 'ai']
---

Every repo I work in has an `AGENTS.md`. The team owns it, it's checked in and it describes how that codebase works. My own preferences don't belong in it. Open pull requests as ready for review, not as drafts. Don't block on the type check. Which PR label each repo expects.

Those rules aren't about one repo, though. They're about how I work, and they apply to every repo in my work folder. The global `AGENTS.md` from my [dotfiles](/posts/managing-ai-config-with-dotfiles) isn't the right home either. It's public, and it also loads in my personal projects, where work rules make no sense.

So I had rules that were too personal for the team file and too specific for the global one. I wanted them to live in one place and follow me into every work repo.

## AGENTS.local.md only works one repo at a time

Claude Code already has a slot for personal rules: `AGENTS.local.md`. Put it in the repo root, keep it out of Git and Claude loads it next to the team's `AGENTS.md`. That's where my rules started.

It works well for rules that belong to one repo. One of my API repos has a rule to watch CI only in the background, because the checks take ages. That's a good fit for a repo-level file.

But most of my rules aren't like that. Copying the same block into five repos means five copies that drift the first time I edit one. The obvious fix is an `AGENTS.local.md` in the parent folder, `~/projects/work/`. Claude Code doesn't load it.

`CLAUDE.local.md` looks like an option, but it's a trap: when it exists, Claude stops loading the repo's `AGENTS.md`, so I'd lose the team's rules to get mine. Don't use it.

## A SessionStart hook loads the parent file

Claude Code [hooks](https://docs.claude.com/en/docs/claude-code/hooks) can run a command when a session starts, and whatever the command prints goes into the context. That's enough to load a file Claude won't load on its own.

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

The first line exits early unless the session is somewhere under the work folder, so my personal projects never see these rules. The loop is there because hook output is plain text. Claude resolves `@path` imports in a memory file, but not in a hook's output. So the script inlines them itself.

That lets the parent file stay short and point at bigger files:

```md
- Do not wait for the type check before you push or continue. Report it only if it fails.
- Open pull requests as ready for review, not as drafts.
  @~/projects/work/work.md
- Before you drive the app in a browser, read ~/projects/work/browser.md.
```

The last line is a deliberate choice. The browser notes are long and only matter when Claude opens the app, so I tell it where to find them rather than loading them every time.

`work.md` holds the rules that span repos. The best example is PR labels. Each repo has its own set, some have a default, one always needs an extra label. That's one table, with a row per repo, in one file. Split across repo-level files, no single copy would see the whole picture.

The hook itself is one entry in `~/.claude/settings.json`:

```json
{
  "hooks": {
    "SessionStart": [{ "hooks": [{ "type": "command", "command": "bash ~/.claude/hooks/work-instructions.sh" }] }]
  }
}
```

## A private gist, and the agent keeps it in sync

These files don't belong in my public dotfiles, but I still want them on more than one machine. A private gist does the job. It holds the parent `AGENTS.local.md`, `work.md`, the browser notes, the hook script and each repo's `AGENTS.local.md`. Gists are flat, so a repo file is stored as `<repo>.AGENTS.local.md`.

I don't run the sync myself. `work.md` ends with a section that tells Claude to do it after every edit:

```md
## Sync

After you edit one of these files, set `updatedAt` and `updatedBy` if the file has them, then run its line:

    gh gist edit <gist-id> -f AGENTS.local.md ~/projects/work/AGENTS.local.md
    gh gist edit <gist-id> -f work.md ~/projects/work/work.md
    gh gist edit <gist-id> -f api.AGENTS.local.md ~/projects/work/api/AGENTS.local.md
```

So when I tell Claude "from now on, do X", it writes the rule into the right file, stamps the frontmatter and pushes the gist. The `updatedBy` field records the model that made the edit, which helps when I'm wondering where a rule came from.

The install steps live in the gist description: where each file goes, how to register the hook and the `CLAUDE.local.md` warning. A new machine is a handful of `gh gist view <gist-id> -f <file> --raw > <path>` calls.

One gotcha: not every repo ignores `AGENTS.local.md`. Where `git check-ignore AGENTS.local.md` comes back empty, I add it to `.git/info/exclude`. That keeps the file out of Git without a change to the team's `.gitignore`.

## How it's held up

I went back through my Claude Code session logs to see if any of this was worth it. Claude Code only keeps about a month of logs, so this is the recent end of a setup that's been running a lot longer.

The gist has 30 revisions. In the last five days alone, the hook loaded my rules into 94 sessions, about 20 a day.

Ten sessions synced the gist without me asking. I also looked for sessions where I had to correct Claude for breaking a rule that was in the files, and found none. I'd take that with a pinch of salt, though. Most of these rules went in before the mistake happened, not after it happened twice, so there wasn't much to repeat.

It's not perfect. The sync only goes one way. Claude pushes to the gist, but nothing pulls, so my laptop is behind the gist right now: a few rules that another machine added never made it down. There's also a repo file in the gist that the Sync list doesn't mention, so no session would ever update it. And the hook matches on the path, so a session in a temporary worktree outside the work folder starts with none of my rules.

The pull side is the next thing to fix. If you have rules that are yours and not your team's, a parent folder, a short hook and a private gist get you most of the way.

And if Claude Code ever loads a parent `AGENTS.local.md` on its own, I can delete the hook.
