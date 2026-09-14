import { StyleSheet, View } from 'react-native';

import { Fonts, Radius, Spacing } from '@/constants/theme';
import type { ReaderMode, ReaderSettings } from '@/types/book';
import { BottomSheet } from '@/components/BottomSheet';
import { PressableScale } from '@/components/PressableScale';
import { Text } from '@/components/Text';
import { useAppTheme } from '@/hooks/use-theme';

type Props = {
  visible: boolean;
  onClose: () => void;
  settings: ReaderSettings;
  onChange: (patch: Partial<ReaderSettings>) => void;
};

const MODES: { key: ReaderMode; label: string; bg: string }[] = [
  { key: 'light', label: 'Light', bg: '#FAF7F1' },
  { key: 'sepia', label: 'Sepia', bg: '#F0E2C4' },
  { key: 'dark', label: 'Dark', bg: '#12100E' },
];

export function ReaderSettings({ visible, onClose, settings, onChange }: Props) {
  const colors = useAppTheme();

  return (
    <BottomSheet visible={visible} onClose={onClose} title="Reading room">
      <Text variant="label" color="muted">
        Type size
      </Text>
      <View style={styles.stepper}>
        <Stepper label="A" small onPress={() => onChange({ fontSize: clamp(settings.fontSize - 1, 16, 28) })} />
        <Text variant="body">{settings.fontSize} pt</Text>
        <Stepper label="A" onPress={() => onChange({ fontSize: clamp(settings.fontSize + 1, 16, 28) })} />
      </View>

      <Text variant="label" color="muted">
        Line height
      </Text>
      <View style={styles.stepper}>
        <Stepper label="Tight" small onPress={() => onChange({ lineHeight: clamp(Number((settings.lineHeight - 0.1).toFixed(1)), 1.4, 2) })} />
        <Text variant="body">{settings.lineHeight.toFixed(1)}</Text>
        <Stepper label="Airy" onPress={() => onChange({ lineHeight: clamp(Number((settings.lineHeight + 0.1).toFixed(1)), 1.4, 2) })} />
      </View>

      <Text variant="label" color="muted">
        Paper
      </Text>
      <View style={styles.modes}>
        {MODES.map((mode) => {
          const active = settings.mode === mode.key;
          return (
            <PressableScale
              key={mode.key}
              onPress={() => onChange({ mode: mode.key })}
              style={[
                styles.mode,
                {
                  backgroundColor: mode.bg,
                  borderColor: active ? colors.accent : colors.line,
                  borderWidth: active ? 2 : 1,
                },
              ]}>
              <Text variant="caption" style={{ color: mode.key === 'dark' ? '#E8DFD0' : '#1C1814' }}>
                {mode.label}
              </Text>
            </PressableScale>
          );
        })}
      </View>
    </BottomSheet>
  );
}

function Stepper({ label, onPress, small }: { label: string; onPress: () => void; small?: boolean }) {
  const colors = useAppTheme();
  return (
    <PressableScale onPress={onPress} style={[styles.step, { borderColor: colors.line }]}>
      <Text style={{ fontFamily: Fonts.display, fontSize: small ? 16 : 22, color: colors.ink }}>{label}</Text>
    </PressableScale>
  );
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

const styles = StyleSheet.create({
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  step: {
    minWidth: 88,
    height: 48,
    borderRadius: Radius.full,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.md,
  },
  modes: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 12,
  },
  mode: {
    flex: 1,
    height: 64,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
