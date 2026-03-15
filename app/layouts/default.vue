<template>
  <div class="relative grid auto-rows-auto">
    <div
      class="pointer-events-none absolute inset-x-0 top-0 h-[80vh] bg-linear-to-b from-jade-3 to-transparent dark:from-jadedark-2 dark:to-transparent"
      aria-hidden="true"
    />
    <div class="relative mx-auto mt-0 mb-0 grid w-full max-w-6xl min-w-0 grid-cols-12 gap-4 px-4 md:gap-8 lg:gap-12">
      <AppHeader class="col-span-12 md:col-span-8 md:col-start-3" />
      <slot />
    </div>
    <AppFooter />
  </div>
</template>
