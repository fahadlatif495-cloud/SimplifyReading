import { Ionicons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

import { Radius } from '@/constants/theme';
import { useAppTheme } from '@/hooks/use-theme';
import { PressableScale } from '@/components/PressableScale';

type Props = {
  onPress?: () => void;
};

export function BackButton({ onPress }: Props) {
  const colors = useAppTheme();
  const router = useRouter();

  return (
    <PressableScale
      onPress={onPress ?? (() => router.back())}
      style={[styles.btn, { backgroundColor: colors.paper, borderColor: colors.line }]}>
      <Ionicons name="chevron-back" size={20} color={colors.ink} />
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  btn: {
    width: 40,
    height: 40,
    borderRadius: Radius.full,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
