import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { ContinueReadingCard } from '@/components/ContinueReadingCard';
import { EmptyState } from '@/components/EmptyState';
import { HorizontalBooks } from '@/components/HorizontalBooks';
import { PressableScale } from '@/components/PressableScale';
import { Screen } from '@/components/Screen';
import { SearchBar } from '@/components/SearchBar';
import { SectionHeader } from '@/components/SectionHeader';
import { Text } from '@/components/Text';
import { Spacing } from '@/constants/theme';
import { useAppTheme } from '@/hooks/use-theme';
import { greetingForHour } from '@/lib/format';
import { continueReading, finishedBooks, recentlyAdded, recentlyRead } from '@/lib/library';
import { useAuthStore } from '@/store/useAuthStore';
import { useLibraryStore } from '@/store/useLibraryStore';

export default function HomeScreen() {
  const router = useRouter();
  const colors = useAppTheme();
  const books = useLibraryStore((state) => state.books);
  const reading = continueReading(books);
  const added = recentlyAdded(books);
  const read = recentlyRead(books);
  const finished = finishedBooks(books);

  if (books.length === 0) {
    return (
      <Screen scroll tabBar>
        <HomeHeader />
        <EmptyState
          title="Your shelves are waiting"
          body="Add the first book you want to live with. Covers, pages, and quiet progress — all kept on this device."
          actionLabel="Add Your First Book"
          onAction={() => router.push('/add-book')}
        />
      </Screen>
    );
  }

  return (
    <Screen scroll tabBar contentContainerStyle={styles.content}>
      <HomeHeader />
      <PressableScale onPress={() => router.push('/search')}>
        <View pointerEvents="none">
          <SearchBar value="" onChangeText={() => undefined} editable={false} />
        </View>
      </PressableScale>

      {reading[0] ? (
        <View style={styles.section}>
          <SectionHeader eyebrow="Pick up the thread" title="Continue reading" />
          <ContinueReadingCard book={reading[0]} />
        </View>
      ) : null}

      {added.length > 0 ? (
        <View style={styles.section}>
          <SectionHeader
            eyebrow="New on the shelf"
            title="Recently added"
            actionLabel="Library"
            onAction={() => router.push('/library')}
          />
          <HorizontalBooks books={added} />
        </View>
      ) : null}

      {read.length > 0 ? (
        <View style={styles.section}>
          <SectionHeader eyebrow="Still warm" title="Recently read" />
          <HorizontalBooks books={read} size="sm" />
        </View>
      ) : null}

      {finished.length > 0 ? (
        <View style={styles.section}>
          <SectionHeader eyebrow="Closed with care" title="Finished" />
          <HorizontalBooks books={finished} />
        </View>
      ) : null}

      <View style={[styles.footer, { borderColor: colors.line }]}>
        <Text variant="caption" color="muted">
          A quieter place to keep what you read.
        </Text>
      </View>
    </Screen>
  );
}

function HomeHeader() {
  const router = useRouter();
  const colors = useAppTheme();
  const firstName = useAuthStore((state) => state.account?.user?.name?.split(' ')[0]);

  return (
    <View style={styles.header}>
      <View style={styles.headerCopy}>
        <Text variant="label" color="bronze">
          {firstName ? `${greetingForHour()}, ${firstName}` : greetingForHour()}
        </Text>
        <Text variant="display" italic>
          Simplify
        </Text>
        <View style={[styles.rule, { backgroundColor: colors.accent }]} />
        <Text variant="body" color="muted" style={styles.lede}>
          A private library. Nothing extra.
        </Text>
      </View>
      <PressableScale
        onPress={() => router.push('/add-book')}
        style={[styles.add, { backgroundColor: colors.ink }]}>
        <Ionicons name="add" size={22} color={colors.paper} />
      </PressableScale>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: Spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerCopy: {
    flex: 1,
    paddingRight: 16,
  },
  rule: {
    width: 36,
    height: 2,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 2,
  },
  lede: {
    maxWidth: 240,
  },
  add: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  section: {
    gap: 8,
  },
  footer: {
    borderTopWidth: 1,
    paddingTop: 18,
    marginTop: 8,
  },
});
