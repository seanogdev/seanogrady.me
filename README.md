# seanogrady.me

Personal website and blog. Built with Astro, Vue 3 islands and Tailwind CSS 4. Deployed to Cloudflare Pages.

## Stack

- **Astro 6** for static site generation and routing
- **Vue 3** for interactive components (dark mode toggle, animated avatar, now playing widget)
- **Tailwind CSS 4** via Vite plugin with Radix Colours (`sage`, `jade`)
- **Astro Content Collections** for Markdown blog posts with Zod frontmatter validation
- **Cloudflare Pages** for hosting, with Workers for the Last.fm API proxy

## Project structure

```
src/
├── components/        # Astro and Vue components
├── content/posts/     # Markdown blog posts
├── layouts/           # Base page layout
├── pages/
│   ├── api/           # Server-side API routes (Cloudflare Workers)
│   ├── posts/         # Blog post pages, pagination, tag filtering
│   └── index.astro    # Home page
├── styles/            # Global CSS and prose styles
└── utils/             # Remark plugins
```

## Getting started

```bash
pnpm install
pnpm dev          # localhost:4321
```

## Building

```bash
pnpm build        # Static output + server routes
pnpm preview      # Preview production build locally
```

## Environment variables

Copy `.env.example` to `.env` and fill in:

- `LASTFM_API_KEY` — Last.fm API key for the now playing widget
- `LASTFM_USERNAME` — Last.fm username to fetch recent tracks
