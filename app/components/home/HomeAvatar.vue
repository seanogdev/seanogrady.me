<script setup lang="ts">
import { useIntervalFn } from '@vueuse/core';
import { randomInt, sample } from 'es-toolkit';

const circleCount = 5;
const backgroundOptions = ['bg-amber-9', 'bg-blue-9', 'bg-red-9', 'bg-crimson-9', 'bg-mint-9', 'bg-sky-9', 'bg-iris-9'];

const squircles = Array(circleCount)
  .fill(0)
  .map((_, i) => ({
    class: [sample(backgroundOptions)],
    style: {
      '--rotation': randomInt(0, 360) + 'deg',
      '--border': 'var(--border' + i + ')',
    },
  }));

function generateBorder() {
  const nums = Array(8)
    .fill(0)
    .map((_, id) => randomInt(30, 80) + id + '%');
  return nums.slice(0, 4).join(' ') + ' / ' + nums.slice(4).join(' ');
}

function generateBorders() {
  return Array(circleCount).fill(0).map(generateBorder);
}
const squircleBorders = ref(generateBorders());
useIntervalFn(regenerateBorders, 5000);

function regenerateBorders() {
  squircleBorders.value = generateBorders();
}

const squircleBorderStyles = computed(() =>
  squircleBorders.value.map((border, i) => ({
    ['--border' + i]: border,
  })),
);
</script>
<template>
  <div class="group relative" role="button" :style="squircleBorderStyles" @click="regenerateBorders">
    <div
      v-for="(squircle, index) in squircles"
      :key="index"
      class="absolute inset-0 rotate-[var(--rotation)] rounded-[var(--border)] mix-blend-multiply transition-all duration-3000 ease-in group-hover:scale-105 dark:mix-blend-screen"
      :class="squircle.class"
      :style="squircle.style"
    />

    <img
      src="./HomeAvatar.jpg"
      alt="Avatar"
      class="absolute inset-0 size-full rounded-full mix-blend-screen dark:mix-blend-normal"
    />
  </div>
</template>
