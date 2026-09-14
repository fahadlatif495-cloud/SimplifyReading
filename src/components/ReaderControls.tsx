import { Ionicons } from '@expo/vector-icons';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { PressableScale } from '@/components/PressableScale';
import { Text } from '@/components/Text';
import { Fonts, Radius, Spacing } from '@/constants/theme';

type Props = {
  visible: boolean;
  page: number;
  totalPages: number;
  percent: number;
  bookmarked: boolean;
  onBack: () => void;
  onBookmark: () => void;
  onSettings: () => void;
  onPrev: () => void;
  onNext: () => void;
  colors: {
    text: string;
    muted: string;
    chrome: string;
  };
};

export function ReaderControls({
  visible,
  page,
  totalPages,
  percent,
  bookmarked,
  onBack,
  onBookmark,
  onSettings,
  onPrev,
  onNext,
  colors,
}: Props) {
  const insets = useSafeAreaInsets();
  const opacity = useSharedValue(visible ? 1 : 0);

  useEffect(() => {
    opacity.value = withTiming(visible ? 1 : 0, { duration: 200 });
  }, [opacity, visible]);

  const fadeStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return (
    <>
      <Animated.View
        pointerEvents={visible ? 'auto' : 'none'}
        style={[styles.top, { backgroundColor: colors.chrome, paddingTop: insets.top + 8 }, fadeStyle]}>
        <PressableScale onPress={onBack} hitSlop={10} style={styles.icon}>
          <Ionicons name="chevron-back" size={22} color={colors.text} />
        </PressableScale>
        <Text variant="caption" style={{ color: colors.muted }}>
          {percent}%
        </Text>
        <View style={styles.topRight}>
          <PressableScale onPress={onBookmark} hitSlop={10} style={styles.icon}>
            <Ionicons name={bookmarked ? 'bookmark' : 'bookmark-outline'} size={20} color={colors.text} />
          </PressableScale>
          <PressableScale onPress={onSettings} hitSlop={10} style={styles.icon}>
            <Ionicons name="text-outline" size={20} color={colors.text} />
          </PressableScale>
        </View>
      </Animated.View>

      <Animated.View
        pointerEvents={visible ? 'auto' : 'none'}
        style={[styles.bottom, { backgroundColor: colors.chrome, paddingBottom: Math.max(insets.bottom, 16) }, fadeStyle]}>
        <PressableScale onPress={onPrev} disabled={page <= 1} style={styles.pageBtn}>
          <Ionicons name="chevron-back" size={16} color={page <= 1 ? colors.muted : colors.text} />
          <Text variant="caption" style={{ color: page <= 1 ? colors.muted : colors.text }}>
            Prev
          </Text>
        </PressableScale>
        <Text variant="caption" style={[styles.folio, { color: colors.muted }]}>
          {page}  ·  {totalPages}
        </Text>
        <PressableScale onPress={onNext} disabled={page >= totalPages} style={styles.pageBtn}>
          <Text variant="caption" style={{ color: page >= totalPages ? colors.muted : colors.text }}>
            Next
          </Text>
          <Ionicons name="chevron-forward" size={16} color={page >= totalPages ? colors.muted : colors.text} />
        </PressableScale>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  top: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingTop: 8,
    paddingBottom: 14,
  },
  topRight: {
    flexDirection: 'row',
    gap: 4,
  },
  icon: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Radius.full,
  },
  bottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingTop: 14,
    paddingBottom: 16,
  },
  pageBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    minWidth: 64,
  },
  folio: {
    fontFamily: Fonts.sansMedium,
    letterSpacing: 1,
  },
});
