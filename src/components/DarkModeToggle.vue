<script setup lang="ts">
import { ref, onMounted } from 'vue';

const isDark = ref(false);

onMounted(() => {
  isDark.value = document.documentElement.classList.contains('dark');
});

function toggle() {
  isDark.value = !isDark.value;
  document.documentElement.classList.toggle('dark', isDark.value);
  localStorage.theme = isDark.value ? 'dark' : 'light';
}
</script>

<template>
  <button
    type="button"
    aria-label="Toggle Dark Mode"
    class="text-jade-12 dark:text-jadedark-12"
    @click="toggle"
  >
    <slot name="light-icon" />
    <slot name="dark-icon" />
  </button>
</template>
