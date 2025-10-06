<template>
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="equalizer">
    <rect x="4" y="8" width="3" height="8" rx="1.5" fill="currentColor" class="bar bar-1" />
    <rect x="10.5" y="4" width="3" height="16" rx="1.5" fill="currentColor" class="bar bar-2" />
    <rect x="17" y="6" width="3" height="12" rx="1.5" fill="currentColor" class="bar bar-3" />
  </svg>
</template>

<style scoped>
.equalizer {
  display: inline-block;
}

.bar {
  animation-duration: 1.2s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
  transform-origin: center;
}

.bar-1 {
  animation-name: bounce-1;
}

.bar-2 {
  animation-name: bounce-2;
  animation-delay: 0.2s;
}

.bar-3 {
  animation-name: bounce-3;
  animation-delay: 0.4s;
}

@keyframes bounce-1 {
  0%,
  100% {
    transform: scaleY(1);
  }
  50% {
    transform: scaleY(0.6);
  }
}

@keyframes bounce-2 {
  0%,
  100% {
    transform: scaleY(1);
  }
  50% {
    transform: scaleY(0.4);
  }
}

@keyframes bounce-3 {
  0%,
  100% {
    transform: scaleY(1);
  }
  50% {
    transform: scaleY(0.7);
  }
}
</style>
