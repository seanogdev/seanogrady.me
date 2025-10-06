/**
 * Calculate estimated read time for markdown content
 * @param content - Markdown content string
 * @returns Formatted read time string (e.g., "8 min read")
 */
export function readTime(content: string): string {
  if (!content || content.trim().length === 0) {
    return '1 min read';
  }

  // Strip markdown syntax for accurate word count
  const plainText = content
    // Remove code blocks
    .replace(/```[\s\S]*?```/g, '')
    // Remove inline code
    .replace(/`[^`]*`/g, '')
    // Remove links but keep text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // Remove images
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '')
    // Remove headers
    .replace(/^#{1,6}\s+/gm, '')
    // Remove bold/italic
    .replace(/(\*\*|__)(.*?)\1/g, '$2')
    .replace(/(\*|_)(.*?)\1/g, '$2')
    // Remove HTML tags
    .replace(/<[^>]*>/g, '')
    // Remove horizontal rules
    .replace(/^(-{3,}|_{3,}|\*{3,})$/gm, '')
    // Remove blockquotes
    .replace(/^>\s+/gm, '')
    // Remove list markers
    .replace(/^[\s]*[-*+]\s+/gm, '')
    .replace(/^[\s]*\d+\.\s+/gm, '');

  // Count words (split by whitespace and filter empty strings)
  const words = plainText
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0);

  const wordCount = words.length;

  // Calculate read time based on 225 words per minute average
  const minutes = Math.ceil(wordCount / 225);

  // Handle very short content
  if (minutes < 1) {
    return '1 min read';
  }

  return `${minutes} min read`;
}
