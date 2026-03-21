<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { DateTime } from 'luxon';
import type { TrackData } from '../types';

const trackData = ref<TrackData | null>(null);

onMounted(async () => {
  try {
    const res = await fetch('/api/lastfm');
    if (res.ok) {
      trackData.value = await res.json();
    }
  } catch {
    // Silently fail — footer just won't show now playing
  }
});

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
  <div>
  <section v-if="trackData" class="flex h-full w-full flex-col gap-4">
    <div class="mb-4 flex items-center justify-between">
      <h2 class="text-sm font-medium tracking-widest text-balance text-sage-10 uppercase dark:text-sagedark-10">
        {{ shouldShowNowPlaying ? 'Now playing' : 'Last played' }}
      </h2>
      <div class="flex items-center gap-2">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="equalizer h-4 w-4 text-sage-10 dark:text-sagedark-10">
          <rect x="4" y="8" width="3" height="8" rx="1.5" fill="currentColor" class="bar bar-1" />
          <rect x="10.5" y="4" width="3" height="16" rx="1.5" fill="currentColor" class="bar bar-2" />
          <rect x="17" y="6" width="3" height="12" rx="1.5" fill="currentColor" class="bar bar-3" />
        </svg>
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
        <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-32 w-32 text-sage-10 dark:text-sagedark-10">
          <path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" />
        </svg>
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
  </div>
</template>

<style scoped>
.bar {
  animation-duration: 1.2s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
  transform-origin: center;
}

.bar-1 {
  animation-name: bounce-1;
}

.bar-2 {
  animation-name: bounce-2;
  animation-delay: 0.2s;
}

.bar-3 {
  animation-name: bounce-3;
  animation-delay: 0.4s;
}

@keyframes bounce-1 {
  0%,
  100% {
    transform: scaleY(1);
  }
  50% {
    transform: scaleY(0.6);
  }
}

@keyframes bounce-2 {
  0%,
  100% {
    transform: scaleY(1);
  }
  50% {
    transform: scaleY(0.4);
  }
}

@keyframes bounce-3 {
  0%,
  100% {
    transform: scaleY(1);
  }
  50% {
    transform: scaleY(0.7);
  }
}
</style>
