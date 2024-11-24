<script lang="ts" setup>
const route = useRoute();
const { data: value } = await useAsyncData(route.path, () => queryCollection('blog').path(route.path).first());
</script>

<template>
  <ContentRenderer v-if="value" :value />
</template>
