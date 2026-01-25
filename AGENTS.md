# AGENTS.md

> Personal website and blog built with Nuxt 4, Vue 3, and Nuxt Content

## What This Project Is

A Nuxt 4 personal website/blog featuring:

- Markdown-based blog posts via @nuxt/content
- File-based routing with dynamic post pages
- Tailwind CSS 4 styling with Radix Colors
- Client-side search with Fuse.js
- View Transitions API for smooth page navigation

## Project Structure

```
app/
  components/
    app/       - Core (header, search)
    home/      - Homepage (avatar, page)
    posts/     - Blog (list, card, single)
    content/   - Prose component overrides (ProseH1, etc.)
  pages/
    index.vue                 - Homepage
    posts/index.vue           - Post listing
    posts/[...slug].vue       - Individual posts
  style.css                   - Global styles + transitions
content/
  posts/       - Blog post markdown files
nuxt.config.ts - Nuxt configuration
content.config.ts - Content collections config
```

## Quick Start

**Assume the dev server is already running on `localhost:3000`.**

```bash
# Development
pnpm dev              # Start dev server (localhost:3000)

# Production
pnpm build            # Build for production
pnpm preview          # Preview production build

# Static
pnpm generate         # Generate static site
```

**Requirements:** Node.js >=22.0.0, pnpm 10.3.0+

## How to Work on This Project

### Adding Content

**Blog posts** go in `content/posts/` as `.md` files with frontmatter:

```yaml
---
title: Post Title
description: Post description
publishedAt: 2026-01-25
---
```

**Prose components** can be customized in `app/components/content/` (e.g., `ProseH1.vue`) to override markdown rendering.

### Styling

- **Always use Tailwind classes** for styling; avoid inline styles or custom CSS
- **Tailwind 4** via Vite plugin (not PostCSS)
- Use **arbitrary values** for dynamic CSS: `[view-transition-name:foo]`
- Global styles in `app/style.css`
- Component library: `reka-ui` (auto-imported)
- Colors: Tailwind Radix Colors (`sand`, `jade` themes)

### Component Patterns

- Components **auto-import** from `app/components/`
- Organized by feature module (`app/`, `home/`, `posts/`)
- Use **camelCase** for Vue attributes (`vue/attribute-hyphenation: never`)
- **Dates**: Store as ISO strings, use Luxon `DateTime.fromISO()` and `toLocaleString()` for formatting

### Linting & Formatting

Use editor integration, or:

```bash
pnpm exec eslint .
pnpm exec prettier --write .
```

Config: `eslint.config.ts`, `prettier.config.js` (120 char lines, single quotes)

## Framework Documentation

When you need detailed framework guidance:

- **Nuxt 4**: https://nuxt.com/llms-full.txt
- **Nuxt Content v3**: https://content.nuxt.com/llms-full.txt
- **Reka UI**: https://reka-ui.com/llms-full.txt

Read these when working on routing, data fetching, content queries, MDC syntax, or component patterns.
