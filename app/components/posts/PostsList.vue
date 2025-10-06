<script setup lang="ts">
const route = useRoute();
const page = computed(() => Number(route.query.page) || 1);
const itemsPerPage = 10;

const { data: posts } = await useAsyncData(
  'posts',
  () =>
    queryCollection('posts')
      .order('date', 'DESC')
      .skip((page.value - 1) * itemsPerPage)
      .limit(itemsPerPage)
      .all(),
  { watch: [page] },
);

const { data: totalCount } = await useAsyncData('posts-count', () => queryCollection('posts').count());

const totalPages = computed(() => Math.ceil((totalCount.value || 0) / itemsPerPage));

useHead({
  title: 'Posts & Musings',
});
</script>

<template>
  <div>
    <h1
      class="-ml-2 border-l-2 border-jade-12 pl-2 text-2xl font-medium text-jade-12 uppercase text-trim-both sm:-ml-4 sm:pl-4 dark:border-jadedark-12 dark:text-jadedark-12"
    >
      Posts
    </h1>

    <div class="mt-8 flex flex-col gap-6">
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
