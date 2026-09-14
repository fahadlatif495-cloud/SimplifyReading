import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';
import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';

import { Fonts, Radius, Shadow } from '@/constants/theme';
import { coverInitials, coverPalette } from '@/lib/covers';

type CoverSize = 'sm' | 'md' | 'lg' | 'hero';

const SIZES: Record<CoverSize, { width: number; height: number; radius: number; title: number }> = {
  sm: { width: 64, height: 92, radius: Radius.sm, title: 11 },
  md: { width: 112, height: 162, radius: Radius.md, title: 13 },
  lg: { width: 132, height: 190, radius: Radius.md, title: 15 },
  hero: { width: 196, height: 286, radius: Radius.lg, title: 22 },
};

type Props = {
  title: string;
  author?: string;
  uri?: string;
  size?: CoverSize;
  width?: number;
  height?: number;
  style?: StyleProp<ViewStyle>;
};

export function BookCover({ title, author, uri, size = 'md', width, height, style }: Props) {
  const preset = SIZES[size];
  const w = width ?? preset.width;
  const h = height ?? preset.height;
  const [from, to] = coverPalette(title);
  const initials = coverInitials(title);

  return (
    <View
      style={[
        Shadow.card,
        { width: w, height: h, borderRadius: preset.radius, backgroundColor: '#2A2118' },
        style,
      ]}>
      {uri ? (
        <Image source={{ uri }} style={[styles.image, { borderRadius: preset.radius }]} contentFit="cover" />
      ) : (
        <LinearGradient colors={[from, to]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={[styles.image, { borderRadius: preset.radius }]}>
          <View style={styles.spine} />
          <Text style={[styles.initials, { fontSize: preset.title + 10 }]}>{initials}</Text>
          {size !== 'sm' ? (
            <View style={styles.meta}>
              <Text numberOfLines={2} style={[styles.title, { fontSize: preset.title }]}>
                {title}
              </Text>
              {author ? (
                <Text numberOfLines={1} style={styles.author}>
                  {author}
                </Text>
              ) : null}
            </View>
          ) : null}
        </LinearGradient>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    overflow: 'hidden',
    justifyContent: 'space-between',
    padding: 12,
  },
  spine: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 7,
    backgroundColor: 'rgba(255,255,255,0.18)',
  },
  initials: {
    color: 'rgba(255,255,255,0.88)',
    fontFamily: Fonts.displayBold,
    marginTop: 8,
    marginLeft: 6,
  },
  meta: {
    gap: 4,
    marginLeft: 6,
  },
  title: {
    color: '#FFF8EE',
    fontFamily: Fonts.display,
    lineHeight: 18,
  },
  author: {
    color: 'rgba(255,248,238,0.72)',
    fontFamily: Fonts.sans,
    fontSize: 10,
    letterSpacing: 0.4,
  },
});
