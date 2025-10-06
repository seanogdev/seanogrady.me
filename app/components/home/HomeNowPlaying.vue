<script setup lang="ts">
import type { TrackData } from '~/shared/types';

const { data: trackData } = await useFetch<TrackData>('/api/lastfm');
</script>

<template>
  <section v-if="trackData" class="w-full">
    <div class="mb-8">
      <h2 class="mb-2 text-sm font-semibold tracking-wider text-jade-11 uppercase dark:text-jadedark-11">
        {{ trackData.nowPlaying ? '🎵 NOW PLAYING' : '🎵 LAST PLAYED' }}
      </h2>
    </div>

    <div class="flex items-center gap-4 rounded-lg bg-jade-3 p-4 dark:bg-jadedark-1">
      <img
        v-if="trackData.albumArt"
        :src="trackData.albumArt"
        :alt="`${trackData.album} album art`"
        class="h-16 w-16 flex-shrink-0 rounded"
      />
      <Icon v-else name="lucide:music" class="h-16 w-16 flex-shrink-0 text-jade-11 dark:text-jadedark-11" />

      <div class="flex-1">
        <div class="font-bold text-jade-12 dark:text-jadedark-12">{{ trackData.name }}</div>
        <div class="text-sm text-jade-11 dark:text-jadedark-11">{{ trackData.artist }}</div>
        <div v-if="trackData.album" class="text-xs text-jade-10 dark:text-jadedark-10">{{ trackData.album }}</div>
      </div>

      <EqualizerIcon v-if="trackData.nowPlaying" class="h-6 w-6 flex-shrink-0 text-jade-11 dark:text-jadedark-11" />
    </div>

    <div class="mt-4 flex items-center justify-between text-sm text-jade-11 dark:text-jadedark-11">
      <p>Updates automatically via Last.fm</p>
      <a
        href="https://www.last.fm/user/YOUR_USERNAME"
        target="_blank"
        rel="noopener noreferrer"
        class="hover:text-jade-12 dark:hover:text-jadedark-12 underline"
      >
        View on Last.fm
      </a>
    </div>
  </section>
</template>
