<script lang="ts" setup>
const route = useRoute();
const { data: post } = await useAsyncData(route.path, () => queryCollection('posts').path(route.path).first());
useHead({
  title: post.value?.title,
});
</script>

<template>
  <div class="col-span-8 col-start-3 prose">
    <ContentRenderer v-if="post" :value="post" />
  </div>
</template>
