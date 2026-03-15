<script lang="ts" setup>
import { DateTime } from 'luxon';

const route = useRoute();
const { data: post } = await useAsyncData(route.path, () => queryCollection('posts').path(route.path).first(), {
  getCachedData: (key, nuxtApp) => nuxtApp.payload.data[key] ?? nuxtApp.static.data[key],
});
useHead({
  title: post.value?.title,
});

useSeoMeta({
  description: post.value?.description,
  ogTitle: post.value?.title,
  ogDescription: post.value?.description,
  ogImage: post.value?.coverImage,
  ogType: 'article',
  articlePublishedTime: post.value?.date,
  articleTag: post.value?.tags,
  twitterCard: 'summary_large_image',
});

const transitionName = computed(() => (post.value ? `post-${post.value.slug}` : undefined));
const date = computed(() => (post.value ? DateTime.fromISO(post.value.date) : null));
</script>

<template>
  <div
    v-if="post"
    class="prose col-span-12 *:scroll-mt-14 md:col-span-8 md:col-start-3"
    :style="{ viewTransitionName: transitionName }"
  >
    <NuxtImg
      v-if="post.coverImage"
      :src="post.coverImage"
      :alt="post.title"
      width="1200"
      height="800"
      loading="eager"
      :preload="{ fetchPriority: 'high' }"
      class="not-prose mb-8 aspect-3/1 w-full rounded-lg object-cover md:-mx-12 md:w-[calc(100%+6rem)] md:max-w-[calc(100%+6rem)]"
    />

    <div class="not-prose mb-8 flex items-center gap-4 text-sm text-sage-10 dark:text-sagedark-10">
      <time v-if="date" :datetime="date.toISODate() ?? undefined">{{ date.toLocaleString(DateTime.DATE_MED) }}</time>
      <span>·</span>
      <span>{{ post.readingTime || 1 }} min read</span>
    </div>

    <ContentRenderer
      :value="post"
      class="[&>p>img]:my-8 [&>p>img]:rounded-lg [&>p>img]:md:-mx-12 [&>p>img]:md:my-12 [&>p>img]:md:max-w-[calc(100%+6rem)]"
    />

    <div
      v-if="post.tags?.length"
      class="not-prose mt-12 flex items-center gap-2 text-xs tracking-wide text-sage-10 uppercase dark:text-sagedark-10"
    >
      <NuxtLink
        v-for="tag in post.tags"
        :key="tag"
        :to="`/posts/tags/${tag}`"
        class="transition-colors hover:text-jade-11 dark:hover:text-jadedark-11"
      >
        #{{ tag }}
      </NuxtLink>
    </div>
  </div>
</template>
