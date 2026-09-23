import { storageKeys } from '@/constants/app';
import { DEMO_PASSWORD, demoUser } from '@/mocks/users';
import { simulateLatency } from '@/services/api/delay';
import type { AuthService } from '@/services/contracts';
import { mockDb } from '@/services/mock/db';
import { storageService } from '@/services/storage/storage.service';
import type { AuthSession, User } from '@/types/user';
import { createId } from '@/utils/cn';

const memoryPasswords = new Map<string, string>([[demoUser.email, DEMO_PASSWORD]]);

function requireUser(email: string): User {
  const user = mockDb.getState().users.find((item) => item.email.toLowerCase() === email.toLowerCase());
  if (!user) {
    throw { message: 'No account found for this email.', code: 'USER_NOT_FOUND', status: 404 };
  }
  return user;
}

function toSession(user: User): AuthSession {
  const session = { user, token: createId('tok') };
  storageService.set(storageKeys.session, session);
  return session;
}

export const mockAuthService: AuthService = {
  async login(credentials) {
    await simulateLatency();
    const user = requireUser(credentials.email);
    const expected = memoryPasswords.get(user.email.toLowerCase());
    const passwordOk =
      expected != null ? credentials.password === expected : credentials.password.length >= 6;
    if (!passwordOk) {
      throw { message: 'Incorrect email or password.', code: 'INVALID_CREDENTIALS', status: 401 };
    }
    return toSession(user);
  },
  async register(payload) {
    await simulateLatency();
    const exists = mockDb
      .getState()
      .users.some((user) => user.email.toLowerCase() === payload.email.toLowerCase());
    if (exists) {
      throw { message: 'An account with this email already exists.', code: 'EMAIL_TAKEN', status: 409 };
    }
    const user: User = {
      id: createId('user'),
      name: payload.name.trim(),
      email: payload.email.trim().toLowerCase(),
      avatarUrl: `https://picsum.photos/seed/${encodeURIComponent(payload.email)}/128/128`,
      createdAt: new Date().toISOString(),
      preferences: {
        priceDropAlerts: true,
        wishlistAlerts: true,
        targetPriceAlerts: true,
        emailNotifications: false,
        pushNotifications: true,
      },
    };
    memoryPasswords.set(user.email, payload.password);
    mockDb.setState({ users: [...mockDb.getState().users, user] });
    return toSession(user);
  },
  async logout() {
    await simulateLatency(80);
    storageService.remove(storageKeys.session);
  },
  async getCurrentUser() {
    const session = storageService.get<AuthSession>(storageKeys.session);
    if (!session) {
      return null;
    }
    return mockDb.getState().users.find((user) => user.id === session.user.id) ?? session.user;
  },
  async requestPasswordReset(email) {
    await simulateLatency();
    requireUser(email);
  },
  async resetPassword(token, password) {
    await simulateLatency();
    if (!token || password.length < 6) {
      throw { message: 'This reset link is invalid or the password is too short.', code: 'RESET_FAILED' };
    }
    memoryPasswords.set(demoUser.email, password);
  },
  async updateProfile(patch) {
    await simulateLatency();
    const session = storageService.get<AuthSession>(storageKeys.session);
    if (!session) {
      throw { message: 'Please sign in again.', status: 401 };
    }
    const users = mockDb.getState().users.map((user) =>
      user.id === session.user.id ? { ...user, ...patch } : user,
    );
    mockDb.setState({ users });
    const updated = users.find((user) => user.id === session.user.id)!;
    storageService.set(storageKeys.session, { ...session, user: updated });
    return updated;
  },
  async updatePreferences(preferences) {
    await simulateLatency();
    const session = storageService.get<AuthSession>(storageKeys.session);
    if (!session) {
      throw { message: 'Please sign in again.', status: 401 };
    }
    const users = mockDb.getState().users.map((user) =>
      user.id === session.user.id ? { ...user, preferences } : user,
    );
    mockDb.setState({ users });
    const updated = users.find((user) => user.id === session.user.id)!;
    storageService.set(storageKeys.session, { ...session, user: updated });
    return updated;
  },
};
