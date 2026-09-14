import { StyleSheet, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useRouter } from 'expo-router';

import { Fonts, Radius } from '@/constants/theme';
import { useAppTheme } from '@/hooks/use-theme';
import type { Book } from '@/types/book';
import { BookCover } from '@/components/BookCover';
import { PressableScale } from '@/components/PressableScale';
import { ReadingProgress } from '@/components/ReadingProgress';
import { Text } from '@/components/Text';

type Props = {
  book: Book;
  index?: number;
};

export function BookCard({ book, index = 0 }: Props) {
  const colors = useAppTheme();
  const router = useRouter();

  return (
    <Animated.View entering={FadeInDown.delay(index * 40).duration(420)} style={styles.wrap}>
      <PressableScale onPress={() => router.push(`/book/${book.id}`)} style={styles.press}>
        <BookCover title={book.title} author={book.author} uri={book.coverUri} size="md" />
        <Text variant="serif" numberOfLines={2} style={styles.title}>
          {book.title}
        </Text>
        <Text variant="caption" color="muted" numberOfLines={1}>
          {book.author}
        </Text>
        <View style={styles.progress}>
          <ReadingProgress currentPage={book.currentPage} totalPages={book.totalPages} showLabel={false} />
          <Text variant="caption" color="bronze" style={styles.percent}>
            {book.status === 'finished' ? 'Finished' : `${Math.round((book.currentPage / book.totalPages) * 100)}%`}
          </Text>
        </View>
        <View style={[styles.dot, { backgroundColor: statusColor(book.status, colors.accent, colors.bronze, colors.faint) }]} />
      </PressableScale>
    </Animated.View>
  );
}

function statusColor(status: Book['status'], accent: string, bronze: string, faint: string) {
  if (status === 'finished') return bronze;
  if (status === 'reading') return accent;
  return faint;
}

const styles = StyleSheet.create({
  wrap: {
    width: '47%',
  },
  press: {
    gap: 8,
  },
  title: {
    fontFamily: Fonts.display,
    fontSize: 18,
    lineHeight: 22,
    marginTop: 4,
  },
  progress: {
    gap: 6,
    marginTop: 2,
  },
  percent: {
    fontFamily: Fonts.sansMedium,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: Radius.full,
    marginTop: 2,
  },
});
