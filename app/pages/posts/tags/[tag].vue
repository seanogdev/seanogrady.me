<script setup lang="ts">
const route = useRoute();
const tag = computed(() => route.params.tag as string);
const page = computed(() => Number(route.query.page) || 1);
const itemsPerPage = 10;

const { data: posts } = await useAsyncData(
  () => `posts-tag-${tag.value}-${page.value}`,
  () =>
    queryCollection('posts')
      .where('tags', 'LIKE', `%"${tag.value}"%`)
      .order('date', 'DESC')
      .skip((page.value - 1) * itemsPerPage)
      .limit(itemsPerPage)
      .all(),
  { watch: [page, tag], getCachedData: (key, nuxtApp) => nuxtApp.payload.data[key] ?? nuxtApp.static.data[key] },
);

const { data: totalCount } = await useAsyncData(
  () => `posts-tag-${tag.value}-count`,
  () => queryCollection('posts').where('tags', 'LIKE', `%"${tag.value}"%`).count(),
  { watch: [tag], getCachedData: (key, nuxtApp) => nuxtApp.payload.data[key] ?? nuxtApp.static.data[key] },
);

const totalPages = computed(() => Math.ceil((totalCount.value || 0) / itemsPerPage));

useHead({ title: () => `Tagged: ${tag.value}` });
useSeoMeta({ description: () => `Posts tagged with "${tag.value}".` });
</script>

<template>
  <PostsList :title="`Tagged: ${tag}`" :posts="posts || []" :page="page" :totalPages="totalPages" />
</template>
