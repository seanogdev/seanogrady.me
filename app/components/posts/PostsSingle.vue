<script lang="ts" setup>
const route = useRoute();
const { data: post } = await useAsyncData(route.path, () => queryCollection('posts').path(route.path).first());
useHead({
  title: post.value?.title,
});

const transitionName = computed(() => `post-${route.path.replace(/^\//, '').replaceAll('/', '-')}`);
</script>

<template>
  <div
    class="prose col-span-12 [&>*]:scroll-mt-14 md:col-span-8 md:col-start-3"
    :style="{ viewTransitionName: transitionName }"
  >
    <ContentRenderer v-if="post" :value="post" />
  </div>
</template>
