import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { SAMPLE_BOOKMARKS, SAMPLE_BOOKS } from '@/constants/sampleBooks';
import { createId } from '@/lib/id';
import { pagePreview, suggestedPageCount } from '@/lib/pages';
import type { Book, Bookmark, NewBookInput } from '@/types/book';

interface LibraryState {
  books: Book[];
  bookmarks: Bookmark[];
  addBook: (input: NewBookInput) => string;
  updateBook: (id: string, patch: Partial<Book>) => void;
  deleteBook: (id: string) => void;
  setCurrentPage: (id: string, page: number) => void;
  markFinished: (id: string) => void;
  reopenBook: (id: string) => void;
  addBookmark: (bookId: string, page: number) => Bookmark | undefined;
  removeBookmark: (id: string) => void;
  toggleBookmark: (bookId: string, page: number) => boolean;
}

function stamp(): string {
  return new Date().toISOString();
}

function nextPage(book: Book, page: number): number {
  return Math.min(book.totalPages, Math.max(1, page));
}

export const useLibraryStore = create<LibraryState>()(
  persist(
    (set, get) => ({
      books: SAMPLE_BOOKS,
      bookmarks: SAMPLE_BOOKMARKS,

      addBook: (input) => {
        const id = createId('book');
        const now = stamp();
        const totalPages = Math.max(1, input.totalPages || suggestedPageCount(input.content));
        const book: Book = {
          id,
          title: input.title.trim(),
          author: input.author.trim(),
          description: input.description.trim(),
          coverUri: input.coverUri,
          category: input.category,
          totalPages,
          currentPage: 1,
          content: input.content.trim(),
          status: 'unread',
          createdAt: now,
          updatedAt: now,
        };
        set((state) => ({ books: [book, ...state.books] }));
        return id;
      },

      updateBook: (id, patch) => {
        const now = stamp();
        set((state) => ({
          books: state.books.map((book) =>
            book.id === id ? { ...book, ...patch, updatedAt: now } : book,
          ),
        }));
      },

      deleteBook: (id) => {
        set((state) => ({
          books: state.books.filter((book) => book.id !== id),
          bookmarks: state.bookmarks.filter((item) => item.bookId !== id),
        }));
      },

      setCurrentPage: (id, page) => {
        set((state) => {
          const book = state.books.find((item) => item.id === id);
          if (!book) return state;
          const currentPage = nextPage(book, page);
          const status = book.status === 'finished' ? 'finished' : 'reading';
          if (book.currentPage === currentPage && book.status === status) return state;
          const now = stamp();
          return {
            books: state.books.map((item) =>
              item.id === id
                ? { ...item, currentPage, status, updatedAt: now, lastReadAt: now }
                : item,
            ),
          };
        });
      },

      markFinished: (id) => {
        const now = stamp();
        set((state) => ({
          books: state.books.map((book) =>
            book.id === id
              ? {
                  ...book,
                  status: 'finished' as const,
                  currentPage: book.totalPages,
                  updatedAt: now,
                  lastReadAt: now,
                }
              : book,
          ),
        }));
      },

      reopenBook: (id) => {
        const now = stamp();
        set((state) => ({
          books: state.books.map((book) =>
            book.id === id
              ? {
                  ...book,
                  status: 'reading' as const,
                  currentPage: 1,
                  updatedAt: now,
                  lastReadAt: now,
                }
              : book,
          ),
        }));
      },

      addBookmark: (bookId, page) => {
        const book = get().books.find((item) => item.id === bookId);
        if (!book) return undefined;
        const existing = get().bookmarks.find((item) => item.bookId === bookId && item.page === page);
        if (existing) return existing;
        const bookmark: Bookmark = {
          id: createId('bm'),
          bookId,
          page,
          preview: pagePreview(book.content, page, book.totalPages),
          createdAt: stamp(),
        };
        set((state) => ({ bookmarks: [bookmark, ...state.bookmarks] }));
        return bookmark;
      },

      removeBookmark: (id) => {
        set((state) => ({
          bookmarks: state.bookmarks.filter((item) => item.id !== id),
        }));
      },

      toggleBookmark: (bookId, page) => {
        const existing = get().bookmarks.find((item) => item.bookId === bookId && item.page === page);
        if (existing) {
          get().removeBookmark(existing.id);
          return false;
        }
        get().addBookmark(bookId, page);
        return true;
      },
    }),
    {
      name: 'simplify-library',
      storage: createJSONStorage(() => AsyncStorage),
      version: 1,
    },
  ),
);
