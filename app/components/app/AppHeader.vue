<script lang="ts" setup>
const navItems = [
  { title: 'Home', to: '/' },
  { title: 'Posts', to: '/posts' },
];

const socialLinks = [
  { title: 'Github', href: 'https://github.com/seanogdev', icon: 'simple-icons:github' },
  {
    title: 'Bluesky',
    href: 'https://bsky.app/profile/seanogrady.me',
    icon: 'simple-icons:bluesky',
  },
  {
    title: 'LinkedIn',
    href: 'https://www.linkedin.com/in/seanogdev/',
    icon: 'simple-icons:linkedin',
  },
];

const colorMode = useColorMode();
const isDark = computed(() => colorMode.value === 'dark');
function toggleDark() {
  colorMode.preference = isDark.value ? 'light' : 'dark';
}
</script>
<template>
  <header class="flex items-center justify-between py-6">
    <nav>
      <ul class="flex items-center gap-4">
        <li v-for="item in navItems" :key="item.to">
          <NuxtLink
            :to="item.to"
            class="text-xs font-medium tracking-widest text-jade-12 uppercase dark:text-jadedark-12"
          >
            {{ item.title }}
          </NuxtLink>
        </li>
      </ul>
    </nav>

    <div class="flex items-center gap-8">
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
    </div>

    <!-- <AppSearch /> -->
  </header>
</template>
