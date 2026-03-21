---
title: 'Dropping the Dead Weight: Migrating from Nuxt to Astro'
date: 2026-03-21
description: 'Why I moved my personal site from Nuxt 4 to Astro, how Vue survived the transition as islands, and what I gained by ditching the framework tax.'
tags: ['astro', 'vue', 'performance', 'developer-tooling']
coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=80'
---

# Dropping the Dead Weight: Migrating from Nuxt to Astro

This site was built with Nuxt 4, Vue 3 and Nuxt Content. It's a blog and a personal page. Static HTML, deployed to Cloudflare Pages. There's nothing dynamic about it except a Last.fm widget in the footer.

And yet every page was shipping a WASM SQLite database to the browser.

## The problem with Nuxt Content on static sites

[Nuxt Content](https://content.nuxt.com/) v3 uses a SQLite database compiled to WebAssembly to power its querying on the client. For apps that need client-side content filtering or search, that makes sense. For a blog with two posts and a tag page, it's absurd.

I'm generating static HTML at build time. The content is baked into the page. There is no client-side querying happening. But Nuxt Content doesn't care - it ships the database regardless because the runtime doesn't know you won't need it. That's ~70KB of JavaScript on every page load for functionality I never use.

On top of that, view transitions in Nuxt have been rough. They work some of the time, they glitch the rest. I'd been working around bugs for long enough that the "just ship it" voice in my head was getting louder.

## Why Astro

[Astro](https://astro.build/) does the one thing I actually need: generate static HTML from Markdown and ship zero JavaScript by default. If a component needs interactivity, you opt in with a `client:` directive. Everything else is just HTML and CSS.

Astro's [content collections](https://docs.astro.build/en/guides/content-collections/) are build-time only. You define a schema with Zod, point it at a folder of Markdown files, and query them in your page templates. No runtime database. No WASM. The content goes in, HTML comes out.

```ts
// src/content.config.ts
const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    coverImage: z.string().optional(),
  }),
});
```

View transitions are handled by `<ClientRouter />`, which gives you smooth page-to-page animations with a single import. No configuration, no bugs. It just works.

## What survived the migration

Not everything needed to change. My entire Tailwind CSS 4 setup, including the Radix Colours theme and all the custom animations, carried over as a single CSS file. It's pure CSS and Tailwind utilities with no framework dependencies, so it dropped straight into Astro's `global.css` without a single edit.

Vue survived too, but only where it earns its keep. Out of the full component tree, only three components actually need client-side JavaScript:

- **DarkModeToggle** - reads `localStorage`, toggles the `.dark` class, swaps an icon. Uses `client:load` because it's above the fold.
- **HomeAvatar** - the animated squircle blob thing. It randomises colours and animation timings on mount using `es-toolkit`. Uses `client:visible` to defer hydration.
- **AppNowPlaying** - fetches the Last.fm API and renders the currently playing track with a relative timestamp via Luxon. Also `client:visible` since it's in the footer.

Everything else became an `.astro` component. The header, footer, social links, post cards, post lists, pagination - all static, all zero JavaScript. Astro renders them to HTML at build time and that's the end of it.

## The small things that got simpler

Reading time was a Nuxt module that hooked into the content pipeline, parsed the Markdown with unified, stripped it and counted words. In Astro it's a [remark plugin](https://docs.astro.build/en/recipes/reading-time/) that does the same thing in about ten lines.

Dark mode was `@nuxtjs/color-mode`, a whole module with its own state management and hydration concerns. Now it's a three-line inline script in the `<head>` that reads `localStorage` before the page paints, plus a tiny Vue island for the toggle button. No flash, no hydration mismatch.

Pagination went from query parameters (`?page=2`) that required client-side navigation to path-based static routes (`/posts/2/`) generated at build time with Astro's `paginate()`. Better for SEO, works without JavaScript, and the URLs are cleaner.

Icons went from `@nuxt/icon` to [`astro-icon`](https://www.astroicon.dev/). Same Iconify ecosystem underneath, same `<Icon name="bi:moon" />` API, but the SVGs get inlined at build time. Zero client JavaScript.

## The Last.fm endpoint

The one genuinely server-side thing on this site is the Last.fm API proxy. It fetches my recently played track, validates the response with Zod and returns it as JSON. In Nuxt this was a Nitro server route. In Astro it's an API route with `export const prerender = false`, which tells Astro to run it as a Cloudflare Worker instead of baking it into static HTML.

```ts
// src/pages/api/lastfm.ts
export const prerender = false;

export const GET: APIRoute = async () => {
  const apiKey = import.meta.env.LASTFM_API_KEY;
  // fetch, validate, return
};
```

The Vue island in the footer fetches from `/api/lastfm` on mount, same as before. The only difference is the server code went from Nitro's `defineEventHandler` to Astro's `APIRoute`. A straightforward port.

## What I gained

The numbers speak for themselves. Static pages now ship zero JavaScript. The three Vue islands only hydrate on pages where they're used, and two of them defer until they're visible in the viewport. The Nuxt runtime, the WASM database, the router, the colour mode module - all gone.

I'm not going to pretend this was some heroic refactor. It's a personal blog with two posts. But the principle matters. If your site is fundamentally static content, the framework shouldn't be fighting you with client-side infrastructure you didn't ask for.

Astro gets out of the way. You write your content, you build your pages, and the output is HTML. When you need interactivity, Vue is right there. When you don't, it stays out of the bundle. That's exactly how it should work.
