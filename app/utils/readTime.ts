import remarkParse from 'remark-parse';
import stripMarkdown from 'strip-markdown';
import { unified } from 'unified';

export function readTime(content: string): string {
  if (!content || content.trim().length === 0) {
    return '1 min read';
  }

  const file = unified().use(remarkParse).use(stripMarkdown).processSync(content);

  const words = String(file)
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0);

  const minutes = Math.ceil(words.length / 225);

  return minutes < 1 ? '1 min read' : `${minutes} min read`;
}
