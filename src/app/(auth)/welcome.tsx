import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { Button } from '@/components/Button';
import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { Spacing } from '@/constants/theme';
import { useAppTheme } from '@/hooks/use-theme';
import { useAuthStore } from '@/store/useAuthStore';

export default function WelcomeScreen() {
  const router = useRouter();
  const colors = useAppTheme();
  const hasAccount = useAuthStore((state) => Boolean(state.account));

  return (
    <Screen>
      <View style={styles.inner}>
        <View style={styles.copy}>
          <Text variant="label" color="bronze">
            Private library
          </Text>
          <Text variant="display" italic>
            Simplify
          </Text>
          <View style={[styles.rule, { backgroundColor: colors.accent }]} />
          <Text variant="body" color="muted" style={styles.lede}>
            {hasAccount
              ? 'Your shelves are waiting. Sign in to keep reading where you left the ribbon.'
              : 'A quiet room for the books you keep. One account, on this device only.'}
          </Text>
        </View>

        <View style={styles.actions}>
          {hasAccount ? (
            <>
              <Button label="Sign in" onPress={() => router.push('/sign-in')} />
              <Button label="Create a new library" variant="ghost" onPress={() => router.push('/sign-up')} />
            </>
          ) : (
            <>
              <Button label="Create your library" onPress={() => router.push('/sign-up')} />
              <Button label="I already have one" variant="ghost" onPress={() => router.push('/sign-in')} />
            </>
          )}
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  inner: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 12,
  },
  copy: {
    paddingTop: 48,
  },
  rule: {
    width: 36,
    height: 2,
    marginTop: 12,
    marginBottom: 14,
    borderRadius: 2,
  },
  lede: {
    maxWidth: 320,
  },
  actions: {
    gap: Spacing.sm,
  },
});
