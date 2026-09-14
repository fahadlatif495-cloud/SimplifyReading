import { useRouter } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BackButton } from '@/components/BackButton';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Text } from '@/components/Text';
import { Spacing } from '@/constants/theme';
import { useAppTheme } from '@/hooks/use-theme';
import { useAuthStore } from '@/store/useAuthStore';

export default function SignInScreen() {
  const router = useRouter();
  const colors = useAppTheme();
  const insets = useSafeAreaInsets();
  const signIn = useAuthStore((state) => state.signIn);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit() {
    setError('');
    setLoading(true);
    const result = await signIn(email, password);
    setLoading(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    router.replace('/');
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: colors.bg }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={[styles.content, { paddingTop: insets.top + 20, paddingBottom: insets.bottom + 24 }]}>
        <View style={styles.top}>
          <BackButton />
          <Text variant="label" color="muted">
            Return
          </Text>
          <View style={{ width: 40 }} />
        </View>
        <Text variant="display">Sign in</Text>
        <Text variant="body" color="muted">
          Unlock the shelves on this device.
        </Text>
        <Input
          label="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          autoComplete="email"
        />
        <Input label="Password" value={password} onChangeText={setPassword} secureTextEntry autoComplete="password" />
        {error ? (
          <Text variant="caption" color="accent">
            {error}
          </Text>
        ) : null}
        <Button label="Continue reading" onPress={onSubmit} loading={loading} />
        <Button label="Create a library" variant="ghost" onPress={() => router.replace('/sign-up')} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: Spacing.screen,
    gap: Spacing.md,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
