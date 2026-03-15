<script setup lang="ts">
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - Sean O'Grady` : "Sean O'Grady - Cyber surgeon, Javascript Person";
  },
});

useSeoMeta({
  ogSiteName: "Sean O'Grady",
  twitterCard: 'summary',
});
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
