import { createContext, useContext } from 'react';
import { Platform } from 'react-native';

export const FontsReadyContext = createContext(false);

export function useFontsReady() {
  return useContext(FontsReadyContext);
}

/** Android hides text if fontFamily is not loaded yet. */
export function fallbackFontFamily() {
  return Platform.OS === 'android' ? 'sans-serif' : undefined;
}
