import { CormorantGaramond_500Medium_Italic, CormorantGaramond_600SemiBold, CormorantGaramond_700Bold } from '@expo-google-fonts/cormorant-garamond';
import { DMSans_400Regular, DMSans_500Medium, DMSans_600SemiBold } from '@expo-google-fonts/dm-sans';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import * as SystemUI from 'expo-system-ui';
import { useEffect, useState } from 'react';
import { Platform, StatusBar as RNStatusBar, StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { AppSplash } from '@/components/AppSplash';
import { useAppTheme, useIsDarkTheme } from '@/hooks/use-theme';
import { useAuthReady } from '@/hooks/useAuthReady';
import { FontsReadyContext } from '@/hooks/useFontsReady';
import { useAuthStore } from '@/store/useAuthStore';

SplashScreen.preventAutoHideAsync().catch(() => undefined);

export const unstable_settings = {
  anchor: '(auth)',
  initialRouteName: '(auth)',
};

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
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
  const [splashMinElapsed, setSplashMinElapsed] = useState(false);

  useEffect(() => {
    if (!authReady) return;
    SplashScreen.hideAsync().catch(() => undefined);
    const timeout = setTimeout(() => setSplashMinElapsed(true), 1800);
    return () => clearTimeout(timeout);
  }, [authReady]);

  useEffect(() => {
    void SystemUI.setBackgroundColorAsync(colors.bg);
    if (Platform.OS === 'android') {
      RNStatusBar.setBackgroundColor(colors.bg);
      RNStatusBar.setBarStyle(dark ? 'light-content' : 'dark-content');
      RNStatusBar.setTranslucent(false);
    }
  }, [colors.bg, dark]);

  return (
    <FontsReadyContext.Provider value={fontsLoaded}>
      <GestureHandlerRootView style={[styles.flex, { backgroundColor: colors.bg }]}>
        <StatusBar style={dark ? 'light' : 'dark'} />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: colors.bg },
            animation: 'fade',
          }}>
          <Stack.Protected guard={!isAuthenticated}>
            <Stack.Screen name="(auth)" />
          </Stack.Protected>
          <Stack.Protected guard={isAuthenticated}>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="add-book" options={{ presentation: 'modal', animation: 'slide_from_bottom' }} />
            <Stack.Screen name="book/[id]" />
            <Stack.Screen name="reader/[id]" options={{ animation: 'fade' }} />
            <Stack.Screen name="search" options={{ animation: 'fade' }} />
            <Stack.Screen name="settings" />
          </Stack.Protected>
        </Stack>
        {!splashMinElapsed || !authReady ? (
          <View style={StyleSheet.absoluteFill} pointerEvents="auto">
            <AppSplash />
          </View>
        ) : null}
      </GestureHandlerRootView>
    </FontsReadyContext.Provider>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
});
