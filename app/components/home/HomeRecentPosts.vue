<script setup lang="ts">
const { data: posts } = await useAsyncData('recent-posts', () =>
  queryCollection('posts')
    .order('date', 'DESC')
    .limit(5)
    .all()
)

const formatDate = (date: string | Date) => {
  const d = new Date(date)
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: '2-digit' })
}
</script>

<template>
  <section class="col-span-12 mt-16 md:col-span-10 md:col-start-2">
    <div class="mb-8">
      <h2 class="text-sm font-semibold tracking-wider text-gray-11 uppercase mb-2">RECENT WRITING</h2>
      <p class="text-gray-11">Thoughts on frontend development, design systems, and accessibility</p>
    </div>

    <div class="flex flex-col gap-6">
      <article
        v-for="post in posts"
        :key="post.path"
        class="group rounded-lg border border-gray-6 bg-gray-1 p-6 transition-shadow hover:shadow-lg"
      >
        <div class="mb-3 flex items-center gap-3 text-sm text-gray-11">
          <time :datetime="post.date">{{ formatDate(post.date) }}</time>
          <span>•</span>
          <span>{{ readTime(post.rawbody || '') }}</span>
        </div>

        <NuxtLink :to="post.path" class="block">
          <h3 class="mb-2 text-xl font-semibold text-gray-12 group-hover:text-blue-11 transition-colors">
            {{ post.title }}
          </h3>
        </NuxtLink>

        <p class="mb-4 text-gray-11 leading-relaxed">{{ post.description }}</p>

        <div class="mb-4 flex flex-wrap gap-2">
          <Chip v-for="tag in post.tags" :key="tag" :label="tag" />
        </div>

        <NuxtLink
          :to="post.path"
          class="inline-flex items-center text-sm font-medium text-blue-11 hover:text-blue-12 transition-colors"
        >
          Read article →
        </NuxtLink>
      </article>
    </div>

    <div class="mt-8 text-center">
      <NuxtLink
        to="/posts"
        class="inline-flex items-center text-sm font-medium text-blue-11 hover:text-blue-12 transition-colors"
      >
        View all articles →
      </NuxtLink>
    </div>
  </section>
</template>
