---
title: 'Save Your Progress: Managing AI Config with Dotfiles'
date: 2026-03-19
description: 'How I wrangled AI tool config into a single dotfiles repo using GNU Stow, symlinks and a healthy dose of stubbornness.'
tags: ['developer-tooling', 'ai', 'dotfiles']
coverImage: 'https://images.unsplash.com/photo-1760199789455-49098afd02f0?w=1200&q=80'
---

You spend months curating your agent setup. Writing your perfect CLAUDE.md, installing the skills that transform your workflow, tweaking permissions, dialling in hooks until everything works the way you think. That's a lot of effort to have sitting unversioned on a single machine. One dead Macbook and it's gone.

And every tool is so needy, wanting its own special directory. Cursor wants `.cursor/`. GitHub Copilot wants `.github/`. Claude wants `.claude/`. Windsurf, Codex, Gemini CLI, Roo Code - all of them. Each with their own config files, their own instruction formats and their own opinions about where things should live.

But there's been some promising movement. The community has started to coalesce around a solution: `AGENTS.md`. It's an open standard, adopted by most of the major AI coding tools. One file, one format, readable by everything. Cursor reads it. Copilot reads it. Codex reads it. Even tools I've never heard of read from these files. Except for one.

Anthropic's own CLI tool only reads `CLAUDE.md`. The irony here is two-fold: they're very much a part of these foundations and they kick-started the approaches in skills and the CLAUDE/AGENTS file. They did at one point mention how to get AGENTS.md read by Claude, but it was a paltry "add `@AGENTS.md` to your `CLAUDE.md`". They need to do better here.

So... my workaround is a simple symlink. Or should I say, a complex series of symlinks. It's actually just symlinks all the way down.

## Finding a home for it all

Developers have been version-controlling their shell config, editor settings and Git aliases for decades. Agent settings are just more of the same - text files in your home directory that define how your tools behave. The only difference is there are more of them now, and they're scattered across more directories than anyone asked for. Dotfiles are a natural fit. And because it's Git, you get history. If a tweak breaks something, just roll back.

I manage my [dotfiles](https://github.com/seanogdev/dotfiles) with [GNU Stow](https://www.gnu.org/software/stow/). If you haven't used it, the concept is simple: you keep all your config files in a single repo, mirroring your home directory structure, and Stow creates symlinks to put everything in the right place. Fish shell config, Starship prompt, Ghostty terminal settings, Git config - it all lives in one repo and gets linked into `$HOME` with a single command.

```sh
stow -d $HOME/projects/personal/dotfiles -t $HOME --no-folding --adopt --stow .
```

The `--no-folding` flag is important. Without it, Stow creates directory-level symlinks, which means a tool writing a new file into `~/.claude/` would actually write it into your dotfiles repo. With `--no-folding`, it creates individual file-level symlinks instead, so only the files you explicitly manage are linked.

You might be wondering about security. Committing AI tool config to a public repo sounds risky, but in practice Claude's `settings.json` doesn't hold much for me. It's permissions, hooks, environment flags and UI preferences. API keys live in environment variables or keychains or in the root `claude.json` file.

Adding AI config to this was straightforward. My `.agents/AGENTS.md` lives in the dotfiles repo, Stow links it to `~/.agents/AGENTS.md`, and a symlink from `.claude/CLAUDE.md` chains it through to Claude Code. The directory structure in the repo looks like this:

```sh
.agents/
├── AGENTS.md            # Global agent instructions (the source of truth)
├── .skill-lock.json     # Third-party skill versions
└── skills/              # Empty in repo - populated by skills CLI

.claude/
├── CLAUDE.md            # Symlink → ../.agents/AGENTS.md
├── settings.json        # Claude Code settings, hooks, permissions
├── hooks/               # Pre-tool-use hooks (blocking rules)
└── commands/            # Custom slash commands
```

## Skills management

This is where things got interesting. Claude Code has a concept of "skills" - markdown files that give it specialised knowledge or workflows. There's a growing ecosystem of third-party skills for everything from Vue development to accessibility auditing.

[Vercel's `skills` CLI](https://skills.sh/) is the best tool I've found for discovering and managing these. I'll be honest, Vercel aren't exactly the company I'd love to be championing, but credit where it's due - they've admittedly built the most practical solution for browsing, installing and updating skills from GitHub repos. It handles versioning, lock files and multi-agent installation.

My first approach was to just copy the skill files directly into my dotfiles repo. Commit them, stow them, done. It worked, but it didn't scale. Every time a skill got updated upstream, I had to manually pull down changes. Worse, committing someone else's skill files into my repo felt wrong from a licensing perspective. These aren't my files to redistribute.

The better approach is a lock file. Vercel's CLI generates `.skill-lock.json` which tracks which skills are installed, their source repos and a content hash. The actual skill files live in `~/.agents/skills/` (installed by the CLI), not in my dotfiles. Only the lock file gets committed. On a new machine, `skills experimental_install` restores everything from the lock file.

```sh
# Install a skill globally, targeting Claude Code specifically
skills add anthropics/claude-plugins-official -g -a claude-code -s frontend-design -y

# Check for updates across all tracked skills
skills check

# Apply updates
skills update
```

The `-a claude-code` flag is key. It tells the CLI to copy the skill into `~/.claude/skills/` where Claude Code actually looks for them, on top of the standard `~/.agents/skills/` directory that other tools use.

## Private skills via iCloud

Not everything goes in the public repo. I have a couple of private skills synced through iCloud and symlinked into `~/.claude/skills/`. They contain personal writing samples and preferences that I don't want to publish, so iCloud keeps them portable without making them public.

## How it all layers together

The final setup has three tiers of skills, each managed differently:

1. **Third-party skills** - managed by `npx skills`, tracked in the lock file, not committed to the repo. Installed with `skills add -g -a claude-code`.
2. **Custom skills** (2) - my own SKILL.md files committed to the dotfiles repo, stowed into `~/.claude/skills/`.
3. **Private skills** (2) - synced via iCloud, symlinked into place. Never committed anywhere public.

When I set up a new machine, it's:

```sh
./setup.sh                      # Stow dotfiles, install Homebrew packages
skills experimental_install     # Restore third-party skills from lock file
./sync.sh                       # Pull fonts and private skills from iCloud
```

Three commands and everything is in place. My agent instructions, my skills, my hooks, my permissions - all of it. Not to mention my shell config, my Git settings, my terminal preferences - all in one repo, all linked perfectly into place. I'm ready to go in just a few minutes.

## We need to do better

I won't pretend this is perfect. The fact that I need symlinks to bridge `AGENTS.md` and `CLAUDE.md` is annoying. The fact that skills need to be installed to both `~/.agents/skills/` and `~/.claude/skills/` is annoying. Stow's `--adopt` flag will happily pull files from your home directory into your repo if there's a conflict, which can catch you off guard if you're not paying attention.

But compared to where we were a year ago - manually copying config between half a dozen directories with no shared format - this is a massive improvement. `AGENTS.md` as a standard is a good thing. Vercel's skills CLI solves a real problem. And Stow continues to be one of those quiet yet reliable Unix tools that "Just Works".

If Anthropic would read `AGENTS.md` from `~/.agents/` for global config, I could drop some of the complexity here.

But I'm not holding my breath on that one...
