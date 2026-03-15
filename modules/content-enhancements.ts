import type { FileAfterParseHook, FileBeforeParseHook } from '@nuxt/content';
import { defineNuxtModule } from 'nuxt/kit';
import type { Nuxt } from 'nuxt/schema';
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

function injectCoverImage(body: string): string {
  const frontmatterMatch = body.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatterMatch?.[1]) return body;

  const coverImageMatch = frontmatterMatch[1].match(/coverImage:\s*['"](.+?)['"]/);
  if (!coverImageMatch) return body;

  const coverImage = coverImageMatch[1];
  const afterFrontmatter = body.slice(frontmatterMatch[0].length);
  const h1Match = afterFrontmatter.match(/^# .+$/m);
  if (!h1Match || h1Match.index === undefined) return body;

  const h1EndIndex = frontmatterMatch[0].length + h1Match.index + h1Match[0].length;
  const imageTag = `\n\n![Cover](${coverImage})\n`;

  return body.slice(0, h1EndIndex) + imageTag + body.slice(h1EndIndex);
}

/**
 * Content hooks are typed in @nuxt/content's module declaration but the
 * augmentation isn't resolved during nuxi typecheck for local modules.
 * Cast via Nuxt's hookable instance to work around this.
 */
function contentHook(nuxt: Nuxt, name: string, fn: (ctx: never) => void) {
  (nuxt.hooks.hook as (name: string, fn: (ctx: never) => void) => void)(name, fn);
}

export default defineNuxtModule({
  setup(_, nuxt) {
    contentHook(nuxt, 'content:file:afterParse', ((ctx: FileAfterParseHook) => {
      if (!ctx.file.id.endsWith('.md')) return;

      const text = typeof ctx.file.body === 'string' ? ctx.file.body : '';
      ctx.content.readingTime = calculateReadingTime(text);
      const stem = ctx.content.stem as string | undefined;
      ctx.content.slug = stem?.replaceAll('/', '-') || ctx.file.id.replace(/\.md$/, '').replaceAll('/', '-');
    }) as never);

    contentHook(nuxt, 'content:file:beforeParse', ((ctx: FileBeforeParseHook) => {
      if (!ctx.file.id.endsWith('.md')) return;

      ctx.file.body = injectCoverImage(ctx.file.body);
    }) as never);
  },
});
