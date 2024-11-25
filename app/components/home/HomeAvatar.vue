<script setup lang="ts">
const borderRadii = [
  '30% 70% 70% 30% / 30% 30% 70% 70%',
  '120% 30% 70% 130% / 30% 120% 130% 70%',
  '70% 130% 30% 120% / 130% 70% 30% 120%',
  '130% 70% 30% 120% / 70% 130% 120% 30%',
];

function randomiseCircleStyles() {
  const randomIndex = Math.floor(Math.random() * borderRadii.length);
  return {
    '--circle-1': borderRadii[randomIndex],
    '--circle-2': borderRadii[(randomIndex + 1) % borderRadii.length],
    '--circle-3': borderRadii[(randomIndex + 2) % borderRadii.length],
    '--circle-4': borderRadii[(randomIndex + 3) % borderRadii.length],
  };
}

const circleStyles = shallowRef(randomiseCircleStyles());
let intervalId;
onMounted(() => {
  intervalId = setInterval(() => {
    circleStyles.value = randomiseCircleStyles();
  }, 200);
});

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId);
  }
});
</script>
<template>
  <div class="relative" :style="circleStyles">
    <div
      class="absolute inset-0 rounded-[var(--circle-1)] bg-amber-10 mix-blend-screen transition-all duration-2000"
    ></div>
    <div
      class="absolute inset-0 rounded-[var(--circle-2)] bg-blue-10 mix-blend-screen transition-all duration-2000"
    ></div>
    <div
      class="absolute inset-0 rounded-[var(--circle-3)] bg-red-10 mix-blend-screen transition-all duration-2000"
    ></div>
    <div
      class="absolute inset-0 rounded-[var(--circle-4)] bg-purple-10 mix-blend-screen transition-all duration-2000"
    ></div>
    <img src="https://placekitten.com/200/200" alt="Avatar" class="absolute inset-0 size-full rounded-full" />
  </div>
</template>
