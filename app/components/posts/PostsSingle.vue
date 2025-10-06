<script lang="ts" setup>
const route = useRoute();
const { data: post } = await useAsyncData(route.path, () => queryCollection('posts').path(route.path).first());
useHead({
  title: post.value?.title,
});
</script>

<template>
  <div class="prose &>*:scroll-mt-14 col-span-8 col-start-3">
    <ContentRenderer v-if="post" :value="post" />
  </div>
</template>
