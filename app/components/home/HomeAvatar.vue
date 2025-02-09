<script setup lang="ts">
import { rand, useIntervalFn } from '@vueuse/core';
import { randomInt } from 'es-toolkit';

const circleCount = 4;

// each circle will have a border-radius value set as "N% N% N% N% / N% N% N% N%" where each N is a noise around 100% of 10%
// i.e 30% 70% 70% 30% / 30% 30% 70% 70%
// try make it DRY
function generateBorder() {
  const nums = Array(8)
    .fill(0)
    .map((_, id) => randomInt(30, 80) + id + '%');
  return nums.slice(0, 4).join(' ') + ' / ' + nums.slice(4).join(' ');
}

// where n is noised around 100%
const generateRadii = () => {
  return Array(circleCount)
    .fill(0)
    .map(() => generateBorder());
};
const radii = ref<string[]>(generateRadii());

useIntervalFn(() => {
  radii.value = generateRadii();
}, 500);

const circleStyles = computed(() => {
  const styles: Record<string, string> = {};
  for (const [index, radius] of radii.value.entries()) {
    styles[`--circle-${index + 1}`] = radius;
  }
  return styles;
});
</script>
<template>
  <div class="group relative" :style="circleStyles">
    <div
      class="absolute inset-0 rotate-45 rounded-[var(--circle-1)] bg-amber-9 mix-blend-multiply transition-all duration-3000 ease-in group-hover:scale-105 dark:mix-blend-screen"
    ></div>
    <div
      class="absolute inset-0 rotate-90 rounded-[var(--circle-2)] bg-blue-9 mix-blend-multiply transition-all duration-3000 ease-in group-hover:scale-105 dark:mix-blend-screen"
    ></div>
    <div
      class="absolute inset-0 rotate-135 rounded-[var(--circle-3)] bg-red-9 mix-blend-multiply transition-all duration-3000 ease-in group-hover:scale-105 dark:mix-blend-screen"
    ></div>
    <div
      class="absolute inset-0 rounded-[var(--circle-4)] bg-crimson-9 mix-blend-multiply transition-all duration-3000 ease-in group-hover:scale-105 dark:mix-blend-screen"
    ></div>
    <img
      src="https://placeholdr.ai/a7ba6ed0-2002-4707-aa8c-b0b137e78433/256/256"
      alt="Avatar"
      class="absolute inset-0 size-full rounded-full"
    />
  </div>
</template>
