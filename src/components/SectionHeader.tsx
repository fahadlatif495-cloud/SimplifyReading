import { StyleSheet, View } from 'react-native';

import { Text } from '@/components/Text';
import { PressableScale } from '@/components/PressableScale';
import { useAppTheme } from '@/hooks/use-theme';

type Props = {
  eyebrow?: string;
  title: string;
  actionLabel?: string;
  onAction?: () => void;
};

export function SectionHeader({ eyebrow, title, actionLabel, onAction }: Props) {
  const colors = useAppTheme();

  return (
    <View style={styles.row}>
      <View style={styles.copy}>
        {eyebrow ? (
          <Text variant="label" color="bronze">
            {eyebrow}
          </Text>
        ) : null}
        <Text variant="title">{title}</Text>
      </View>
      {actionLabel && onAction ? (
        <PressableScale onPress={onAction}>
          <Text variant="caption" style={{ color: colors.accent }}>
            {actionLabel}
          </Text>
        </PressableScale>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: 12,
  },
  copy: {
    gap: 6,
    flex: 1,
    overflow: 'visible',
  },
});
