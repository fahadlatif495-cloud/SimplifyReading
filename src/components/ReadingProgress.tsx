import { StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useEffect } from 'react';

import { Radius } from '@/constants/theme';
import { useAppTheme } from '@/hooks/use-theme';
import { readingProgress } from '@/lib/pages';
import { Text } from '@/components/Text';

type Props = {
  currentPage: number;
  totalPages: number;
  showLabel?: boolean;
};

export function ReadingProgress({ currentPage, totalPages, showLabel = true }: Props) {
  const colors = useAppTheme();
  const percent = readingProgress(currentPage, totalPages);
  const width = useSharedValue(percent);

  useEffect(() => {
    width.value = withTiming(percent, { duration: 420 });
  }, [percent, width]);

  const fillStyle = useAnimatedStyle(() => ({
    width: `${width.value}%`,
  }));

  return (
    <View style={styles.wrap}>
      {showLabel ? (
        <View style={styles.row}>
          <Text variant="caption" color="muted">
            {percent}% complete
          </Text>
          <Text variant="caption" color="muted">
            {currentPage} / {totalPages}
          </Text>
        </View>
      ) : null}
      <View style={[styles.track, { backgroundColor: colors.progressTrack }]}>
        <Animated.View style={[styles.fill, { backgroundColor: colors.accent }, fillStyle]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  track: {
    height: 4,
    borderRadius: Radius.full,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: Radius.full,
  },
});
