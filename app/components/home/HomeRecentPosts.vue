<script setup lang="ts">
const { data: posts } = await useAsyncData('recent-posts', () =>
  queryCollection('posts').order('date', 'DESC').limit(5).all(),
);
</script>

<template>
  <section class="mt-16 w-full">
    <div class="mb-8">
      <h2 class="mb-2 text-sm font-semibold tracking-wider text-gray-11 uppercase">RECENT WRITING</h2>
      <p class="text-gray-11">Thoughts on frontend development, design systems, and accessibility</p>
    </div>

    <div class="flex flex-col gap-6">
      <PostCard
        v-for="post in posts"
        :key="post.path"
        :title="post.title"
        :description="post.description"
        :date="post.date"
        :readTime="readTime(post.rawbody || '')"
        :tags="post.tags"
        :path="post.path"
      />
    </div>

    <div class="mt-8 text-center">
      <NuxtLink
        to="/posts"
        class="inline-flex items-center text-sm font-medium text-blue-11 transition-colors hover:text-blue-12"
      >
        View all articles →
      </NuxtLink>
    </div>
  </section>
</template>
