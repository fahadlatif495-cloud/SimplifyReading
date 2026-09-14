import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Alert, StyleSheet, View } from 'react-native';

import { Button } from '@/components/Button';
import { PressableScale } from '@/components/PressableScale';
import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { Fonts, Radius, Spacing } from '@/constants/theme';
import { useAppTheme } from '@/hooks/use-theme';
import { libraryStats } from '@/lib/library';
import { useAuthStore } from '@/store/useAuthStore';
import { useLibraryStore } from '@/store/useLibraryStore';
import { useSettingsStore } from '@/store/useSettingsStore';
import type { AppThemePreference } from '@/types/book';

const THEMES: { key: AppThemePreference; label: string }[] = [
  { key: 'light', label: 'Cream' },
  { key: 'dark', label: 'Ink' },
  { key: 'system', label: 'System' },
];

export default function ProfileScreen() {
  const router = useRouter();
  const colors = useAppTheme();
  const books = useLibraryStore((state) => state.books);
  const stats = libraryStats(books);
  const theme = useSettingsStore((state) => state.theme);
  const setTheme = useSettingsStore((state) => state.setTheme);
  const reader = useSettingsStore((state) => state.reader);
  const user = useAuthStore((state) => state.account?.user);
  const signOut = useAuthStore((state) => state.signOut);

  function onSignOut() {
    Alert.alert('Leave the library?', 'You can sign back in on this device. Books stay on the shelves.', [
      { text: 'Stay', style: 'cancel' },
      { text: 'Sign out', style: 'destructive', onPress: () => signOut() },
    ]);
  }

  return (
    <Screen scroll tabBar contentContainerStyle={styles.content}>
      <View>
        <Text variant="label" color="bronze">
          Reader
        </Text>
        <Text variant="display">{user?.name ?? 'Profile'}</Text>
        {user ? (
          <Text variant="caption" color="muted" style={styles.email}>
            {user.email}
          </Text>
        ) : null}
      </View>

      <View style={styles.stats}>
        <Stat value={stats.total} label="Books" />
        <Stat value={stats.reading} label="Reading" />
        <Stat value={stats.finished} label="Finished" />
      </View>

      <View style={styles.block}>
        <Text variant="label" color="muted">
          Appearance
        </Text>
        <View style={styles.row}>
          {THEMES.map((item) => {
            const active = theme === item.key;
            return (
              <PressableScale
                key={item.key}
                onPress={() => setTheme(item.key)}
                style={[
                  styles.theme,
                  {
                    backgroundColor: active ? colors.ink : colors.paper,
                    borderColor: colors.line,
                  },
                ]}>
                <Text variant="caption" style={{ color: active ? colors.paper : colors.muted, fontFamily: Fonts.sansMedium }}>
                  {item.label}
                </Text>
              </PressableScale>
            );
          })}
        </View>
      </View>

      <PressableScale
        onPress={() => router.push('/settings')}
        style={[styles.link, { backgroundColor: colors.paper, borderColor: colors.line }]}>
        <View>
          <Text variant="serif">Reading preferences</Text>
          <Text variant="caption" color="muted">
            {reader.mode} paper · {reader.fontSize}pt
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color={colors.muted} />
      </PressableScale>

      <Button label="Sign out" variant="outline" onPress={onSignOut} />

      <View style={[styles.about, { borderColor: colors.line }]}>
        <Text variant="label" color="bronze">
          About Simplify
        </Text>
        <Text variant="title" style={styles.aboutTitle}>
          Fewer things. Better pages.
        </Text>
        <Text variant="body" color="muted">
          Your account, books, and reading progress stay on this device.
        </Text>
      </View>
    </Screen>
  );
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <View style={styles.stat}>
      <Text variant="display">{value}</Text>
      <Text variant="label" color="muted">
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: Spacing.xl,
  },
  email: {
    marginTop: 6,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stat: {
    gap: 4,
  },
  block: {
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    gap: 8,
  },
  theme: {
    flex: 1,
    borderWidth: 1,
    borderRadius: Radius.full,
    alignItems: 'center',
    paddingVertical: 12,
    width: 90,
  },
  link: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.md,
    borderRadius: Radius.lg,
    borderWidth: 1,
  },
  about: {
    gap: 10,
    borderTopWidth: 1,
    paddingTop: Spacing.lg,
  },
  aboutTitle: {
    fontSize: 26,
  },
});
