<script setup lang="ts">
interface SocialLink {
  title: string;
  subtitle: string;
  url: string;
  icon: string;
}

const socialLinks: SocialLink[] = [
  {
    title: 'BlueSky',
    subtitle: '@seanogrady.me',
    url: 'https://bsky.app/profile/seanogrady.me',
    icon: 'proicons:bluesky',
  },
  {
    title: 'GitHub',
    subtitle: 'Open source projects',
    url: 'https://github.com/seanogdev',
    icon: 'proicons:github',
  },
  {
    title: 'LinkedIn',
    subtitle: 'Professional network',
    url: 'https://linkedin.com/in/seanogdev/',
    icon: 'mdi:linkedin',
  },
];
</script>

<template>
  <section class="flex h-full w-full flex-col gap-4">
    <h2 class="text-sm font-medium tracking-widest text-balance text-sage-10 uppercase dark:text-sagedark-10">
      Find me online
    </h2>

    <div class="flex flex-col gap-2">
      <a
        v-for="link in socialLinks"
        :key="link.url"
        :href="link.url"
        target="_blank"
        rel="noopener noreferrer"
        :aria-label="`Visit my ${link.title} profile`"
        class="text-sage-11 transition-colors hover:text-jade-11 focus-visible:ring-2 focus-visible:ring-jade-8 focus-visible:outline-none dark:text-sagedark-11 dark:hover:text-jadedark-11"
      >
        {{ link.title }}
      </a>
    </div>
  </section>
</template>
