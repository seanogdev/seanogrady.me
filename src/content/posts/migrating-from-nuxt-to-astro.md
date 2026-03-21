---
title: 'Right Tool, Right Job: Migrating from Nuxt to Astro'
date: 2026-03-21
description: 'Why I moved my personal site from Nuxt 4 to Astro, how Vue survived the transition as islands, and what I gained by picking a tool built for static content.'
tags: ['astro', 'vue', 'performance', 'developer-tooling']
coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=80'
---

This site was built with Nuxt 4, Vue 3 and Nuxt Content. It's a blog and a personal page. Static HTML, deployed to Cloudflare Pages.

And yet every page was shipping a WASM SQLite database to the browser.

## When a full-stack framework meets a static site

Nuxt is a brilliant framework for full-stack Vue applications. I'd reach for it without hesitation for anything with real interactivity.

But my personal site isn't that. It's a blog with two posts and a tag page.

[Nuxt Content](https://content.nuxt.com/) v3 uses a SQLite database compiled to WebAssembly to power client-side querying. For apps that need content filtering or search on the client, that's genuinely useful.

For my use case it was overhead I didn't need. The content is baked into the page at build time. There's no client-side querying happening, but the runtime ships the database regardless because it can't know that in advance.

I'd also been fighting view transitions. Nuxt's implementation sits on top of Vue's `<Transition>` component, which applies styles to elements during the animation lifecycle. That caused a few issues:

- Scroll position restoration was blocked until the transition completed. Navigate to a post, scroll halfway down, hit back, and you'd be stuck at the top while the leave animation played out.
- Tweaking durations, swapping transition modes, overriding scroll behaviour manually - none of it felt right.

At some point you realise you're working around the framework more than with it.

## Moving to Astro

[Astro](https://astro.build/) does the one thing I actually need: generate static HTML from Markdown and ship as little JavaScript as possible. If a component needs interactivity, you opt in with a `client:` directive. Otherwise, nothing ships.

[Content collections](https://docs.astro.build/en/guides/content-collections/) replaced Nuxt Content's WASM-powered querying with build-time only Zod schemas. Both frameworks use Zod for frontmatter validation, so the schema carried over almost unchanged. No runtime database. No WASM.

View transitions are handled by `<ClientRouter />`. Single import, no configuration. It just works.

The Tailwind CSS and Radix Colours setup carried over without an edit. Vue survived too, but only where it's actually needed. A handful of components need client-side JavaScript. Everything else became `.astro` components, rendered to HTML at build time.

Dark mode is a good example of where less framework means less complexity. `@nuxtjs/color-mode` handles SSR-safe state, cookie persistence and system preference detection. That's a lot of machinery for a toggle. Now it's a three-line inline script in the `<head>` that reads `localStorage` before the page paints, plus the Vue island for the button. No flash, no hydration mismatch.

## What I gained

Pages without islands ship zero JavaScript. The ones that do have islands only hydrate what's needed, and most defer until they're visible in the viewport. All the runtime infrastructure Nuxt provides for a full application - the router, the WASM database, the colour mode module - just isn't here anymore.

I'm not going to pretend this was some heroic refactor. It's a personal blog that, at time of writing, has two posts in it. The blog is new, not neglected. Nuxt would have continued to work fine.

But there's something satisfying about using a tool that's built for exactly your use case. Astro gets out of the way. You write your content, you build your pages, and the output is HTML. When you need interactivity, Vue is right there. When you don't, it stays out of the bundle.
