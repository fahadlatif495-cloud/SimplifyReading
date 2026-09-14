import { StyleSheet, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useRouter } from 'expo-router';

import { Fonts, Radius, Shadow, Spacing } from '@/constants/theme';
import { useAppTheme } from '@/hooks/use-theme';
import type { Book } from '@/types/book';
import { BookCover } from '@/components/BookCover';
import { PressableScale } from '@/components/PressableScale';
import { ReadingProgress } from '@/components/ReadingProgress';
import { Text } from '@/components/Text';

type Props = {
  book: Book;
};

export function ContinueReadingCard({ book }: Props) {
  const colors = useAppTheme();
  const router = useRouter();

  return (
    <Animated.View entering={FadeIn.duration(450)}>
      <PressableScale
        onPress={() => router.push(`/reader/${book.id}`)}
        style={[styles.card, { backgroundColor: colors.paper, borderColor: colors.line }, Shadow.card]}>
        <BookCover title={book.title} author={book.author} uri={book.coverUri} size="lg" />
        <View style={styles.copy}>
          <Text variant="label" color="bronze">
            Continue
          </Text>
          <Text variant="title" numberOfLines={2} style={styles.title}>
            {book.title}
          </Text>
          <Text variant="caption" color="muted">
            {book.author}
          </Text>
          <View style={styles.spacer} />
          <ReadingProgress currentPage={book.currentPage} totalPages={book.totalPages} />
          <Text variant="caption" style={[styles.cta, { color: colors.accent }]}>
            Resume on page {book.currentPage}
          </Text>
        </View>
      </PressableScale>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    gap: Spacing.md,
    padding: Spacing.md,
    borderRadius: Radius.lg,
    borderWidth: 1,
  },
  copy: {
    flex: 1,
    paddingVertical: 4,
  },
  title: {
    marginTop: 4,
    fontSize: 24,
    lineHeight: 28,
  },
  spacer: {
    flex: 1,
    minHeight: 12,
  },
  cta: {
    fontFamily: Fonts.sansMedium,
    marginTop: 8,
  },
});
