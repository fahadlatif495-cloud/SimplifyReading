import { Ionicons } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';

import { BookCard } from '@/components/BookCard';
import { BottomSheet } from '@/components/BottomSheet';
import { EmptyState } from '@/components/EmptyState';
import { PressableScale } from '@/components/PressableScale';
import { Screen } from '@/components/Screen';
import { SearchBar } from '@/components/SearchBar';
import { Text } from '@/components/Text';
import { Fonts, Radius, Spacing } from '@/constants/theme';
import { useAppTheme } from '@/hooks/use-theme';
import { filterBooks, sortBooks } from '@/lib/library';
import { useLibraryStore } from '@/store/useLibraryStore';
import type { LibraryFilter, LibrarySort } from '@/types/book';

const FILTERS: { key: LibraryFilter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'reading', label: 'Reading' },
  { key: 'unread', label: 'Unread' },
  { key: 'finished', label: 'Finished' },
];

const SORTS: { key: LibrarySort; label: string }[] = [
  { key: 'recently-added', label: 'Recently added' },
  { key: 'recently-read', label: 'Recently read' },
  { key: 'title', label: 'Title A–Z' },
];

export default function LibraryScreen() {
  const router = useRouter();
  const colors = useAppTheme();
  const books = useLibraryStore((state) => state.books);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<LibraryFilter>('all');
  const [sort, setSort] = useState<LibrarySort>('recently-added');
  const [sortOpen, setSortOpen] = useState(false);

  const visible = useMemo(
    () => sortBooks(filterBooks(books, filter, query), sort),
    [books, filter, query, sort],
  );

  return (
    <Screen scroll tabBar contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View>
          <Text variant="label" color="bronze">
            The shelves
          </Text>
          <Text variant="display">Library</Text>
        </View>
        <PressableScale onPress={() => router.push('/add-book')} style={[styles.add, { backgroundColor: colors.ink }]}>
          <Ionicons name="add" size={20} color={colors.paper} />
        </PressableScale>
      </View>

      <SearchBar value={query} onChangeText={setQuery} placeholder="Find a title or author" />

      <View style={styles.toolbar}>
        <View style={styles.filters}>
          {FILTERS.map((item) => {
            const active = filter === item.key;
            return (
              <PressableScale
                key={item.key}
                onPress={() => setFilter(item.key)}
                style={[
                  styles.chip,
                  {
                    backgroundColor: active ? colors.ink : colors.paper,
                    borderColor: colors.line,
                  },
                ]}>
                <Text variant="caption" style={{ color: active ? colors.paper : colors.muted, fontFamily: Fonts.sansMedium }}>
                  {item.label}
                </Text>
              </PressableScale>
            );
          })}
        </View>
        <PressableScale onPress={() => setSortOpen(true)} style={[styles.sort, { borderColor: colors.line }]}>
          <Ionicons name="swap-vertical" size={16} color={colors.ink} />
        </PressableScale>
      </View>

      {books.length === 0 ? (
        <EmptyState
          title="Nothing on the shelves yet"
          body="When you add a book, it will live here — cover, progress, and all."
          actionLabel="Add Your First Book"
          onAction={() => router.push('/add-book')}
        />
      ) : visible.length === 0 ? (
        <EmptyState title="No matches" body="Try another filter, or a shorter search." />
      ) : (
        <View style={styles.grid}>
          {visible.map((book, index) => (
            <BookCard key={book.id} book={book} index={index} />
          ))}
        </View>
      )}

      <BottomSheet visible={sortOpen} onClose={() => setSortOpen(false)} title="Sort shelves">
        {SORTS.map((item) => (
          <PressableScale
            key={item.key}
            onPress={() => {
              setSort(item.key);
              setSortOpen(false);
            }}
            style={[styles.sortRow, { borderColor: colors.line }]}>
            <Text variant="body">{item.label}</Text>
            {sort === item.key ? <Ionicons name="checkmark" size={18} color={colors.accent} /> : null}
          </PressableScale>
        ))}
      </BottomSheet>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: Spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  add: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  filters: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    borderWidth: 1,
    borderRadius: Radius.full,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  sort: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 18,
    paddingTop: 8,
  },
  sortRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
});
