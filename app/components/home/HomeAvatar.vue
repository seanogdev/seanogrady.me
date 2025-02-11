<script setup lang="ts">
import { useIntervalFn } from '@vueuse/core';
import { randomInt, sample } from 'es-toolkit';

const circleCount = 5;
const backgroundOptions = ['bg-amber-9', 'bg-blue-9', 'bg-red-9', 'bg-crimson-9', 'bg-mint-9', 'bg-sky-9', 'bg-iris-9'];

function generateBorder() {
  const nums = Array(8)
    .fill(0)
    .map((_, id) => randomInt(30, 80) + id + '%');
  return nums.slice(0, 4).join(' ') + ' / ' + nums.slice(4).join(' ');
}

// where n is noised around 100%
function generateSquircle() {
  return Array(circleCount)
    .fill(0)
    .map(() => ({
      class: [sample(backgroundOptions)],
      style: { '--border': generateBorder() },
    }));
}
const squircle = ref(generateSquircle());

useIntervalFn(() => {
  squircle.value = generateSquircle();
}, 5000);
</script>
<template>
  <div class="group relative">
    <div
      v-for="(squircle, index) in squircle"
      :key="index"
      class="dark:mix-blend-scren absolute inset-0 rotate-45 rounded-[var(--border)] mix-blend-multiply transition-all duration-3000 ease-in group-hover:scale-105"
      :class="squircle.class"
      :style="squircle.style"
    ></div>

    <img src="./HomeAvatar.jpg" alt="Avatar" class="absolute inset-0 size-full rounded-full mix-blend-screen" />
  </div>
</template>
