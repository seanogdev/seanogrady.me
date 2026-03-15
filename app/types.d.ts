import type { FileAfterParseHook, FileBeforeParseHook } from '@nuxt/content';

declare module 'nuxt/schema' {
  interface NuxtHooks {
    'content:file:beforeParse': (ctx: FileBeforeParseHook) => Promise<void> | void;
    'content:file:afterParse': (ctx: FileAfterParseHook) => Promise<void> | void;
  }
}
