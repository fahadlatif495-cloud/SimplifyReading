import type { Book, LibraryFilter, LibrarySort } from '@/types/book';

export function matchesQuery(book: Book, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return [book.title, book.author, book.description, book.category ?? '']
    .join(' ')
    .toLowerCase()
    .includes(q);
}

export function filterBooks(books: Book[], filter: LibraryFilter, query = ''): Book[] {
  return books.filter((book) => {
    if (!matchesQuery(book, query)) return false;
    if (filter === 'all') return true;
    return book.status === filter;
  });
}

export function sortBooks(books: Book[], sort: LibrarySort): Book[] {
  const copy = [...books];
  copy.sort((a, b) => {
    if (sort === 'title') return a.title.localeCompare(b.title);
    if (sort === 'recently-read') {
      return (b.lastReadAt ?? '').localeCompare(a.lastReadAt ?? '');
    }
    return b.createdAt.localeCompare(a.createdAt);
  });
  return copy;
}

export function continueReading(books: Book[]): Book[] {
  return sortBooks(
    books.filter((book) => book.status === 'reading'),
    'recently-read',
  );
}

export function recentlyAdded(books: Book[], limit = 8): Book[] {
  return sortBooks(books, 'recently-added').slice(0, limit);
}

export function recentlyRead(books: Book[], limit = 8): Book[] {
  return sortBooks(
    books.filter((book) => Boolean(book.lastReadAt)),
    'recently-read',
  ).slice(0, limit);
}

export function finishedBooks(books: Book[]): Book[] {
  return books.filter((book) => book.status === 'finished');
}

export function libraryStats(books: Book[]) {
  return {
    total: books.length,
    reading: books.filter((book) => book.status === 'reading').length,
    unread: books.filter((book) => book.status === 'unread').length,
    finished: books.filter((book) => book.status === 'finished').length,
  };
}
