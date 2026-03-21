import type { Root } from 'mdast';
import { toString } from 'mdast-util-to-string';

const WORDS_PER_MINUTE = 225;

export function remarkReadingTime() {
  return function (tree: Root, file: { data: { astro: { frontmatter: Record<string, unknown> } } }) {
    const text = toString(tree);
    const words = text.trim().split(/\s+/).filter((word) => word.length > 0);
    const readingTime = Math.max(1, Math.ceil(words.length / WORDS_PER_MINUTE));
    file.data.astro.frontmatter.readingTime = readingTime;
  };
}
