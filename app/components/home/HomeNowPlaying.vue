<script setup lang="ts">
interface MusicData {
  title: string
  artist: string
}

const nowPlaying: MusicData = {
  title: 'Nomad',
  artist: 'Clairo'
}
</script>

<template>
  <section class="w-full">
    <div class="mb-8">
      <h2 class="text-sm font-semibold tracking-wider text-gray-11 dark:text-graydark-11 uppercase mb-2">🎵 LAST PLAYED</h2>
    </div>

    <div class="flex items-center gap-4 rounded-lg bg-gray-3 p-4 dark:bg-graydark-3">
      <Icon name="lucide:music" class="h-6 w-6 flex-shrink-0 text-gray-11 dark:text-graydark-11" />

      <div class="flex-1">
        <div class="font-bold text-gray-12 dark:text-graydark-12">{{ nowPlaying.title }}</div>
        <div class="text-sm text-gray-11 dark:text-graydark-11">{{ nowPlaying.artist }}</div>
      </div>
    </div>

    <p class="mt-4 text-sm text-gray-11 dark:text-graydark-11">Updates automatically via Last.fm or Spotify</p>
  </section>
</template>
