<script setup lang="ts">
const { data: items } = await useAsyncData('navigation', () => queryCollectionNavigation('posts'));
const posts = computed(() => items.value?.[0]?.children ?? []);
useHead({
  title: 'Posts & Musings',
});
</script>
<template>
  <div class="col-span-full grid auto-rows-auto">
    <h1
      class="-ml-2 border-l-2 border-jade-12 pl-2 text-2xl font-medium text-mint-12 uppercase font-stretch-125% text-trim-both sm:-ml-4 sm:pl-4 dark:border-jadedark-12"
    >
      Posts
    </h1>
    <nav>
      <ul>
        <li v-for="item in posts" :key="item.id">
          <NuxtLink :to="item.path">{{ item.title }}</NuxtLink>
        </li>
      </ul>
    </nav>
  </div>
</template>
