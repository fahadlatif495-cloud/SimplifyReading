import { ActivityIndicator, Image, StyleSheet, View } from 'react-native';

import { Text } from '@/components/Text';
import { Palette } from '@/constants/theme';

/** Centered mark + name. Logo uses contain so it is never cropped. */
export function AppSplash() {
  return (
    <View style={styles.wrap}>
      <View style={styles.brand}>
        <Image
          source={require('../../assets/images/splash-icon.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text variant="display" italic style={styles.title}>
          Simplify
        </Text>
        <View style={styles.rule} />
        <Text variant="label" color="bronze">
          Private library
        </Text>
        <View style={styles.loading}>
          <ActivityIndicator color={Palette.accent} />
          <Text variant="caption" color="muted">
            Loading your library
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: Palette.cream,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brand: {
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  logo: {
    width: 268,
    height: 200,
  },
  title: {
    marginTop: 18,
    textAlign: 'center',
    color: Palette.ink,
  },
  rule: {
    width: 36,
    height: 2,
    borderRadius: 2,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: Palette.accent,
  },
  loading: {
    marginTop: 28,
    alignItems: 'center',
    gap: 10,
  },
});
