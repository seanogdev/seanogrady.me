import { defineNuxtModule } from 'nuxt/kit';
import remarkParse from 'remark-parse';
import remarkStringify from 'remark-stringify';
import stripMarkdown from 'strip-markdown';
import { unified } from 'unified';

const WORDS_PER_MINUTE = 225;

function calculateReadingTime(markdown: string): number {
  if (!markdown || markdown.trim().length === 0) return 1;

  const file = unified().use(remarkParse).use(stripMarkdown).use(remarkStringify).processSync(markdown);
  const words = String(file)
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0);

  return Math.max(1, Math.ceil(words.length / WORDS_PER_MINUTE));
}

export default defineNuxtModule({
  setup(_, nuxt) {
    nuxt.hook('content:file:afterParse', (ctx) => {
      if (!ctx.file.id.endsWith('.md')) return;

      const text = typeof ctx.file.body === 'string' ? ctx.file.body : '';
      ctx.content.readingTime = calculateReadingTime(text);

      const stem = ctx.content.stem as string | undefined;
      ctx.content.slug = stem?.replaceAll('/', '-') || ctx.file.id.replace(/\.md$/, '').replaceAll('/', '-');
    });
  },
});
