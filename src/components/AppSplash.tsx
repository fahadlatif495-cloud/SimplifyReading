import { Image, StyleSheet, View } from 'react-native';

import { Palette } from '@/constants/theme';

/** Same full-screen art as the native splash so the handoff does not jump. */
export function AppSplash() {
  return (
    <View style={styles.wrap}>
      <Image
        source={require('../../assets/images/splash-screen.png')}
        style={StyleSheet.absoluteFillObject}
        resizeMode="cover"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: Palette.cream,
  },
});
