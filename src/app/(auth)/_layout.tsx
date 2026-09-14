import { Stack } from 'expo-router';

import { useAppTheme } from '@/hooks/use-theme';

export const unstable_settings = {
  initialRouteName: 'welcome',
};

export default function AuthLayout() {
  const colors = useAppTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.bg },
        animation: 'fade',
      }}
    />
  );
}
