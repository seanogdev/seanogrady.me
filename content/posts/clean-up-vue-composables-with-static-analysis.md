---
title: 'Using Static Analysis to Clean Up Vue Composables'
date: 2026-03-15
description: 'How we used a Knip preprocessor to find unused return properties in Vue composables and gain confidence in cleaning them up.'
tags: ['developer-tooling', 'vue', 'performance', 'dead-code']
coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80'
---

# Using Static Analysis to Clean Up Vue Composables

As your application grows, so does the complexity in your codebase. With growth comes baggage. People leave and the domain knowledge of what their code did goes with them. Nobody's confident enough to delete the logic that looks unused because they're not sure what else depends on it.

The bigger the codebase gets, the less likely anyone is to go digging through logic they didn't write. That's true for humans, and it's especially true now that AI tooling is generating code faster than anyone can manually audit it.

## The gap in standard tooling

When you call a composable, it runs all of its setup code - every ref, every watcher, every API call - regardless of which properties the consumer actually uses. That's just how JavaScript works. The Vue community convention of destructuring return values makes it easy to grab only what you need, but the composable itself has no idea what you picked. It does everything anyway.

We've been using [Knip](https://knip.dev/) at work for a while. It finds unused files, unused dependencies and unused exports across your codebase. For us it's been brilliant at keeping things tidy as our project scales and evolves.

But Knip can only work at module boundaries - it tracks what's imported and exported between files, not what's used within them. So what about the unused code inside of a composable?

```ts
// useTodos.ts
export function useTodos() {
  const items = ref([]);
  const isLoading = ref(false);

  // This watcher runs regardless of whether anyone
  // destructures `overdue`
  const overdue = ref([]);
  watch(items, (val) => {
    overdue.value = val.filter((t) => isPastDue(t));
  });

  // This fires every time the composable is used,
  // even if no consumer ever reads `stats`
  const stats = ref({});
  watchEffect(async () => {
    stats.value = await fetchTodoStats();
  });

  return {
    items,
    isLoading,
    overdue, // unused - but the watcher still runs
    stats, // unused - but the API call still fires
  };
}

// TodoList.vue
// Knip sees this import and considers useTodos "used".
// It has no idea that overdue and stats are dead weight.
const { items, isLoading } = useTodos();
```

`TodoList` only cares about two of those four properties, but the composable doesn't know that. It sets up everything regardless.

That's a simplified example, but the pattern is real. Properties accumulate in return objects over years and without a way to verify what's actually used, nobody's going to touch them. So what if we could tell with some level of certainty which properties were never destructured at any call site?

## Hacking Knip to find it

The first version of just that was a standalone script. It found the issues, but that was about it. A script that someone has to remember to run separately is a script that stops getting run.

Knip, on the other hand, already deals with dead code. It has reporters, GitHub integration, and people already use it as part of their workflow. If I could get composable analysis into that same pipeline, it wouldn't be a side project. It'd just be part of how we work.

Knip has a [preprocessor API](https://knip.dev/features/reporters#preprocessors) that lets you inject issues into its pipeline. It's not designed for this, but as I learned, you _can_ shoehorn composable analysis into Knip's unused exports report. It's very much a hack, but it works - composable dead code shows up in the same workflow developers already use.

It can't catch everything. If a consumer does `const todos = useTodos()` without destructuring, the tool bails out - it can't know which properties are accessed later. That's fine, I'd rather it miss things than report false positives. A flagged property might also still be used internally within the composable, so it's not always a straight deletion. It just tells you (or \<Insert AI tool of your choice\>) where to look.

Having trust in the tool is crucial to get buy-in from developers. It isn't there to be a hindrance, it's there to give them confidence and help clean up code that could be missed in manual verification.

## What it found

The good news is it worked really well when we ran it the first time. The bad news is there was more than a bit of cleanup to do. Hundreds of unused properties across the codebase, some composables with over a dozen each.

When something returns 30 properties and only 5 are ever used, that's a signal too. That composable probably should have been split up a long time ago.

## The outcome

The tool is now part of our standard Knip report, which means new dead composable properties get caught before they have a chance to accumulate.

Before this, cleaning up a composable meant reading through every call site and hoping you didn't miss one. Now we know exactly what's unused. Developers can confidently trim composables down, and the people reviewing those changes can trust the tooling instead of relying on gut feeling.

It's also been useful for AI-assisted development. AI tooling tends to be reluctant to delete code without strong evidence that it's safe to do so. This report gives it exactly that - a verified list of what's unused, so it can clean things up without second-guessing itself.

Smaller composable contracts are easier to understand, easier to refactor, and ultimately mean less unnecessary work happening at runtime for our users.
