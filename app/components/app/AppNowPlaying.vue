<script setup lang="ts">
import type { TrackData } from '~~/shared/types';

import { DateTime } from 'luxon';

const { data: trackData } = await useFetch<TrackData>('/api/lastfm');

const timestamp = computed(() => (trackData.value ? DateTime.fromMillis(trackData.value.timestamp) : null));

const isRecentlyPlayed = computed(() => {
  if (!timestamp.value) return false;
  return timestamp.value.diffNow().as('hours') > -3;
});

const shouldShowNowPlaying = computed(() => {
  return trackData.value?.nowPlaying && isRecentlyPlayed.value;
});

const relativeTime = computed(() => {
  if (!timestamp.value) return '';
  return timestamp.value.toRelative() ?? '';
});
</script>

<template>
  <section v-if="trackData" class="flex h-full w-full flex-col gap-4">
    <div class="mb-4 flex items-center justify-between">
      <h2 class="text-sm font-medium tracking-widest text-sage-10 uppercase dark:text-sagedark-10">
        {{ shouldShowNowPlaying ? 'Now playing' : 'Last played' }}
      </h2>
      <div class="flex items-center gap-2">
        <EqualizerIcon class="h-4 w-4 text-sage-10 dark:text-sagedark-10" />
        <span class="text-xs text-sage-10 dark:text-sagedark-10">{{ relativeTime }}</span>
      </div>
    </div>

    <div class="flex gap-5">
      <div class="relative shrink-0">
        <img
          v-if="trackData.albumArt"
          :src="trackData.albumArt"
          :alt="`${trackData.album} album art`"
          class="h-32 w-32 rounded-md"
        />
        <Icon v-else name="lucide:music" class="h-32 w-32 text-sage-10 dark:text-sagedark-10" />
      </div>

      <div class="min-w-0 flex-1">
        <div class="truncate font-serif text-2xl leading-tight font-normal text-jade-12 dark:text-jadedark-12">
          {{ trackData.name }}
        </div>
        <div class="mt-1 truncate text-lg text-sage-12 dark:text-sagedark-11">
          {{ trackData.artist }}
        </div>
        <div v-if="trackData.album" class="mt-1 truncate text-base text-sage-11 dark:text-sagedark-11">
          {{ trackData.album }}
        </div>
      </div>
    </div>
  </section>
</template>
