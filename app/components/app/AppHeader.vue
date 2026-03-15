<script lang="ts" setup>
const colorMode = useColorMode();
const isDark = computed(() => colorMode.value === 'dark');
function toggleDark() {
  colorMode.preference = isDark.value ? 'light' : 'dark';
}
</script>
<template>
  <header class="flex items-center justify-between py-6">
    <NuxtLink to="/" class="text-xs font-medium tracking-widest text-jade-12 uppercase dark:text-jadedark-12">
      Seán O'Grady
    </NuxtLink>

    <div class="flex items-center gap-6">
      <NuxtLink to="/posts" class="text-xs font-medium tracking-widest text-jade-12 uppercase dark:text-jadedark-12">
        Posts
      </NuxtLink>
      <button
        type="button"
        aria-label="Toggle Dark Mode"
        class="text-jade-12 dark:text-jadedark-12"
        @click="toggleDark()"
      >
        <Icon :name="isDark ? 'bi:moon-fill' : 'bi:moon'" class="size-5" />
      </button>
    </div>
  </header>
</template>
