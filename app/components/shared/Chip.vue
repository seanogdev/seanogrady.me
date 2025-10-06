<script setup lang="ts">
defineProps<{
  label: string
}>()
</script>

<template>
  <span class="inline-flex items-center rounded-md bg-gray-3 px-2.5 py-0.5 text-xs font-medium text-gray-11 dark:bg-graydark-3 dark:text-graydark-11">
    {{ label }}
  </span>
</template>
