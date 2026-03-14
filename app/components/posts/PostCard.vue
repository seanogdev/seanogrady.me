<script setup lang="ts">
import type { PostsCollectionItem } from '@nuxt/content';
import { DateTime } from 'luxon';

const props = defineProps<{ post: PostsCollectionItem }>();
const date = computed(() => DateTime.fromISO(props.post.date));
const viewTransitionName = computed(() => `post-${props.post.stem}`);
</script>

<template>
  <article
    class="rounded-lg border border-jade-6 bg-jade-1 p-6 transition-shadow hover:shadow-md dark:border-jadedark-6 dark:bg-jadedark-1"
  >
    <div class="mb-3 flex items-center gap-2 text-sm text-jade-11 dark:text-jadedark-11">
      <time :datetime="date.toISODate() ?? undefined">{{ date.toLocaleString(DateTime.DATE_FULL) }}</time>
      <span>•</span>
      <span class="flex items-center gap-1">
        <Icon name="lucide:clock" class="h-4 w-4" />
        {{ readTime(post.rawbody || '') }}
      </span>
    </div>

    <h3
      class="mb-2 font-serif text-xl leading-relaxed font-light text-jade-12 dark:text-jadedark-12"
      :style="{ viewTransitionName: viewTransitionName }"
    >
      {{ post.title }}
    </h3>

    <p class="mb-4 leading-relaxed text-jade-12 dark:text-jadedark-12">{{ post.description }}</p>

    <div class="flex items-center justify-between">
      <div class="flex flex-wrap gap-2">
        <Chip v-for="tag in post.tags" :key="tag" asChild>
          <NuxtLink :to="`/posts/tags/${tag}`">{{ tag }}</NuxtLink>
        </Chip>
      </div>

      <NuxtLink
        :to="post.path"
        class="inline-flex items-center text-sm leading-relaxed font-medium text-jade-12 transition-colors hover:text-jade-11 dark:text-jadedark-12 dark:hover:text-jadedark-11"
      >
        Read article →
      </NuxtLink>
    </div>
  </article>
</template>
