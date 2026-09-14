import * as Haptics from 'expo-haptics';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BackButton } from '@/components/BackButton';
import { BookCover } from '@/components/BookCover';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { PressableScale } from '@/components/PressableScale';
import { Text } from '@/components/Text';
import { Fonts, Radius, Spacing } from '@/constants/theme';
import { useAppTheme } from '@/hooks/use-theme';
import { persistCoverUri } from '@/lib/media';
import { suggestedPageCount } from '@/lib/pages';
import { useLibraryStore } from '@/store/useLibraryStore';
import { BOOK_CATEGORIES } from '@/types/book';

type Errors = Partial<Record<'title' | 'author' | 'content' | 'pages', string>>;

export default function AddBookScreen() {
  const router = useRouter();
  const colors = useAppTheme();
  const insets = useSafeAreaInsets();
  const addBook = useLibraryStore((state) => state.addBook);

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<string>('Classic');
  const [pages, setPages] = useState('');
  const [content, setContent] = useState('');
  const [coverUri, setCoverUri] = useState<string>();
  const [errors, setErrors] = useState<Errors>({});
  const [saving, setSaving] = useState(false);

  async function pickCover() {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Photos needed', 'Allow photo access to choose a cover.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [2, 3],
      quality: 0.85,
    });
    if (!result.canceled && result.assets[0]) {
      setCoverUri(result.assets[0].uri);
    }
  }

  async function onSave() {
    const next: Errors = {};
    if (!title.trim()) next.title = 'Give the book a title.';
    if (!author.trim()) next.author = 'Who wrote it?';
    if (!content.trim()) next.content = 'Add the text you want to read.';
    const pageCount = pages.trim() ? Number(pages) : suggestedPageCount(content);
    if (!Number.isFinite(pageCount) || pageCount < 1) next.pages = 'Pages must be at least 1.';
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setSaving(true);
    try {
      const id = addBook({
        title,
        author,
        description,
        category,
        totalPages: pageCount,
        content,
      });
      if (coverUri) {
        const stored = await persistCoverUri(coverUri, id);
        useLibraryStore.getState().updateBook(id, { coverUri: stored });
      }
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      router.replace(`/book/${id}`);
    } catch {
      Alert.alert('Could not save', 'Something went wrong while saving this book.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: colors.bg }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={[styles.content, { paddingTop: insets.top + 20, paddingBottom: insets.bottom + 24 }]}>
        <View style={styles.top}>
          <BackButton />
          <Text variant="label" color="muted">
            New volume
          </Text>
          <View style={{ width: 40 }} />
        </View>
        <Text variant="display">Add a book</Text>
        <Text variant="body" color="muted">
          Kept only on this device. Cover optional; the words are not.
        </Text>

        <PressableScale onPress={pickCover} style={styles.cover}>
          <BookCover title={title || 'Cover'} author={author} uri={coverUri} size="lg" />
          <Text variant="caption" color="accent" style={styles.coverLabel}>
            {coverUri ? 'Change cover' : 'Choose a cover'}
          </Text>
        </PressableScale>

        <Input label="Title" value={title} onChangeText={setTitle} error={errors.title} />
        <Input label="Author" value={author} onChangeText={setAuthor} error={errors.author} />
        <Input label="Description" value={description} onChangeText={setDescription} multiline />

        <Text variant="label" color="muted">
          Genre
        </Text>
        <View style={styles.chips}>
          {BOOK_CATEGORIES.map((item) => {
            const active = category === item;
            return (
              <PressableScale
                key={item}
                onPress={() => setCategory(item)}
                style={[
                  styles.chip,
                  { backgroundColor: active ? colors.ink : colors.paper, borderColor: colors.line },
                ]}>
                <Text variant="caption" style={{ color: active ? colors.paper : colors.muted, fontFamily: Fonts.sansMedium }}>
                  {item}
                </Text>
              </PressableScale>
            );
          })}
        </View>

        <Input
          label="Total pages"
          value={pages}
          onChangeText={setPages}
          keyboardType="number-pad"
          placeholder={content ? String(suggestedPageCount(content)) : 'e.g. 240'}
          error={errors.pages}
        />
        <Input
          label="Book content"
          value={content}
          onChangeText={setContent}
          multiline
          style={styles.contentField}
          error={errors.content}
          placeholder="Paste the text you want to read…"
        />
        <Button label="Save to library" onPress={onSave} loading={saving} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: Spacing.screen,
    gap: Spacing.md,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cover: {
    alignItems: 'center',
    gap: 10,
    marginVertical: 8,
  },
  coverLabel: {
    fontFamily: Fonts.sansMedium,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    borderWidth: 1,
    borderRadius: Radius.full,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  contentField: {
    minHeight: 180,
  },
});
