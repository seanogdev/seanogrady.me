<script setup lang="ts">
import { randomInt, sample } from 'es-toolkit';

const circleCount = 5;
const backgroundOptions = ['bg-amber-9', 'bg-blue-9', 'bg-red-9', 'bg-crimson-9', 'bg-mint-9', 'bg-sky-9', 'bg-iris-9'];

const squircles = Array(circleCount)
  .fill(0)
  .map(() => ({
    class: [sample(backgroundOptions)],
    style: {
      '--animation-duration': randomInt(8, 15) + 's',
      '--animation-delay': -(randomInt(0, 10)) + 's',
      '--rotation-speed': randomInt(20, 40) + 's',
      '--rotation-direction': randomInt(0, 1) ? 'normal' : 'reverse',
    },
  }));

</script>
<template>
  <div class="group relative">
    <div
      v-for="(squircle, index) in squircles"
      :key="index"
      class="squircle absolute inset-0 mix-blend-multiply transition-transform duration-300 ease-out group-hover:scale-105 dark:mix-blend-screen animate-[squircle-morph_var(--animation-duration)_ease-in-out_infinite_var(--animation-delay),squircle-rotate_var(--rotation-speed)_linear_infinite_var(--rotation-direction)]"
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
