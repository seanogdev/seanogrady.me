<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui';

withDefaults(defineProps<PrimitiveProps>(), {
  as: 'span',
});
</script>

<template>
  <Primitive
    :as="as"
    :asChild="asChild"
    class="inline-flex items-center rounded-full bg-jade-3 px-3 py-1 text-sm leading-relaxed font-medium text-jade-12 ring-1 ring-jade-6 transition-colors hover:bg-jade-4 dark:bg-jadedark-3 dark:text-jadedark-12 dark:ring-jadedark-6 dark:hover:bg-jadedark-4"
  >
    <slot />
  </Primitive>
</template>
