<script setup lang="ts">
const careAboutTopics = [
  'Design Systems',
  'Accessibility',
  'Responsible AI',
  'Developer Experience',
  'Performance',
  'Human-Centered Design',
];
</script>
<template>
  <ClientOnly>
    <HomeAvatar
      class="col-span-6 col-start-4 mx-auto mt-4 aspect-square w-full max-w-64 md:col-span-4 md:col-start-1 md:max-w-none"
    />
    <div class="col-span-12 grid auto-rows-auto content-start gap-6 md:col-span-8">
      <h1 class="text-6xl leading-relaxed font-bold text-balance md:text-5xl">
        Hey, I'm
        <span class="font-bold">Seán</span>
        <span class="inline-block">👋</span>
      </h1>
      <p class="text-lg leading-relaxed text-pretty text-jade-11 md:text-xl dark:text-jadedark-11">
        I'm a Frontend Developer with over a decade of experience, with a focus on making simple software, experiences
        that are accessible, and tooling that automates the boring stuff.
      </p>
      <div class="mt-2">
        <h2 class="mb-4 text-xl leading-relaxed font-bold text-jade-11 dark:text-jadedark-12">What I care about</h2>
        <div class="flex flex-wrap gap-2">
          <Chip v-for="topic in careAboutTopics" :key="topic" :label="topic" />
        </div>
      </div>
    </div>
    <HomeRecentPosts class="col-span-full" />
  </ClientOnly>
</template>
