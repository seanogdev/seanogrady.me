<script setup lang="ts">
const { data: items } = await useAsyncData('navigation', () => queryCollectionNavigation('blog'));
const blogPosts = computed(() => items.value?.[0]?.children ?? []);
</script>
<template>
  <div>Blog</div>
  <ul>
    <li v-for="item in blogPosts" :key="item.id">
      <NuxtLink :to="item.path">{{ item.title }}</NuxtLink>
    </li>
  </ul>
</template>
