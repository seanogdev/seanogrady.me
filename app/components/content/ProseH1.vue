<script setup lang="ts">
const route = useRoute();
const transitionName = computed(() => `post-${route.path.replace(/^\//, '').replaceAll('/', '-')}-title`);
</script>

<template>
  <h1 :style="{ viewTransitionName: transitionName }">
    <slot />
  </h1>
</template>
