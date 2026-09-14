import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';
import { useRouter } from 'expo-router';

import { Fonts, Radius, Spacing } from '@/constants/theme';
import { useAppTheme } from '@/hooks/use-theme';
import type { Book, Bookmark } from '@/types/book';
import { BookCover } from '@/components/BookCover';
import { PressableScale } from '@/components/PressableScale';
import { Text } from '@/components/Text';

type Props = {
  bookmark: Bookmark;
  book?: Book;
  onDelete: () => void;
};

export function BookmarkItem({ bookmark, book, onDelete }: Props) {
  const colors = useAppTheme();
  const router = useRouter();

  return (
    <Animated.View entering={FadeInRight.duration(320)} exiting={FadeOutLeft.duration(220)}>
      <PressableScale
        onPress={() => {
          if (!book) return;
          router.push({ pathname: '/reader/[id]', params: { id: book.id, page: String(bookmark.page) } });
        }}
        style={[styles.row, { backgroundColor: colors.paper, borderColor: colors.line }]}>
        <BookCover title={book?.title ?? 'Book'} uri={book?.coverUri} size="sm" />
        <View style={styles.copy}>
          <Text variant="label" color="bronze">
            Page {bookmark.page}
          </Text>
          <Text variant="serif" numberOfLines={1} style={styles.title}>
            {book?.title ?? 'Unknown book'}
          </Text>
          <Text variant="caption" color="muted" numberOfLines={2}>
            {bookmark.preview}
          </Text>
        </View>
        <PressableScale onPress={onDelete} hitSlop={10} style={styles.delete}>
          <Ionicons name="trash-outline" size={18} color={colors.muted} />
        </PressableScale>
      </PressableScale>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: Spacing.md,
    padding: Spacing.md,
    borderRadius: Radius.lg,
    borderWidth: 1,
    alignItems: 'center',
  },
  copy: {
    flex: 1,
    gap: 4,
  },
  title: {
    fontFamily: Fonts.display,
    fontSize: 20,
    lineHeight: 24,
  },
  delete: {
    padding: 6,
  },
});
