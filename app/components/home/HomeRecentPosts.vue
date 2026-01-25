<script setup lang="ts">
const { data: posts } = await useAsyncData('recent-posts', () =>
  queryCollection('posts').order('date', 'DESC').limit(5).all(),
);
</script>

<template>
  <section class="mt-16 w-full">
    <div class="mb-8">
      <h2 class="mb-4 text-xl leading-relaxed font-bold text-jade-11 dark:text-jadedark-12">RECENT WRITING</h2>
      <p class="text-jade-11 dark:text-jadedark-11">
        Thoughts on frontend development, design systems, and accessibility
      </p>
    </div>

    <div class="flex flex-col gap-6">
      <PostCard v-for="post in posts" :key="post.path" :post="post" />
    </div>

    <div class="mt-8 text-center">
      <NuxtLink
        to="/posts"
        class="inline-flex items-center text-sm font-medium text-jade-11 transition-colors hover:text-jade-12 dark:text-jadedark-11 dark:hover:text-jadedark-12"
      >
        View all articles →
      </NuxtLink>
    </div>
  </section>
</template>
