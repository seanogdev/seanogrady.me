<script lang="ts" setup>
import { useDark, useToggle } from '@vueuse/core';

const navItems = [
  { title: 'Posts', to: '/posts' },
  { title: 'About', to: '/about' },
];

const socialLinks = [
  { title: 'Github', href: 'https://github.com/seanogdev', icon: 'simple-icons:github' },
  { title: 'Bluesky', href: 'https://bsky.app/profile/seanogrady.me', icon: 'simple-icons:bluesky' },
  { title: 'LinkedIn', href: 'https://www.linkedin.com/in/seanogdev/', icon: 'simple-icons:linkedin' },
];

const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>
<template>
  <header
    class="border-green-12 bg-mint-1/80 dark:border-green-1 dark:bg-mintdark-1/80 sticky top-0 z-10 border-b py-4 backdrop-blur-lg"
  >
    <div class="container mx-auto flex items-center gap-8 px-4">
      <nav>
        <ul class="flex items-center gap-4">
          <li v-for="item in navItems" :key="item.to">
            <NuxtLink
              :to="item.to"
              class="text-green-12 dark:text-greendark-12 font-stretch-125% text-xs uppercase tracking-widest"
            >
              {{ item.title }}
            </NuxtLink>
          </li>
        </ul>
      </nav>
      <div class="flex-1" />

      <NuxtLink to="/" class="text-lg font-semibold">Seán O'Grady</NuxtLink>

      <div class="flex-1" />
      <ul class="flex items-center gap-4">
        <li v-for="link in socialLinks" :key="link.title">
          <NuxtLink
            :to="link.href"
            external
            :title="link.title"
            class="text-green-11 dark:text-greendark-11"
            target="_blank"
          >
            <Icon :name="link.icon" class="size-5" />
          </NuxtLink>
        </li>
      </ul>
      <button
        type="button"
        @click="toggleDark()"
        aria-label="Toggle Dark Mode"
        class="text-green-12 dark:text-greendark-12"
      >
        <Icon :name="isDark ? 'bi:moon-fill' : 'bi:moon'" class="size-5" />
      </button>

      <!-- <AppSearch /> -->
    </div>
  </header>
</template>
