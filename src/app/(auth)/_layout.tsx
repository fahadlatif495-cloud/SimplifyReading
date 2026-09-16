import { Stack } from 'expo-router';

import { useAppTheme } from '@/hooks/use-theme';

export const unstable_settings = {
  anchor: 'welcome',
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
      }}>
      <Stack.Screen name="welcome" />
      <Stack.Screen name="sign-in" />
      <Stack.Screen name="sign-up" />
    </Stack>
  );
}
