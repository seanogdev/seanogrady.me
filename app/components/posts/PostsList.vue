<script setup lang="ts">
import type { PostsCollectionItem } from '@nuxt/content';

const {
  title,
  posts,
  page = 1,
  totalPages = 1,
} = defineProps<{
  title: string;
  posts: PostsCollectionItem[];
  page?: number;
  totalPages?: number;
}>();
</script>

<template>
  <div class="col-span-12 md:col-span-8 md:col-start-3">
    <h1 class="text-xs font-medium tracking-widest text-sage-10 uppercase dark:text-sagedark-10">
      {{ title }}
    </h1>

    <div class="mt-8 divide-y divide-sage-6 dark:divide-sagedark-6">
      <PostCard v-for="post in posts" :key="post.path" :post="post" />
    </div>

    <div v-if="posts.length === 0" class="mt-8 text-sage-11 dark:text-sagedark-11">No posts found.</div>

    <div v-if="totalPages > 1" class="mt-8 flex justify-center gap-2">
      <NuxtLink
        v-if="page > 1"
        :to="{ query: { page: page - 1 } }"
        class="rounded-lg border border-jade-6 bg-jade-1 px-4 py-2 text-sm font-medium text-jade-12 transition-colors hover:bg-jade-3 dark:border-jadedark-6 dark:bg-jadedark-1 dark:text-jadedark-12 dark:hover:bg-jadedark-3"
      >
        ← Previous
      </NuxtLink>
      <span class="flex items-center px-4 py-2 text-sm text-jade-11 dark:text-jadedark-11">
        Page {{ page }} of {{ totalPages }}
      </span>
      <NuxtLink
        v-if="page < totalPages"
        :to="{ query: { page: page + 1 } }"
        class="rounded-lg border border-jade-6 bg-jade-1 px-4 py-2 text-sm font-medium text-jade-12 transition-colors hover:bg-jade-3 dark:border-jadedark-6 dark:bg-jadedark-1 dark:text-jadedark-12 dark:hover:bg-jadedark-3"
      >
        Next →
      </NuxtLink>
    </div>
  </div>
</template>
