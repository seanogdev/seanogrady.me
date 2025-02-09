<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core';
import Fuse from 'fuse.js';
const search = useLocalStorage('search', '');
const { data } = await useAsyncData('search-sections', () => {
  return queryCollectionSearchSections('posts');
});

const fuse = new Fuse(data.value ?? [], {
  keys: ['title', 'description'],
});

const result = computed(() => fuse.search(search.value).slice(0, 10));
const open = ref(false);
</script>

<template>
  <DialogRoot v-model:open="open">
    <DialogTrigger>
      <button class="bg-mint-action rounded-md p-2">Search</button>
    </DialogTrigger>
    <DialogPortal>
      <DialogOverlay
        class="data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-mint-11/80"
      />
      <DialogContent
        class="bg-blue-ui data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] data-[state=open]:zoom-in-95 fixed top-1/2 left-1/2 z-50 grid w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 border shadow-lg duration-200 sm:rounded-lg"
      >
        <DialogClose
          class="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:pointer-events-none"
        >
          X
          <span class="sr-only">Close</span>
        </DialogClose>
        <ComboboxRoot>
          <ComboboxInput autoFocus v-model="search" class="w-ful lpx-6 h-12" placeholder="Search" />
          <ComboboxContent class="px-6">
            <div role="presentation" class="flex flex-col items-stretch gap-2">
              <ComboboxItem
                asChild
                v-for="link of result"
                :key="link.item.id"
                :textValue="link.item.title"
                :value="link.item.id"
                class="data-[highlighted]:bg-blue-action px-2 py-1"
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
