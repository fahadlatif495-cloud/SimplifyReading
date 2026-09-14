import { StyleSheet, TextInput, View, type TextInputProps } from 'react-native';

import { Fonts, Radius, Spacing } from '@/constants/theme';
import { useAppTheme } from '@/hooks/use-theme';
import { Text } from '@/components/Text';

type Props = TextInputProps & {
  label: string;
  error?: string;
};

export function Input({ label, error, style, multiline, ...rest }: Props) {
  const colors = useAppTheme();

  return (
    <View style={styles.wrap}>
      <Text variant="label" color="muted">
        {label}
      </Text>
      <TextInput
        placeholderTextColor={colors.faint}
        multiline={multiline}
        textAlignVertical={multiline ? 'top' : 'center'}
        style={[
          styles.field,
          {
            color: colors.ink,
            backgroundColor: colors.paper,
            borderColor: error ? colors.accent : colors.line,
            minHeight: multiline ? 120 : 52,
          },
          style,
        ]}
        {...rest}
      />
      {error ? (
        <Text variant="caption" color="accent">
          {error}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: 8,
  },
  field: {
    borderWidth: 1,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: 14,
    fontFamily: Fonts.sans,
    fontSize: 16,
  },
});
