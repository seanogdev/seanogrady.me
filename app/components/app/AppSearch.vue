<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core';
import Fuse from 'fuse.js';
const search = useLocalStorage('search', '');
const { data } = await useAsyncData('search-sections', () => {
  return queryCollectionSearchSections('blog');
});

const fuse = new Fuse(unref(data), {
  keys: ['title', 'description'],
});

const result = computed(() => fuse.search(search.value).slice(0, 10));
const open = ref(false);
</script>

<template>
  <DialogRoot v-model:open="open">
    <DialogTrigger>
      <button class="rounded-md bg-mint-action p-2">Search</button>
    </DialogTrigger>
    <DialogPortal>
      <DialogOverlay
        class="fixed inset-0 z-50 bg-mint-11/80 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0"
      />
      <DialogContent
        class="fixed top-1/2 left-1/2 z-50 grid w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 border bg-blue-ui shadow-lg duration-200 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] data-[state=open]:zoom-in-95 sm:rounded-lg"
      >
        <DialogClose
          class="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:pointer-events-none"
        >
          X
          <span class="sr-only">Close</span>
        </DialogClose>
        <ComboboxRoot>
          <ComboboxInput autoFocus v-model="search" class="h-12 w-full px-6" placeholder="Search" />
          <ComboboxContent class="px-6">
            <div role="presentation" class="flex flex-col items-stretch gap-2">
              <ComboboxItem
                asChild
                v-for="link of result"
                :key="link.item.id"
                :textValue="link.item.title"
                :value="link.item.id"
                class="px-2 py-1 data-[highlighted]:bg-blue-action"
                @select.prevent
              >
                <NuxtLink :to="link.item.id" @click.stop="open = false">
                  {{ link.item.title }}
                  <ComboboxItemIndicator />
                </NuxtLink>
              </ComboboxItem>
            </div>
            <ComboboxEmpty>No results found for "{{ search }}"</ComboboxEmpty>
          </ComboboxContent>
        </ComboboxRoot>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
