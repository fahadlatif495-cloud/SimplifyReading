import { CormorantGaramond_500Medium_Italic, CormorantGaramond_600SemiBold, CormorantGaramond_700Bold } from '@expo-google-fonts/cormorant-garamond';
import { DMSans_400Regular, DMSans_500Medium, DMSans_600SemiBold } from '@expo-google-fonts/dm-sans';
import { useFonts } from 'expo-font';
import { Stack, useRootNavigationState, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import * as SystemUI from 'expo-system-ui';
import { useEffect } from 'react';
import { Platform, StatusBar as RNStatusBar, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { useAuthReady } from '@/hooks/useAuthReady';
import { useAppTheme, useIsDarkTheme } from '@/hooks/use-theme';
import { useAuthStore } from '@/store/useAuthStore';

SplashScreen.preventAutoHideAsync().catch(() => undefined);

export const unstable_settings = {
  initialRouteName: '(auth)',
};

export default function RootLayout() {
  useFonts({
    CormorantGaramond_500Medium_Italic,
    CormorantGaramond_600SemiBold,
    CormorantGaramond_700Bold,
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_600SemiBold,
  });
  const colors = useAppTheme();
  const dark = useIsDarkTheme();
  const authReady = useAuthReady();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const segments = useSegments();
  const router = useRouter();
  const navigationState = useRootNavigationState();

  useEffect(() => {
    const hide = () => {
      SplashScreen.hideAsync().catch(() => undefined);
    };
    hide();
    const timeout = setTimeout(hide, 800);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    void SystemUI.setBackgroundColorAsync(colors.bg);
    if (Platform.OS === 'android') {
      RNStatusBar.setBackgroundColor(colors.bg);
      RNStatusBar.setBarStyle(dark ? 'light-content' : 'dark-content');
      RNStatusBar.setTranslucent(false);
    }
  }, [colors.bg, dark]);

  useEffect(() => {
    if (!authReady || !navigationState?.key) return;
    const inAuthGroup = segments[0] === '(auth)';
    if (!isAuthenticated && !inAuthGroup) {
      router.replace('/welcome');
    } else if (isAuthenticated && inAuthGroup) {
      router.replace('/');
    }
  }, [authReady, isAuthenticated, navigationState?.key, router, segments]);

  return (
    <GestureHandlerRootView style={[styles.flex, { backgroundColor: colors.bg }]}>
      <StatusBar style={dark ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.bg },
          animation: 'fade',
        }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="add-book" options={{ presentation: 'modal', animation: 'slide_from_bottom' }} />
        <Stack.Screen name="book/[id]" />
        <Stack.Screen name="reader/[id]" options={{ animation: 'fade' }} />
        <Stack.Screen name="search" options={{ animation: 'fade' }} />
        <Stack.Screen name="settings" />
      </Stack>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
});
