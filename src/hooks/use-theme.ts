import { DarkColors, LightColors, type ThemeColors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useSettingsStore } from '@/store/useSettingsStore';

export function useAppTheme(): ThemeColors {
  const preference = useSettingsStore((state) => state.theme);
  const system = useColorScheme();
  const isDark = preference === 'dark' || (preference === 'system' && system === 'dark');
  return isDark ? DarkColors : LightColors;
}

export function useIsDarkTheme(): boolean {
  const preference = useSettingsStore((state) => state.theme);
  const system = useColorScheme();
  return preference === 'dark' || (preference === 'system' && system === 'dark');
}

export const useTheme = useAppTheme;
