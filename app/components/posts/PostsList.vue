<script setup lang="ts">
const { data: items } = await useAsyncData('navigation', () => queryCollectionNavigation('posts'));
const posts = computed(() => items.value?.[0]?.children ?? []);
</script>
<template>
  <div class="grid auto-rows-auto gap-8">
    <h1
      class="border-green-12 text-trim-both dark:border-greendark-12 text-mint-12 font-stretch-125% -ml-2 border-l pl-2 text-2xl font-semibold uppercase sm:-ml-4 sm:pl-4"
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
