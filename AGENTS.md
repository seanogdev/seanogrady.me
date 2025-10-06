# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

This project uses pnpm as the package manager. Essential commands:

- `pnpm dev` - Start development server on localhost:3000
- `pnpm build` - Build for production
- `pnpm generate` - Generate static site
- `pnpm preview` - Preview production build locally
- `pnpm install` - Install dependencies

### Linting and Formatting

- ESLint is configured via `eslint.config.ts` using @nuxt/eslint
- Prettier is configured via `prettier.config.js` with Tailwind CSS plugin
- No explicit lint/format scripts defined - use your editor integration or run `pnpm exec eslint .` and `pnpm exec prettier --write .`

## Architecture

This is a Nuxt 4 personal website/blog with the following structure:

### Content Management

- Uses @nuxt/content for markdown-based blog posts
- Blog posts are stored in `content/posts/*.md`
- Content collection defined in `content.config.ts`

### Component Organization

- Components are organized by feature modules in `app/components/`:
  - `app/` - Core app components (header, search)
  - `home/` - Homepage components (avatar, page)
  - `posts/` - Blog post components (list, single post)
- Module-based auto-import configured in `nuxt.config.ts`

### Routing

- Pages in `app/pages/`:
  - `index.vue` - Homepage
  - `posts/index.vue` - Blog post listing
  - `posts/[...slug].vue` - Individual blog posts
- Uses Nuxt's file-based routing

### Styling

- Tailwind CSS 4.x via @tailwindcss/vite plugin
- Global styles in `app/style.css`
- Uses reka-ui component library
- Tailwind Radix Colors and tailwindcss-animate for enhanced styling

### Key Dependencies

- Vue 3.5+ with Nuxt 4.x
- @nuxt/content for markdown processing
- @nuxt/icon for SVG icons
- @vueuse/core for Vue utilities
- Fuse.js for search functionality
- es-toolkit for utility functions

## Important Notes

- Requires Node.js >=22.0.0
- Uses pnpm 10.3.0+ as specified in packageManager field
- ESLint rule: `vue/attribute-hyphenation` set to 'never' (use camelCase for attributes)
- Prettier configured with 120 character line width and single quotes
