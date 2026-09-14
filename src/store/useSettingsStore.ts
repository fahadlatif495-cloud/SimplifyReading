import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { AppThemePreference, ReaderSettings } from '@/types/book';

interface SettingsState {
  theme: AppThemePreference;
  reader: ReaderSettings;
  setTheme: (theme: AppThemePreference) => void;
  setReader: (patch: Partial<ReaderSettings>) => void;
}

export const defaultReaderSettings: ReaderSettings = {
  fontSize: 20,
  lineHeight: 1.7,
  mode: 'sepia',
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      theme: 'light',
      reader: defaultReaderSettings,
      setTheme: (theme) => set({ theme }),
      setReader: (patch) =>
        set((state) => ({
          reader: { ...state.reader, ...patch },
        })),
    }),
    {
      name: 'simplify-settings',
      storage: createJSONStorage(() => AsyncStorage),
      version: 1,
    },
  ),
);
