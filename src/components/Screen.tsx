import { type ReactNode } from 'react';
import { ScrollView, StyleSheet, View, type ScrollViewProps, type ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Spacing, TabBarHeight } from '@/constants/theme';
import { useAppTheme } from '@/hooks/use-theme';

type Props = {
  children: ReactNode;
  scroll?: boolean;
  padded?: boolean;
  tabBar?: boolean;
  contentContainerStyle?: ScrollViewProps['contentContainerStyle'];
  style?: ViewStyle;
};

export function Screen({ children, scroll, padded = true, tabBar, contentContainerStyle, style }: Props) {
  const colors = useAppTheme();
  const padding = {
    paddingHorizontal: padded ? Spacing.screen : 0,
    paddingTop: 20,
    paddingBottom: (tabBar ? TabBarHeight + 40 : 16) + 8,
  };

  if (scroll) {
    return (
      <SafeAreaView style={[styles.flex, { backgroundColor: colors.bg }]} edges={['top']}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={[padding, contentContainerStyle]}
          style={style}>
          {children}
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.flex, { backgroundColor: colors.bg }, style]} edges={['top']}>
      <View style={[styles.flex, padding]}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});
