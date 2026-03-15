<script setup lang="ts">
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - Seán O'Grady` : "Seán O'Grady - Cyber surgeon, Javascript Person";
  },
});

useSeoMeta({
  author: "Seán O'Grady",
  ogSiteName: "Seán O'Grady",
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
