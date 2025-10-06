<script setup lang="ts">
interface SocialLink {
  title: string
  subtitle: string
  url: string
  icon: string
}

const socialLinks: SocialLink[] = [
  {
    title: 'BlueSky',
    subtitle: '@seanogrady.me',
    url: 'https://bsky.app/profile/seanogrady.me',
    icon: 'lucide:cloud'
  },
  {
    title: 'GitHub',
    subtitle: 'Open source projects',
    url: 'https://github.com/seanogrady',
    icon: 'lucide:github'
  }
]
</script>

<template>
  <section class="w-full">
    <div class="mb-8">
      <h2 class="text-sm font-semibold tracking-wider text-gray-11 dark:text-graydark-11 uppercase mb-2">FIND ME ONLINE</h2>
    </div>

    <div class="flex flex-col gap-4">
      <a
        v-for="link in socialLinks"
        :key="link.url"
        :href="link.url"
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center gap-4 rounded-lg bg-gray-3 p-4 transition-shadow hover:shadow-md dark:bg-graydark-3 dark:hover:shadow-lg"
      >
        <Icon :name="link.icon" class="h-6 w-6 flex-shrink-0 text-gray-11 dark:text-graydark-11" />

        <div class="flex-1">
          <div class="font-semibold text-gray-12 dark:text-graydark-12">{{ link.title }}</div>
          <div class="text-sm text-gray-11 dark:text-graydark-11">{{ link.subtitle }}</div>
        </div>

        <Icon v-if="link.title === 'GitHub'" name="lucide:external-link" class="h-4 w-4 flex-shrink-0 text-gray-11 dark:text-graydark-11" />
      </a>
    </div>
  </section>
</template>
