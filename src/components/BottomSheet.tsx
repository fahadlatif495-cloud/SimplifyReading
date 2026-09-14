import { type ReactNode } from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeOut, SlideInDown, SlideOutDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Radius, Spacing } from '@/constants/theme';
import { useAppTheme } from '@/hooks/use-theme';
import { Text } from '@/components/Text';

type Props = {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
};

export function BottomSheet({ visible, onClose, title, children }: Props) {
  const colors = useAppTheme();
  const insets = useSafeAreaInsets();

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
      <View style={styles.root}>
        <Animated.View entering={FadeIn.duration(180)} exiting={FadeOut.duration(160)} style={StyleSheet.absoluteFill}>
          <Pressable style={[styles.overlay, { backgroundColor: colors.overlay }]} onPress={onClose} />
        </Animated.View>
        <Animated.View
          entering={SlideInDown.springify().damping(18)}
          exiting={SlideOutDown.duration(220)}
          style={[
            styles.sheet,
            {
              backgroundColor: colors.paper,
              paddingBottom: Math.max(insets.bottom, 20),
            },
          ]}>
          <View style={[styles.handle, { backgroundColor: colors.line }]} />
          {title ? (
            <Text variant="title" style={styles.title}>
              {title}
            </Text>
          ) : null}
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlay: {
    flex: 1,
  },
  sheet: {
    borderTopLeftRadius: Radius.xl,
    borderTopRightRadius: Radius.xl,
    paddingHorizontal: Spacing.lg,
    paddingTop: 10,
    gap: Spacing.md,
  },
  handle: {
    alignSelf: 'center',
    width: 42,
    height: 4,
    borderRadius: Radius.full,
    marginBottom: 8,
  },
  title: {
    marginBottom: 4,
  },
});
