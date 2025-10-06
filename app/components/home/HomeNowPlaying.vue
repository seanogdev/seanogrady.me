<script setup lang="ts">
import type { TrackData } from '~/shared/types';

const { data: trackData } = await useFetch<TrackData>('/api/lastfm');

const isRecentlyPlayed = computed(() => {
  if (!trackData.value) return false;
  const threeHoursInMs = 3 * 60 * 60 * 1000;
  const timeSinceFetch = Date.now() - trackData.value.timestamp;
  return timeSinceFetch < threeHoursInMs;
});

const shouldShowNowPlaying = computed(() => {
  return trackData.value?.nowPlaying && isRecentlyPlayed.value;
});
</script>

<template>
  <section v-if="trackData" class="w-full">
    <div class="mb-8">
      <h2 class="mb-2 text-sm font-semibold tracking-wider text-jade-11 uppercase dark:text-jadedark-11">
        {{ shouldShowNowPlaying ? '🎵 NOW PLAYING' : '🎵 LAST PLAYED' }}
      </h2>
    </div>

    <div class="relative overflow-hidden rounded-lg border-l-4 border-red-9 bg-gradient-to-br from-red-2 to-red-3 p-6 dark:border-reddark-9 dark:from-reddark-1 dark:to-reddark-2">
      <div class="flex items-center gap-5">
        <div class="relative">
          <img
            v-if="trackData.albumArt"
            :src="trackData.albumArt"
            :alt="`${trackData.album} album art`"
            class="h-24 w-24 flex-shrink-0 rounded-md"
          />
          <Icon v-else name="lucide:music" class="h-24 w-24 flex-shrink-0 text-red-11 dark:text-reddark-11" />
          <div
            v-if="shouldShowNowPlaying"
            class="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-red-9 dark:bg-reddark-9"
          >
            <EqualizerIcon class="h-4 w-4 text-red-1 dark:text-reddark-1" />
          </div>
        </div>

        <div class="flex-1 min-w-0">
          <div class="truncate text-lg font-bold text-red-12 dark:text-reddark-12">{{ trackData.name }}</div>
          <div class="truncate text-sm font-medium text-red-11 dark:text-reddark-11">{{ trackData.artist }}</div>
          <div v-if="trackData.album" class="mt-1 truncate text-xs text-red-10 dark:text-reddark-10">
            {{ trackData.album }}
          </div>
        </div>
      </div>

      <div class="mt-6 flex items-center justify-between border-t border-red-6 pt-4 dark:border-reddark-6">
        <p class="text-xs text-red-11 dark:text-reddark-11">Updates automatically via Last.fm</p>
        <a
          href="https://www.last.fm/user/YOUR_USERNAME"
          target="_blank"
          rel="noopener noreferrer"
          class="text-xs font-medium text-red-11 underline decoration-red-9 underline-offset-2 transition-colors hover:text-red-12 dark:text-reddark-11 dark:decoration-reddark-9 dark:hover:text-reddark-12"
        >
          View on Last.fm →
        </a>
      </div>
    </div>
  </section>
</template>
