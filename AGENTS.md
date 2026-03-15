# seanogrady.me

> Personal website and blog built with Nuxt 4, Vue 3, and Nuxt Content

## Stack

- **Nuxt 4** + Vue 3, file-based routing
- **@nuxt/content** v3 — Markdown blog posts in `content/posts/`
- **Tailwind CSS 4** via Vite plugin (not PostCSS) + Radix Colors (`sage`, `jade`)
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
- **Radix Colors harmonies**: https://www.radix-ui.com/colors/docs/palette-composition/understanding-the-scale

## Gotchas

- Vite 8 installed directly — some plugins may show unmet peer dep warnings until they update their ranges
- Last.fm "Now Playing" requires env vars: `NUXT_LASTFM_API_KEY`, `NUXT_LASTFM_USERNAME`

## Framework Docs

- **Vue 3**: https://vuejs.org/llms-full.txt
- **Nuxt**: https://nuxt.com/llms-full.txt
- **Nuxt Content**: https://content.nuxt.com/llms-full.txt
- **Oxfmt/Oxlint**: https://oxc.rs/llms-full.txt
- **Nuxt Fonts**: https://fonts.nuxt.com/llms.txt
- **Oxc (short)**: https://oxc.rs/llms.txt
