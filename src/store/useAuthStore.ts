import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { createId } from '@/lib/id';
import { createSalt, hashSecret, isValidEmail, normalizeEmail } from '@/lib/password';
import type { AuthResult, AuthUser, StoredAccount } from '@/types/auth';

interface AuthState {
  account: StoredAccount | null;
  isAuthenticated: boolean;
  signUp: (name: string, email: string, password: string, options?: { replace?: boolean }) => Promise<AuthResult>;
  signIn: (email: string, password: string) => Promise<AuthResult>;
  signOut: () => void;
  clearAccount: () => void;
}

function validate(name: string, email: string, password: string, requireName: boolean): string | null {
  if (requireName && name.trim().length < 2) return 'Tell us your name.';
  if (!isValidEmail(email)) return 'Enter a valid email.';
  if (password.length < 6) return 'Password needs at least 6 characters.';
  return null;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      account: null,
      isAuthenticated: false,

      signUp: async (name, email, password, options) => {
        const invalid = validate(name, email, password, true);
        if (invalid) return { ok: false, error: invalid };
        if (get().account && !options?.replace) {
          return { ok: false, error: 'An account already lives on this device. Sign in instead.' };
        }

        const salt = createSalt();
        const passwordHash = await hashSecret(password, salt);
        const user: AuthUser = {
          id: createId('user'),
          name: name.trim(),
          email: normalizeEmail(email),
          createdAt: new Date().toISOString(),
        };

        set({
          account: { user, passwordHash, salt },
          isAuthenticated: true,
        });
        return { ok: true };
      },

      signIn: async (email, password) => {
        const invalid = validate('', email, password, false);
        if (invalid) return { ok: false, error: invalid };

        const account = get().account;
        if (!account) return { ok: false, error: 'No library account on this device yet.' };
        if (account.user.email !== normalizeEmail(email)) {
          return { ok: false, error: 'Email does not match this library.' };
        }

        const nextHash = await hashSecret(password, account.salt);
        if (nextHash !== account.passwordHash) {
          return { ok: false, error: 'Wrong password.' };
        }

        set({ isAuthenticated: true });
        return { ok: true };
      },

      signOut: () => set({ isAuthenticated: false }),
      clearAccount: () => set({ account: null, isAuthenticated: false }),
    }),
    {
      name: 'simplify-auth',
      storage: createJSONStorage(() => AsyncStorage),
      version: 1,
    },
  ),
);
