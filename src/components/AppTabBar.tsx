import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { PressableScale } from '@/components/PressableScale';
import { Text } from '@/components/Text';
import { Fonts, Shadow } from '@/constants/theme';
import { useAppTheme } from '@/hooks/use-theme';

type TabRoute = {
  key: string;
  name: string;
};

type TabBarProps = {
  state: {
    index: number;
    routes: TabRoute[];
  };
  descriptors: Record<string, { options: { title?: string } }>;
  navigation: {
    emit: (event: { type: 'tabPress'; target: string; canPreventDefault: true }) => {
      defaultPrevented: boolean;
    };
    navigate: (name: string) => void;
  };
};

const ICONS: Record<string, keyof typeof Ionicons.glyphMap> = {
  index: 'home-outline',
  library: 'library-outline',
  bookmarks: 'bookmark-outline',
  profile: 'person-outline',
};

const ACTIVE: Record<string, keyof typeof Ionicons.glyphMap> = {
  index: 'home',
  library: 'library',
  bookmarks: 'bookmark',
  profile: 'person',
};

export function AppTabBar({ state, descriptors, navigation }: TabBarProps) {
  const colors = useAppTheme();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrap, { paddingBottom: Math.max(insets.bottom, 12) }]} pointerEvents="box-none">
      <View style={[styles.bar, { backgroundColor: colors.tabBar, borderColor: colors.line }, Shadow.float]}>
        {state.routes.map((route, index) => {
          const selected = state.index === index;
          const options = descriptors[route.key]?.options ?? {};
          const label = options.title ?? route.name;
          const icon = selected ? ACTIVE[route.name] : ICONS[route.name];

          return (
            <View key={route.key} style={styles.itemWrap}>
              <PressableScale
                onPress={() => {
                  const event = navigation.emit({
                    type: 'tabPress',
                    target: route.key,
                    canPreventDefault: true,
                  });
                  if (!selected && !event.defaultPrevented) {
                    navigation.navigate(route.name);
                  }
                }}
                style={styles.item}>
                <Ionicons name={icon ?? 'ellipse-outline'} size={22} color={selected ? colors.accent : colors.muted} />
                <Text
                  variant="caption"
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  minimumFontScale={0.75}
                  style={[
                    styles.label,
                    { color: selected ? colors.ink : colors.muted, fontFamily: selected ? Fonts.sansSemi : Fonts.sans },
                  ]}>
                  {label}
                </Text>
              </PressableScale>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 28,
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 6,
    gap: 4,
  },
  itemWrap: {
    flex: 1,
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: 8,
    paddingHorizontal: 4,
    minHeight: 52,
  },
  label: {
    fontSize: 10,
    letterSpacing: 0,
    width: '100%',
    textAlign: 'center',
  },
});
