<script setup lang="ts">
import type { PostsCollectionItem } from '@nuxt/content';
import { DateTime } from 'luxon';

const props = defineProps<{ post: PostsCollectionItem }>();
const date = computed(() => DateTime.fromISO(props.post.date));
const transitionName = computed(() => `post-${props.post.stem?.replaceAll('/', '-')}`);

const active = ref(false);
</script>

<template>
  <article class="py-6" :style="{ viewTransitionName: active ? transitionName : undefined }">
    <h3
      class="mb-2 font-serif text-2xl leading-normal font-light md:text-4xl"
      :style="{ viewTransitionName: active ? `${transitionName}-title` : undefined }"
    >
      <NuxtLink
        :to="post.path"
        class="text-sage-12 transition-colors hover:text-jade-11 dark:text-sagedark-11 dark:hover:text-jadedark-11"
        @click="active = true"
      >
        {{ post.title }}
      </NuxtLink>
    </h3>

    <p class="mb-3 text-lg leading-normal text-sage-12 dark:text-sagedark-11">{{ post.description }}</p>

    <div class="flex items-center gap-2 text-xs tracking-wide text-sage-10 uppercase dark:text-sagedark-10">
      <time :datetime="date.toISODate() ?? undefined">{{ date.toLocaleString(DateTime.DATE_MED) }}</time>
      <span>·</span>
      <span>{{ readTime(post.rawbody || '') }}</span>
      <template v-if="post.tags?.length">
        <span>·</span>
        <NuxtLink
          v-for="tag in post.tags"
          :key="tag"
          :to="`/posts/tags/${tag}`"
          class="transition-colors hover:text-jade-11 dark:hover:text-jadedark-11"
        >
          #{{ tag }}
        </NuxtLink>
      </template>
    </div>
  </article>
</template>
