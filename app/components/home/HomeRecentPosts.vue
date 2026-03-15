<script setup lang="ts">
const { data: posts } = await useAsyncData(
  'recent-posts',
  () => queryCollection('posts').order('date', 'DESC').limit(5).all(),
  { getCachedData: (key, nuxtApp) => nuxtApp.payload.data[key] ?? nuxtApp.static.data[key] },
);
</script>

<template>
  <section class="col-span-12 md:col-span-8 md:col-start-3">
    <div class="mb-6 flex items-baseline justify-between">
      <h2 class="text-xs font-medium tracking-widest text-balance text-sage-10 uppercase dark:text-sagedark-10">
        Recent writing
      </h2>
      <NuxtLink
        to="/posts"
        class="text-sm text-sage-10 transition-colors hover:text-jade-11 dark:text-sagedark-10 dark:hover:text-jadedark-11"
      >
        View all →
      </NuxtLink>
    </div>

    <div class="divide-y divide-sage-6 dark:divide-sagedark-6">
      <PostCard v-for="post in posts || []" :key="post.path" :post="post" />
    </div>
  </section>
</template>
