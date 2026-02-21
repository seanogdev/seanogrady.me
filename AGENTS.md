# seanogrady.me

> Personal website and blog built with Nuxt 4, Vue 3, and Nuxt Content

## Stack

- **Nuxt 4** + Vue 3, file-based routing
- **@nuxt/content** v3 — Markdown blog posts in `content/posts/`
- **Tailwind CSS 4** via Vite plugin (not PostCSS) + Radix Colors (`sand`, `jade`)
- **Reka UI** — component library (auto-imported)
- **Fuse.js** — client-side search

## Commands

```bash
pnpm dev        # localhost:3000 (assume already running)
pnpm generate   # static build (deploys to Netlify)
pnpm build      # SSR build
pnpm preview    # preview production build
```

## Key Conventions

- **Components** auto-import from `app/components/` — no imports needed
- **Dates**: store as ISO strings; format with `DateTime.fromISO().toLocaleString()` (Luxon)
- **Blog frontmatter**: use `date` (not `publishedAt`), optional `tags: []`
- **Styling**: Tailwind classes only — no inline styles or custom CSS

## Gotchas

- `pnpm.overrides` replaces `vite` with `rolldown-vite` — may affect some plugins
- Last.fm "Now Playing" requires env vars: `NUXT_LASTFM_API_KEY`, `NUXT_PUBLIC_LASTFM_USERNAME`

## Framework Docs

- **Nuxt 4**: https://nuxt.com/llms-full.txt
- **Nuxt Content v3**: https://content.nuxt.com/llms-full.txt
- **Reka UI**: https://reka-ui.com/llms-full.txt
