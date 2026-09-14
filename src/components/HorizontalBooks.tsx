import { ScrollView, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';

import { Spacing } from '@/constants/theme';
import type { Book } from '@/types/book';
import { BookCover } from '@/components/BookCover';
import { PressableScale } from '@/components/PressableScale';
import { Text } from '@/components/Text';

type Props = {
  books: Book[];
  size?: 'sm' | 'md';
};

export function HorizontalBooks({ books, size = 'md' }: Props) {
  const router = useRouter();
  const itemWidth = size === 'sm' ? 72 : 108;

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
      {books.map((book) => (
        <PressableScale
          key={book.id}
          onPress={() => router.push(`/book/${book.id}`)}
          style={[styles.item, { width: itemWidth }]}>
          <BookCover title={book.title} author={book.author} uri={book.coverUri} size={size} width={itemWidth} height={size === 'sm' ? 104 : 156} />
          <View style={styles.meta}>
            <Text variant="caption" numberOfLines={2} style={styles.title}>
              {book.title}
            </Text>
            <Text variant="caption" color="muted" numberOfLines={1}>
              {book.author}
            </Text>
          </View>
        </PressableScale>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: {
    gap: 8,
    paddingRight: Spacing.screen,
  },
  item: {
    gap: 6,
  },
  meta: {
    gap: 1,
  },
  title: {
    fontSize: 12,
    lineHeight: 16,
  },
});
