<template>
  <div class="grid auto-rows-auto">
    <AppHeader />
    <div class="mx-auto my-16 grid w-full max-w-6xl min-w-0 grid-cols-12 gap-4 px-4 md:gap-8 lg:gap-12">
      <slot />
      <AppFooter />
    </div>
  </div>
</template>
