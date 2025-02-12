<script lang="ts" setup>
import { useDark, useToggle } from '@vueuse/core';

const navItems = [{ title: 'Posts', to: '/posts' }];

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
    class="sticky top-0 z-10 border-b border-jade-12 bg-mint-1/60 py-4 backdrop-blur-lg dark:border-jade-1 dark:bg-mintdark-1/60"
  >
    <div class="flex items-center gap-8 px-4">
      <nav>
        <ul class="flex items-center gap-4">
          <li v-for="item in navItems" :key="item.to">
            <NuxtLink
              :to="item.to"
              class="text-xs tracking-widest text-jade-12 uppercase font-stretch-125% dark:text-jadedark-12"
            >
              {{ item.title }}
            </NuxtLink>
          </li>
        </ul>
      </nav>
      <div class="flex-1" />

      <NuxtLink to="/" class="min-w-0 text-lg font-semibold text-nowrap">Seán O'Grady</NuxtLink>

      <div class="flex-1" />
      <ul class="flex items-center gap-4">
        <li v-for="link in socialLinks" :key="link.title">
          <NuxtLink
            :to="link.href"
            external
            :title="link.title"
            class="text-jade-11 dark:text-jadedark-11"
            target="_blank"
          >
            <Icon :name="link.icon" class="size-5" />
          </NuxtLink>
        </li>
      </ul>
      <button
        type="button"
        aria-label="Toggle Dark Mode"
        class="text-jade-12 dark:text-jadedark-12"
        @click="toggleDark()"
      >
        <Icon :name="isDark ? 'bi:moon-fill' : 'bi:moon'" class="size-5" />
      </button>

      <!-- <AppSearch /> -->
    </div>
  </header>
</template>
