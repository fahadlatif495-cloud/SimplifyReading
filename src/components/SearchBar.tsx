import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, TextInput, View } from 'react-native';

import { Fonts, Radius, Spacing } from '@/constants/theme';
import { useAppTheme } from '@/hooks/use-theme';
import { PressableScale } from '@/components/PressableScale';

type Props = {
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
  onFocus?: () => void;
  editable?: boolean;
};

export function SearchBar({
  value,
  onChangeText,
  placeholder = 'Search your shelves',
  autoFocus,
  onFocus,
  editable = true,
}: Props) {
  const colors = useAppTheme();

  return (
    <View style={[styles.wrap, { backgroundColor: colors.paper, borderColor: colors.line }]}>
      <Ionicons name="search" size={18} color={colors.muted} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.faint}
        autoFocus={autoFocus}
        onFocus={onFocus}
        editable={editable}
        style={[styles.input, { color: colors.ink }]}
      />
      {value.length > 0 ? (
        <PressableScale onPress={() => onChangeText('')} hitSlop={8}>
          <Ionicons name="close-circle" size={18} color={colors.faint} />
        </PressableScale>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    minHeight: 52,
    borderRadius: Radius.full,
    borderWidth: 1,
    paddingHorizontal: Spacing.md,
  },
  input: {
    flex: 1,
    fontFamily: Fonts.sans,
    fontSize: 16,
    paddingVertical: 12,
  },
});
