<script setup lang="ts">
const route = useRoute();
const viewTransitionName = computed(() => `post-${route.path}`);
</script>

<template>
  <h1 :style="{ viewTransitionName }">
    <slot />
  </h1>
</template>
