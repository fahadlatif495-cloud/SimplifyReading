import type { ReactNode } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { Fonts, Radius, Spacing } from '@/constants/theme';
import { useAppTheme } from '@/hooks/use-theme';
import { PressableScale } from '@/components/PressableScale';
import { Text } from '@/components/Text';

type Variant = 'primary' | 'ghost' | 'outline' | 'soft';

type Props = {
  label: string;
  onPress?: () => void;
  variant?: Variant;
  disabled?: boolean;
  loading?: boolean;
  icon?: ReactNode;
};

export function Button({ label, onPress, variant = 'primary', disabled, loading, icon }: Props) {
  const colors = useAppTheme();
  const palettes = {
    primary: { bg: colors.ink, fg: colors.paper },
    ghost: { bg: 'transparent', fg: colors.ink },
    outline: { bg: 'transparent', fg: colors.ink },
    soft: { bg: colors.accentSoft, fg: colors.accentDeep },
  } as const;
  const palette = palettes[variant];

  return (
    <PressableScale
      onPress={onPress}
      disabled={disabled || loading}
      scaleTo={0.98}
      style={[
        styles.base,
        { backgroundColor: palette.bg, opacity: disabled ? 0.45 : 1 },
        variant === 'outline' && { borderWidth: 1, borderColor: colors.line },
      ]}>
      {loading ? (
        <ActivityIndicator color={palette.fg} />
      ) : (
        <View style={styles.row}>
          {icon}
          <Text variant="body" style={[styles.label, { color: palette.fg }]}>
            {label}
          </Text>
        </View>
      )}
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 52,
    borderRadius: Radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.lg,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  label: {
    fontFamily: Fonts.sansSemi,
    fontSize: 15,
  },
});
