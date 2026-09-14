import * as Haptics from 'expo-haptics';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/Button';
import { ReaderControls } from '@/components/ReaderControls';
import { ReaderSettings } from '@/components/ReaderSettings';
import { Fonts, ReaderThemes } from '@/constants/theme';
import { paginateContent, readingProgress } from '@/lib/pages';
import { useLibraryStore } from '@/store/useLibraryStore';
import { useSettingsStore } from '@/store/useSettingsStore';

export default function ReaderScreen() {
  const { id, page: pageParam } = useLocalSearchParams<{ id: string; page?: string }>();
  const bookId = Array.isArray(id) ? id[0] : id;
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const book = useLibraryStore((state) => state.books.find((item) => item.id === bookId));
  const setCurrentPage = useLibraryStore((state) => state.setCurrentPage);
  const toggleBookmark = useLibraryStore((state) => state.toggleBookmark);
  const bookmarkedPages = useLibraryStore((state) =>
    state.bookmarks.filter((item) => item.bookId === bookId).map((item) => item.page),
  );
  const reader = useSettingsStore((state) => state.reader);
  const setReader = useSettingsStore((state) => state.setReader);
  const [controls, setControls] = useState(true);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const pages = useMemo(
    () => (book ? paginateContent(book.content, book.totalPages) : ['']),
    [book],
  );

  useEffect(() => {
    if (!book) return;
    const requested = Number(Array.isArray(pageParam) ? pageParam[0] : pageParam);
    if (Number.isFinite(requested) && requested >= 1) {
      if (book.currentPage !== requested) {
        setCurrentPage(book.id, requested);
      }
      return;
    }
    if (book.status === 'unread') {
      setCurrentPage(book.id, Math.max(1, book.currentPage));
    }
  }, [book, pageParam, setCurrentPage]);

  if (!book) {
    return (
      <View style={[styles.missing, { paddingTop: insets.top + 16 }]}>
        <Text style={styles.missingTitle}>Missing pages</Text>
        <Button label="Go back" onPress={() => router.back()} />
      </View>
    );
  }

  const current = book;
  const page = current.currentPage;
  const theme = ReaderThemes[reader.mode];
  const percent = readingProgress(page, current.totalPages);
  const bookmarked = bookmarkedPages.includes(page);

  function goTo(next: number) {
    setCurrentPage(current.id, Math.min(current.totalPages, Math.max(1, next)));
  }

  return (
    <View style={[styles.root, { backgroundColor: theme.bg }]}>
      <ReaderControls
        visible={controls}
        page={page}
        totalPages={current.totalPages}
        percent={percent}
        bookmarked={bookmarked}
        onBack={() => router.back()}
        onBookmark={() => {
          toggleBookmark(current.id, page);
          void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        }}
        onSettings={() => setSettingsOpen(true)}
        onPrev={() => goTo(page - 1)}
        onNext={() => goTo(page + 1)}
        colors={theme}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.pageContent,
          { paddingTop: insets.top + 72, paddingBottom: insets.bottom + 88 },
        ]}>
        <Pressable onPress={() => setControls((value) => !value)}>
          <Animated.Text
            key={page}
            entering={FadeIn.duration(200)}
            style={{
              color: theme.text,
              fontFamily: Fonts.display,
              fontSize: reader.fontSize,
              lineHeight: reader.fontSize * reader.lineHeight,
            }}>
            {pages[page - 1] || 'This page is blank.'}
          </Animated.Text>
        </Pressable>
      </ScrollView>

      <Pressable accessibilityLabel="Previous page" style={styles.leftHit} onPress={() => goTo(page - 1)} />
      <Pressable accessibilityLabel="Next page" style={styles.rightHit} onPress={() => goTo(page + 1)} />

      <ReaderSettings
        visible={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        settings={reader}
        onChange={setReader}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  missing: {
    flex: 1,
    padding: 24,
    gap: 16,
    backgroundColor: '#F3EEE4',
  },
  missingTitle: {
    fontFamily: Fonts.displayBold,
    fontSize: 32,
    color: '#1C1814',
  },
  pageContent: {
    paddingHorizontal: 16,
  },
  leftHit: {
    position: 'absolute',
    left: 0,
    top: 110,
    bottom: 110,
    width: '18%',
  },
  rightHit: {
    position: 'absolute',
    right: 0,
    top: 110,
    bottom: 110,
    width: '18%',
  },
});
