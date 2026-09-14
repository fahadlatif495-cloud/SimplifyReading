import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { BackButton } from '@/components/BackButton';
import { BookCard } from '@/components/BookCard';
import { EmptyState } from '@/components/EmptyState';
import { Screen } from '@/components/Screen';
import { SearchBar } from '@/components/SearchBar';
import { Text } from '@/components/Text';
import { Spacing } from '@/constants/theme';
import { filterBooks } from '@/lib/library';
import { useLibraryStore } from '@/store/useLibraryStore';

export default function SearchScreen() {
  const router = useRouter();
  const books = useLibraryStore((state) => state.books);
  const [query, setQuery] = useState('');
  const results = useMemo(() => filterBooks(books, 'all', query), [books, query]);

  return (
    <Screen scroll contentContainerStyle={styles.content}>
      <View style={styles.top}>
        <BackButton />
        <Text variant="label" color="muted">
          Look up
        </Text>
        <View style={{ width: 40 }} />
      </View>
      <Text variant="display">Search</Text>
      <SearchBar value={query} onChangeText={setQuery} autoFocus placeholder="Title, author, or genre" />

      {query.trim().length === 0 ? (
        <EmptyState title="Search the shelves" body="Type a title, author, or category to find a book." />
      ) : results.length === 0 ? (
        <EmptyState
          title="Nothing by that name"
          body="Try another spelling, or add the book yourself."
          actionLabel="Add a book"
          onAction={() => router.push('/add-book')}
        />
      ) : (
        <View style={styles.grid}>
          {results.map((book, index) => (
            <BookCard key={book.id} book={book} index={index} />
          ))}
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: Spacing.md,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 18,
    paddingTop: 8,
  },
});
