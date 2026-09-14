import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { LinearTransition } from 'react-native-reanimated';

import { BookmarkItem } from '@/components/BookmarkItem';
import { EmptyState } from '@/components/EmptyState';
import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { Spacing } from '@/constants/theme';
import { useLibraryStore } from '@/store/useLibraryStore';

export default function BookmarksScreen() {
  const bookmarks = useLibraryStore((state) => state.bookmarks);
  const books = useLibraryStore((state) => state.books);
  const removeBookmark = useLibraryStore((state) => state.removeBookmark);

  const items = useMemo(
    () =>
      [...bookmarks].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).map((bookmark) => ({
        bookmark,
        book: books.find((item) => item.id === bookmark.bookId),
      })),
    [bookmarks, books],
  );

  return (
    <Screen scroll tabBar contentContainerStyle={styles.content}>
      <View>
        <Text variant="label" color="bronze">
          Saved places
        </Text>
        <Text variant="display">Bookmarks</Text>
        <Text variant="body" color="muted" style={styles.lede}>
          Return to the exact page, as if you left a ribbon in the spine.
        </Text>
      </View>

      {items.length === 0 ? (
        <EmptyState
          title="No ribbons yet"
          body="While reading, tap the bookmark to keep a page. It will wait for you here."
        />
      ) : (
        <Animated.View layout={LinearTransition} style={styles.list}>
          {items.map(({ bookmark, book }) => (
            <BookmarkItem
              key={bookmark.id}
              bookmark={bookmark}
              book={book}
              onDelete={() => removeBookmark(bookmark.id)}
            />
          ))}
        </Animated.View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: Spacing.lg,
  },
  lede: {
    marginTop: 8,
    maxWidth: 320,
  },
  list: {
    gap: 12,
  },
});
