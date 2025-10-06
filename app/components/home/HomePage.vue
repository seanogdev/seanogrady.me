<script setup lang="ts"></script>
<template>
  <ClientOnly>
    <HomeAvatar class="col-span-4 col-start-5 mt-4 aspect-square md:col-span-3 md:col-start-2" />
    <div class="col-span-8 col-start-3 grid auto-rows-auto content-start gap-4 text-xl md:col-span-7">
      <h1 class="text-balance">Hey I'm Sean 👋</h1>
      <p class="text-pretty">
        I'm a Frontend Developer with over a decade of experience, with a focus on making simple software, experiences
        that are accessible, and tooling that automates the boring stuff.
      </p>
    </div>
    <HomeRecentPosts class="col-span-12 md:col-span-10 md:col-start-2" />
    <div class="col-span-12 mt-16 grid gap-8 md:col-span-10 md:col-start-2 md:grid-cols-2">
      <HomeSocialLinks class="w-full" />
      <HomeNowPlaying class="w-full" />
    </div>
  </ClientOnly>
</template>
