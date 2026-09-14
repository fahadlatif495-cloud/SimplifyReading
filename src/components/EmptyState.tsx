import { StyleSheet, View } from 'react-native';

import { Radius } from '@/constants/theme';
import { useAppTheme } from '@/hooks/use-theme';
import { Button } from '@/components/Button';
import { Text } from '@/components/Text';

type Props = {
  title: string;
  body: string;
  actionLabel?: string;
  onAction?: () => void;
};

export function EmptyState({ title, body, actionLabel, onAction }: Props) {
  const colors = useAppTheme();

  return (
    <View style={styles.wrap}>
      <View style={styles.stack}>
        <View style={[styles.book, styles.left, { backgroundColor: colors.parchment }]} />
        <View style={[styles.book, styles.center, { backgroundColor: colors.ink }]} />
        <View style={[styles.book, styles.right, { backgroundColor: colors.accent }]} />
      </View>
      <Text variant="title" style={styles.title}>
        {title}
      </Text>
      <Text variant="body" color="muted" style={styles.body}>
        {body}
      </Text>
      {actionLabel && onAction ? <Button label={actionLabel} onPress={onAction} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    paddingHorizontal: 28,
    paddingVertical: 48,
    gap: 12,
  },
  stack: {
    width: 92,
    height: 88,
    marginBottom: 12,
  },
  book: {
    position: 'absolute',
    width: 42,
    height: 62,
    borderRadius: Radius.sm,
  },
  left: {
    left: 8,
    top: 16,
    transform: [{ rotate: '-16deg' }],
  },
  center: {
    left: 25,
    top: 6,
  },
  right: {
    left: 44,
    top: 18,
    transform: [{ rotate: '14deg' }],
  },
  title: {
    textAlign: 'center',
  },
  body: {
    textAlign: 'center',
    marginBottom: 8,
  },
});
