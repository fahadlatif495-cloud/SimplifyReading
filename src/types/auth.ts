export interface AuthUser {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface StoredAccount {
  user: AuthUser;
  passwordHash: string;
  salt: string;
}

export type AuthResult = { ok: true } | { ok: false; error: string };
