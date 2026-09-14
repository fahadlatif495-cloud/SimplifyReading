export type BookStatus = 'unread' | 'reading' | 'finished';

export type ReaderMode = 'light' | 'sepia' | 'dark';

export type AppThemePreference = 'light' | 'dark' | 'system';

export type LibraryFilter = 'all' | 'reading' | 'unread' | 'finished';

export type LibrarySort = 'recently-added' | 'recently-read' | 'title';

export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  coverUri?: string;
  category?: string;
  totalPages: number;
  currentPage: number;
  content: string;
  status: BookStatus;
  createdAt: string;
  updatedAt: string;
  lastReadAt?: string;
}

export interface Bookmark {
  id: string;
  bookId: string;
  page: number;
  preview: string;
  createdAt: string;
}

export interface ReaderSettings {
  fontSize: number;
  lineHeight: number;
  mode: ReaderMode;
}

export interface NewBookInput {
  title: string;
  author: string;
  description: string;
  coverUri?: string;
  category?: string;
  totalPages: number;
  content: string;
}

export const BOOK_CATEGORIES = [
  'Classic',
  'Fiction',
  'Philosophy',
  'Poetry',
  'History',
  'Science',
  'Biography',
  'Mystery',
  'Fantasy',
  'Essay',
] as const;

export type BookCategory = (typeof BOOK_CATEGORIES)[number];
