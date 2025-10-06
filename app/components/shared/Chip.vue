<script setup lang="ts">
defineProps<{
  label: string
}>()
</script>

<template>
  <span class="inline-flex items-center px-3 py-1 text-sm font-medium rounded-full bg-gray-3 text-gray-12 whitespace-nowrap">
    {{ label }}
  </span>
</template>
