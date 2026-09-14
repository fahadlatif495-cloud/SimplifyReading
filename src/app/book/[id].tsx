import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BackButton } from '@/components/BackButton';
import { BookCover } from '@/components/BookCover';
import { Button } from '@/components/Button';
import { ReadingProgress } from '@/components/ReadingProgress';
import { Text } from '@/components/Text';
import { PressableScale } from '@/components/PressableScale';
import { Fonts, Spacing } from '@/constants/theme';
import { useAppTheme } from '@/hooks/use-theme';
import { readingProgress } from '@/lib/pages';
import { useLibraryStore } from '@/store/useLibraryStore';

export default function BookDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const bookId = Array.isArray(id) ? id[0] : id;
  const router = useRouter();
  const colors = useAppTheme();
  const insets = useSafeAreaInsets();
  const book = useLibraryStore((state) => state.books.find((item) => item.id === bookId));
  const markFinished = useLibraryStore((state) => state.markFinished);
  const reopenBook = useLibraryStore((state) => state.reopenBook);
  const toggleBookmark = useLibraryStore((state) => state.toggleBookmark);
  const deleteBook = useLibraryStore((state) => state.deleteBook);
  const bookmarked = useLibraryStore((state) =>
    state.bookmarks.some((item) => item.bookId === bookId && item.page === (book?.currentPage ?? 1)),
  );

  if (!book) {
    return (
      <View style={[styles.missing, { backgroundColor: colors.bg, paddingTop: insets.top }]}>
        <BackButton />
        <Text variant="title">This book is gone</Text>
        <Button label="Back to library" onPress={() => router.replace('/library')} />
      </View>
    );
  }

  const current = book;
  const percent = readingProgress(current.currentPage, current.totalPages);
  const cta = current.status === 'unread' ? 'Read now' : current.status === 'finished' ? 'Read again' : 'Continue reading';

  function openReader() {
    if (current.status === 'finished') reopenBook(current.id);
    router.push(`/reader/${current.id}`);
  }

  function onBookmark() {
    const added = toggleBookmark(current.id, current.currentPage);
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (added) void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  }

  function onFinish() {
    markFinished(current.id);
    void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  }

  function onDelete() {
    Alert.alert('Remove this book?', 'Progress and bookmarks for it will be deleted.', [
      { text: 'Keep', style: 'cancel' },
      {
        text: 'Remove',
        style: 'destructive',
        onPress: () => {
          deleteBook(current.id);
          router.replace('/library');
        },
      },
    ]);
  }

  return (
    <ScrollView
      style={{ backgroundColor: colors.bg }}
      contentContainerStyle={[styles.content, { paddingTop: insets.top + 20, paddingBottom: insets.bottom + 32 }]}>
      <View style={styles.top}>
        <BackButton />
        <PressableScale onPress={onDelete} hitSlop={8}>
          <Ionicons name="trash-outline" size={20} color={colors.muted} />
        </PressableScale>
      </View>

      <View style={styles.hero}>
        <BookCover title={book.title} author={book.author} uri={book.coverUri} size="hero" />
      </View>

      <Text variant="label" color="bronze">
        {book.category ?? 'Uncategorized'}
      </Text>
      <Text variant="display" style={styles.title}>
        {book.title}
      </Text>
      <Text variant="serif" color="muted">
        {book.author}
      </Text>
      {book.description ? (
        <Text variant="body" color="inkSoft" style={styles.desc}>
          {book.description}
        </Text>
      ) : null}

      <View style={[styles.meta, { borderColor: colors.line }]}>
        <Meta label="Pages" value={`${book.totalPages}`} />
        <Meta label="At" value={`${book.currentPage}`} />
        <Meta label="Read" value={`${percent}%`} />
      </View>
      <ReadingProgress currentPage={book.currentPage} totalPages={book.totalPages} />

      <Button label={cta} onPress={openReader} />
      <View style={styles.actions}>
        <Button
          label={bookmarked ? 'Bookmarked' : 'Bookmark page'}
          variant="outline"
          onPress={onBookmark}
          icon={<Ionicons name={bookmarked ? 'bookmark' : 'bookmark-outline'} size={16} color={colors.ink} />}
        />
        {book.status !== 'finished' ? (
          <Button label="Mark as finished" variant="soft" onPress={onFinish} />
        ) : (
          <Button label="Finished" variant="ghost" disabled />
        )}
      </View>
    </ScrollView>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.metaItem}>
      <Text variant="label" color="muted">
        {label}
      </Text>
      <Text variant="title" style={styles.metaValue}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: Spacing.screen,
    gap: 12,
  },
  missing: {
    flex: 1,
    paddingHorizontal: Spacing.screen,
    gap: 16,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  hero: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  title: {
    fontSize: 36,
    lineHeight: 40,
  },
  desc: {
    marginTop: 4,
  },
  meta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingVertical: 14,
    marginTop: 8,
  },
  metaItem: {
    gap: 4,
  },
  metaValue: {
    fontFamily: Fonts.display,
    fontSize: 26,
  },
  actions: {
    gap: 10,
  },
});
