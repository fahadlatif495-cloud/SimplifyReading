const DEFAULT_WORDS_PER_PAGE = 170;

export function countWords(content: string): number {
  return content.trim().split(/\s+/).filter(Boolean).length;
}

export function suggestedPageCount(content: string): number {
  return Math.max(1, Math.ceil(countWords(content) / DEFAULT_WORDS_PER_PAGE));
}

export function paginateContent(content: string, totalPages: number): string[] {
  const words = content.trim().split(/\s+/).filter(Boolean);
  const pages = Math.max(1, totalPages);

  if (words.length === 0) {
    return Array.from({ length: pages }, () => '');
  }

  const perPage = Math.max(1, Math.ceil(words.length / pages));
  const result: string[] = [];

  for (let i = 0; i < pages; i += 1) {
    result.push(words.slice(i * perPage, (i + 1) * perPage).join(' '));
  }

  return result;
}

export function readingProgress(currentPage: number, totalPages: number): number {
  if (totalPages <= 0) return 0;
  return Math.min(100, Math.max(0, Math.round((currentPage / totalPages) * 100)));
}

export function pagePreview(content: string, page: number, totalPages: number, length = 140): string {
  const pages = paginateContent(content, totalPages);
  const text = pages[Math.max(0, page - 1)] ?? '';
  if (text.length <= length) return text;
  return `${text.slice(0, length).trim()}…`;
}
