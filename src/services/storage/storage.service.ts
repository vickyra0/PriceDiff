import { storageKeys } from '@/constants/app';

export const storageService = {
  get<T>(key: string): T | null {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) {
        return null;
      }
      return JSON.parse(raw) as T;
    } catch {
      localStorage.removeItem(key);
      return null;
    }
  },
  set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Ignore quota / private-mode failures in the prototype.
    }
  },
  remove(key: string): void {
    localStorage.removeItem(key);
  },
  clearAppData(): void {
    Object.values(storageKeys).forEach((key) => localStorage.removeItem(key));
  },
};
