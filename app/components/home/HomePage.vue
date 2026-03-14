<template>
  <ClientOnly>
    <HomeAvatar
      class="col-span-6 col-start-4 mx-auto aspect-square w-full max-w-64 md:col-span-3 md:col-start-1 md:max-w-none"
    />
    <div class="col-span-12 grid auto-rows-auto content-start gap-8 md:col-span-9">
      <div class="relative">
        <h1
          class="animate-[fadeInUp_0.8s_cubic-bezier(0.16,1,0.3,1)_forwards] font-serif text-[clamp(3rem,10vw,5.5rem)] leading-[0.9] font-light tracking-tighter text-balance text-jade-12 opacity-0 dark:text-jadedark-12"
        >
          I build
          <span class="italic">interfaces</span>
          that
          <span class="italic">work</span>
        </h1>
      </div>

      <div class="animate-[fadeInUp_0.8s_cubic-bezier(0.16,1,0.3,1)_0.5s_forwards] space-y-5 opacity-0">
        <p class="text-xl leading-relaxed text-pretty text-jade-12 md:text-2xl dark:text-jadedark-12">
          Hey, I'm Seán — a front-end engineer who's spent the last decade making software that's
          <span class="font-serif italic">simple</span>
          ,
          <span class="font-serif italic">accessible</span>
          , and
          <span class="font-serif italic">delightful</span>
          to use.
        </p>
      </div>
    </div>
    <HomeRecentPosts class="col-span-full animate-[fadeInUp_0.8s_cubic-bezier(0.16,1,0.3,1)_0.7s_forwards] opacity-0" />
  </ClientOnly>
</template>
