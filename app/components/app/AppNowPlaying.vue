<script setup lang="ts">
import type { TrackData } from '~~/shared/types';

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

const relativeTime = computed(() => {
  if (!trackData.value) return '';

  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
  const now = Date.now();
  const diff = now - trackData.value.timestamp;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return rtf.format(-days, 'day');
  if (hours > 0) return rtf.format(-hours, 'hour');
  if (minutes > 0) return rtf.format(-minutes, 'minute');
  return rtf.format(0, 'second');
});
</script>

<template>
  <section v-if="trackData" class="flex h-full w-full flex-col gap-4">
    <div class="flex items-center justify-between">
      <h2 class="text-sm font-semibold tracking-wider text-red-11 uppercase dark:text-reddark-11">
        {{ shouldShowNowPlaying ? 'Now playing' : 'Last played' }}
      </h2>
      <div class="flex items-center gap-2">
        <EqualizerIcon class="h-4 w-4 text-red-11 dark:text-reddark-11" />
        <span class="text-xs text-red-11 dark:text-reddark-11">{{ relativeTime }}</span>
      </div>
    </div>

    <div
      class="relative flex flex-1 flex-col justify-between overflow-hidden rounded-lg border-l-4 border-red-9 bg-gradient-to-br from-red-2 to-red-3 p-6 dark:border-reddark-9 dark:from-reddark-1 dark:to-reddark-2"
    >
      <div class="flex gap-5">
        <div class="relative flex-shrink-0">
          <img
            v-if="trackData.albumArt"
            :src="trackData.albumArt"
            :alt="`${trackData.album} album art`"
            class="h-32 w-32 rounded-md"
          />
          <Icon v-else name="lucide:music" class="h-32 w-32 text-red-11 dark:text-reddark-11" />
        </div>

        <div class="min-w-0 flex-1">
          <div class="text-xl leading-tight font-bold text-red-12 dark:text-reddark-12">{{ trackData.name }}</div>
          <div class="mt-2 text-base font-medium text-red-11 dark:text-reddark-11">{{ trackData.artist }}</div>
          <div v-if="trackData.album" class="mt-1 text-sm text-red-10 dark:text-reddark-10">
            {{ trackData.album }}
          </div>
        </div>
      </div>

      <div class="mt-6 flex items-center justify-between border-t border-red-6 pt-4 dark:border-reddark-6">
        <p class="text-xs text-red-11 dark:text-reddark-11">Updates automatically via Last.fm</p>
        <a
          :href="`https://www.last.fm/user/${$config.lastfmUsername}`"
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
