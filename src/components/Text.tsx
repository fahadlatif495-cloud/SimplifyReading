import { StyleSheet, Text as RNText, type TextProps } from 'react-native';

import { Fonts, type ThemeColors } from '@/constants/theme';
import { fallbackFontFamily, useFontsReady } from '@/hooks/useFontsReady';
import { useAppTheme } from '@/hooks/use-theme';

export type TextVariant = 'display' | 'title' | 'body' | 'caption' | 'label' | 'serif';

type Props = TextProps & {
  variant?: TextVariant;
  color?: keyof ThemeColors | string;
  italic?: boolean;
};

export function Text({ variant = 'body', color = 'ink', italic, style, ...rest }: Props) {
  const colors = useAppTheme();
  const fontsReady = useFontsReady();
  const resolved = color in colors ? colors[color as keyof ThemeColors] : color;

  return (
    <RNText
      style={[
        styles[variant],
        italic && variant === 'display' ? styles.displayItalic : null,
        { color: resolved },
        style,
        !fontsReady ? { fontFamily: fallbackFontFamily() } : null,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  display: {
    fontFamily: Fonts.displayBold,
    fontSize: 40,
    lineHeight: 54,
    letterSpacing: -0.6,
    includeFontPadding: false,
    paddingBottom: 4,
  },
  displayItalic: {
    fontFamily: Fonts.displayItalic,
    lineHeight: 56,
    paddingBottom: 6,
  },
  title: {
    fontFamily: Fonts.display,
    fontSize: 28,
    lineHeight: 38,
    letterSpacing: -0.4,
    includeFontPadding: false,
    paddingBottom: 2,
  },
  serif: {
    fontFamily: Fonts.display,
    fontSize: 18,
    lineHeight: 28,
    includeFontPadding: false,
    paddingBottom: 1,
  },
  body: {
    fontFamily: Fonts.sans,
    fontSize: 16,
    lineHeight: 24,
  },
  caption: {
    fontFamily: Fonts.sans,
    fontSize: 13,
    lineHeight: 18,
  },
  label: {
    fontFamily: Fonts.sansMedium,
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
  },
});
