import { Platform, type ViewStyle } from 'react-native';

export const Palette = {
  cream: '#F3EEE4',
  paper: '#FAF7F1',
  parchment: '#E8DFD0',
  ink: '#1C1814',
  inkSoft: '#3A342C',
  muted: '#7A7268',
  faint: '#A39A8E',
  line: 'rgba(28, 24, 20, 0.08)',
  accent: '#B85C38',
  accentSoft: '#E8C9B8',
  accentDeep: '#8E3B2F',
  bronze: '#A67C52',
  overlay: 'rgba(28, 24, 20, 0.46)',
} as const;

export const LightColors = {
  bg: Palette.cream,
  paper: Palette.paper,
  parchment: Palette.parchment,
  elevated: '#FFFDF9',
  ink: Palette.ink,
  inkSoft: Palette.inkSoft,
  muted: Palette.muted,
  faint: Palette.faint,
  line: Palette.line,
  accent: Palette.accent,
  accentSoft: Palette.accentSoft,
  accentDeep: Palette.accentDeep,
  bronze: Palette.bronze,
  overlay: Palette.overlay,
  tabBar: '#FBF8F2',
  progressTrack: 'rgba(28, 24, 20, 0.08)',
} as const;

export const DarkColors = {
  bg: '#141210',
  paper: '#1C1814',
  parchment: '#2A241C',
  elevated: '#241F1A',
  ink: '#F3EEE4',
  inkSoft: '#E4D9C8',
  muted: '#A89F93',
  faint: '#7C746A',
  line: 'rgba(243, 238, 228, 0.1)',
  accent: '#D48963',
  accentSoft: '#3A2A22',
  accentDeep: '#E8C9B8',
  bronze: '#C4A074',
  overlay: 'rgba(0, 0, 0, 0.56)',
  tabBar: '#1A1612',
  progressTrack: 'rgba(243, 238, 228, 0.12)',
} as const;

export type ThemeColors = { [K in keyof typeof LightColors]: string };

export const ReaderThemes = {
  light: {
    bg: '#FAF7F1',
    text: '#1C1814',
    muted: '#7A7268',
    chrome: 'rgba(250, 247, 241, 0.94)',
  },
  sepia: {
    bg: '#F0E2C4',
    text: '#3A2718',
    muted: '#8A6A48',
    chrome: 'rgba(240, 226, 196, 0.94)',
  },
  dark: {
    bg: '#12100E',
    text: '#E8DFD0',
    muted: '#A89F93',
    chrome: 'rgba(18, 16, 14, 0.94)',
  },
} as const;

export const Fonts = {
  display: 'CormorantGaramond_600SemiBold',
  displayBold: 'CormorantGaramond_700Bold',
  displayItalic: 'CormorantGaramond_500Medium_Italic',
  sans: 'DMSans_400Regular',
  sansMedium: 'DMSans_500Medium',
  sansSemi: 'DMSans_600SemiBold',
  serifFallback: Platform.select({ ios: 'Georgia', android: 'serif', default: 'Georgia' }) ?? 'Georgia',
} as const;

export const Radius = {
  sm: 10,
  md: 16,
  lg: 22,
  xl: 28,
  full: 999,
} as const;

export const Spacing = {
  xs: 6,
  sm: 10,
  md: 16,
  screen: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

function cardShadow(offsetY: number, opacity: number, radius: number, elevation: number): ViewStyle {
  if (Platform.OS === 'web') {
    return { boxShadow: `0 ${offsetY}px ${radius}px rgba(28, 24, 20, ${opacity})` } as ViewStyle;
  }
  return {
    shadowColor: '#1C1814',
    shadowOffset: { width: 0, height: offsetY },
    shadowOpacity: opacity,
    shadowRadius: radius,
    elevation,
  };
}

export const Shadow = {
  card: cardShadow(10, 0.08, 18, 4),
  soft: cardShadow(6, 0.06, 12, 3),
  float: cardShadow(14, 0.12, 24, 8),
} as const;

export const TabBarHeight = 78;
