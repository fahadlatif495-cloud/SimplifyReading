import { Link, Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { Text } from '@/components/Text';
import { useAppTheme } from '@/hooks/use-theme';

export default function NotFoundScreen() {
  const colors = useAppTheme();

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={[styles.wrap, { backgroundColor: colors.bg }]}>
        <Text variant="display">Lost the page</Text>
        <Text variant="body" color="muted">
          That route is not in this library.
        </Text>
        <Link href="/" style={{ marginTop: 16 }}>
          <Text variant="body" color="accent">
            Return home
          </Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    gap: 8,
  },
});
