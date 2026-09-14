import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BackButton } from '@/components/BackButton';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Text } from '@/components/Text';
import { Spacing } from '@/constants/theme';
import { useAppTheme } from '@/hooks/use-theme';
import { useAuthStore } from '@/store/useAuthStore';

export default function SignUpScreen() {
  const router = useRouter();
  const colors = useAppTheme();
  const insets = useSafeAreaInsets();
  const hasAccount = useAuthStore((state) => Boolean(state.account));
  const signUp = useAuthStore((state) => state.signUp);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit() {
    setError('');
    if (hasAccount) {
      Alert.alert('Replace this library account?', 'The current sign-in will be replaced on this device. Books stay.', [
        { text: 'Keep it', style: 'cancel' },
        {
          text: 'Replace',
          style: 'destructive',
          onPress: () => {
            void createAccount(true);
          },
        },
      ]);
      return;
    }
    await createAccount(false);
  }

  async function createAccount(replace: boolean) {
    setLoading(true);
    const result = await signUp(name, email, password, { replace });
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
            New library
          </Text>
          <View style={{ width: 40 }} />
        </View>
        <Text variant="display">Create account</Text>
        <Text variant="body" color="muted">
          Kept on this phone. No cloud, no feed.
        </Text>
        <Input label="Name" value={name} onChangeText={setName} autoCapitalize="words" />
        <Input
          label="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          autoComplete="email"
        />
        <Input label="Password" value={password} onChangeText={setPassword} secureTextEntry autoComplete="password-new" />
        {error ? (
          <Text variant="caption" color="accent">
            {error}
          </Text>
        ) : null}
        <Button label="Enter the library" onPress={onSubmit} loading={loading} />
        <Button label="I already have one" variant="ghost" onPress={() => router.replace('/sign-in')} />
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
