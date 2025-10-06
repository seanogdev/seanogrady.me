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
    class="rounded-lg border border-jade-6 bg-jade-1 p-6 transition-shadow hover:shadow-md dark:border-jadedark-6 dark:bg-jadedark-1"
  >
    <div class="mb-3 flex items-center gap-2 text-sm text-jade-11 dark:text-jadedark-11">
      <time :datetime="typeof date === 'string' ? date : date.toISOString()">{{ formatDate(date) }}</time>
      <span>•</span>
      <span class="flex items-center gap-1">
        <Icon name="lucide:clock" class="h-4 w-4" />
        {{ readTime }}
      </span>
    </div>

    <h3 class="mb-2 text-xl leading-relaxed font-semibold text-jade-12 dark:text-jadedark-12">
      {{ title }}
    </h3>

    <p class="mb-4 leading-relaxed text-jade-12 dark:text-jadedark-12">{{ description }}</p>

    <div class="flex items-center justify-between">
      <div class="flex flex-wrap gap-2">
        <Chip v-for="tag in tags" :key="tag" :label="tag" />
      </div>

      <NuxtLink
        :to="path"
        class="inline-flex items-center text-sm leading-relaxed font-medium text-jade-12 transition-colors hover:text-jade-11 dark:text-jadedark-12 dark:hover:text-jadedark-11"
      >
        Read article →
      </NuxtLink>
    </div>
  </article>
</template>
