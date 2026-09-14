import { Platform } from 'react-native';

export async function persistCoverUri(tempUri: string, bookId: string): Promise<string> {
  if (Platform.OS === 'web') return tempUri;

  try {
    const FileSystem = await import('expo-file-system/legacy');
    const root = FileSystem.documentDirectory;
    if (!root) return tempUri;

    const dir = `${root}covers`;
    const info = await FileSystem.getInfoAsync(dir);
    if (!info.exists) {
      await FileSystem.makeDirectoryAsync(dir, { intermediates: true });
    }

    const ext = tempUri.split('?')[0]?.split('.').pop() || 'jpg';
    const dest = `${dir}/${bookId}.${ext}`;
    const existing = await FileSystem.getInfoAsync(dest);
    if (existing.exists) {
      await FileSystem.deleteAsync(dest, { idempotent: true });
    }
    await FileSystem.copyAsync({ from: tempUri, to: dest });
    return dest;
  } catch {
    return tempUri;
  }
}
