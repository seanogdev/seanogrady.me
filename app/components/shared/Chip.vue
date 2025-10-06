<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
defineProps<{
  label: string;
}>();
</script>

<template>
  <span
    class="inline-flex items-center rounded-full bg-jade-3 px-3 py-1 text-sm font-medium leading-relaxed text-jade-12 ring-1 ring-jade-6 transition-colors hover:bg-jade-4 dark:bg-jadedark-3 dark:text-jadedark-12 dark:ring-jadedark-6 dark:hover:bg-jadedark-4"
  >
    {{ label }}
  </span>
</template>
