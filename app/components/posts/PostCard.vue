<script setup lang="ts">
interface PostCardProps {
  title: string;
  description: string;
  date: string | Date;
  readTime: string;
  tags: string[];
  path: string;
}

defineProps<PostCardProps>();

const formatDate = (date: string | Date) => {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};
</script>

<template>
  <article
    class="bg-white rounded-lg border border-gray-6 p-6 transition-shadow hover:shadow-md dark:border-graydark-6 dark:bg-graydark-1"
  >
    <div class="mb-3 flex items-center gap-2 text-sm text-gray-11 dark:text-graydark-11">
      <time :datetime="typeof date === 'string' ? date : date.toISOString()">{{ formatDate(date) }}</time>
      <span>•</span>
      <span class="flex items-center gap-1">
        <Icon name="lucide:clock" class="h-4 w-4" />
        {{ readTime }}
      </span>
    </div>

    <h3 class="mb-2 text-xl font-semibold text-gray-12 dark:text-graydark-12">
      {{ title }}
    </h3>

    <p class="mb-4 leading-relaxed text-gray-11 dark:text-graydark-11">{{ description }}</p>

    <div class="flex items-center justify-between">
      <div class="flex flex-wrap gap-2">
        <Chip v-for="tag in tags" :key="tag" :label="tag" />
      </div>

      <NuxtLink
        :to="path"
        class="inline-flex items-center text-sm font-medium text-gray-12 transition-colors hover:text-blue-11 dark:text-graydark-12 dark:hover:text-blue-11"
      >
        Read article →
      </NuxtLink>
    </div>
  </article>
</template>
