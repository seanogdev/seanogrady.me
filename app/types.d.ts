import type { FileAfterParseHook } from '@nuxt/content';

declare module 'nuxt/schema' {
  interface NuxtHooks {
    'content:file:afterParse': (ctx: FileAfterParseHook) => Promise<void> | void;
  }
}
