<script setup lang="ts">
const route = useRoute();
const page = computed(() => Number(route.query.page) || 1);
const itemsPerPage = 10;

const { data: posts } = await useAsyncData(
  () => `posts-${page.value}`,
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

useHead({ title: 'Posts' });
useSeoMeta({ description: "Articles on front-end engineering, Vue, and web development by Sean O'Grady." });
</script>

<template>
  <PostsList title="Posts" :posts="posts || []" :page="page" :totalPages="totalPages" />
</template>
