# seanogrady.me

> Personal website and blog built with Astro, Vue 3 islands, and Astro Content Collections

## Key Conventions

- Dev server is assumed to be running on localhost:4321
- **Astro components** (`.astro`) for static content, **Vue components** (`.vue`) for interactivity
- **Vue islands** use `client:load` (above fold) or `client:visible` (below fold)
- **Dates**: store as ISO strings in frontmatter; format with Luxon `DateTime`
- **Blog frontmatter**: use `date` (not `publishedAt`), optional `tags: []`
- **Styling**: Tailwind classes only — no inline styles or custom CSS
- **Radix Colors harmonies**: https://www.radix-ui.com/colors/docs/palette-composition/understanding-the-scale

## Gotchas

- Last.fm "Now Playing" requires env vars: `LASTFM_API_KEY`, `LASTFM_USERNAME`
- The `/api/lastfm` endpoint uses `export const prerender = false` for server-side execution
- Vue islands need inline SVGs for icons (astro-icon only works in .astro files)

## Framework Docs

- **Astro**: https://docs.astro.build/llms-full.txt
- **Vue 3**: https://vuejs.org/llms-full.txt
