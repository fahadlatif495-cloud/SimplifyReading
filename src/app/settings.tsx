import { StyleSheet, View } from 'react-native';

import { BackButton } from '@/components/BackButton';
import { ReaderSettings } from '@/components/ReaderSettings';
import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { PressableScale } from '@/components/PressableScale';
import { Fonts, Radius, Spacing } from '@/constants/theme';
import { useAppTheme } from '@/hooks/use-theme';
import { useSettingsStore } from '@/store/useSettingsStore';
import type { AppThemePreference } from '@/types/book';
import { useState } from 'react';

const THEMES: { key: AppThemePreference; label: string; hint: string }[] = [
  { key: 'light', label: 'Cream library', hint: 'Warm paper, charcoal type' },
  { key: 'dark', label: 'Night ink', hint: 'Low light, quiet contrast' },
  { key: 'system', label: 'Match device', hint: 'Follows the phone' },
];

export default function SettingsScreen() {
  const colors = useAppTheme();
  const theme = useSettingsStore((state) => state.theme);
  const setTheme = useSettingsStore((state) => state.setTheme);
  const reader = useSettingsStore((state) => state.reader);
  const setReader = useSettingsStore((state) => state.setReader);
  const [readerOpen, setReaderOpen] = useState(false);

  return (
    <Screen scroll contentContainerStyle={styles.content}>
      <View style={styles.top}>
        <BackButton />
        <Text variant="label" color="muted">
          Preferences
        </Text>
        <View style={{ width: 40 }} />
      </View>
      <Text variant="display">Settings</Text>
      <Text variant="body" color="muted">
        Theme and type stay as you left them.
      </Text>

      <Text variant="label" color="muted">
        Library theme
      </Text>
      <View style={styles.list}>
        {THEMES.map((item) => {
          const active = theme === item.key;
          return (
            <PressableScale
              key={item.key}
              onPress={() => setTheme(item.key)}
              style={[
                styles.row,
                {
                  backgroundColor: colors.paper,
                  borderColor: active ? colors.accent : colors.line,
                },
              ]}>
              <View>
                <Text variant="serif">{item.label}</Text>
                <Text variant="caption" color="muted">
                  {item.hint}
                </Text>
              </View>
              <View style={[styles.radio, { borderColor: active ? colors.accent : colors.faint }]}>
                {active ? <View style={[styles.radioOn, { backgroundColor: colors.accent }]} /> : null}
              </View>
            </PressableScale>
          );
        })}
      </View>

      <PressableScale
        onPress={() => setReaderOpen(true)}
        style={[styles.row, { backgroundColor: colors.paper, borderColor: colors.line }]}>
        <View>
          <Text variant="serif">Reader defaults</Text>
          <Text variant="caption" color="muted">
            {reader.mode} · {reader.fontSize}pt · {reader.lineHeight.toFixed(1)} leading
          </Text>
        </View>
        <Text variant="caption" style={{ color: colors.accent, fontFamily: Fonts.sansMedium }}>
          Edit
        </Text>
      </PressableScale>

      <View style={[styles.about, { borderColor: colors.line }]}>
        <Text variant="label" color="bronze">
          About
        </Text>
        <Text variant="title">Simplify 1.0</Text>
        <Text variant="body" color="muted">
          A personal reading room. Books, progress, bookmarks, and preferences are stored locally with AsyncStorage.
        </Text>
      </View>

      <ReaderSettings visible={readerOpen} onClose={() => setReaderOpen(false)} settings={reader} onChange={setReader} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: Spacing.md,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  list: {
    gap: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.md,
    borderRadius: Radius.lg,
    borderWidth: 1,
  },
  radio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOn: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  about: {
    marginTop: 12,
    paddingTop: 18,
    borderTopWidth: 1,
    gap: 8,
  },
});
