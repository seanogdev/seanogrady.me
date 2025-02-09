<script lang="ts" setup>
const route = useRoute();
const { data: value } = await useAsyncData(route.path, () => queryCollection('posts').path(route.path).first());
</script>

<template>
  <div class="prose">
    <ContentRenderer v-if="value" :value />
  </div>
</template>
