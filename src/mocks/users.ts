import type { User } from '@/types/user';

export const DEMO_PASSWORD = 'demo123';

export const demoUser: User = {
  id: 'user_demo',
  name: 'Vicky Sharma',
  email: 'demo@pricepulse.app',
  avatarUrl: 'https://picsum.photos/seed/vicky/128/128',
  createdAt: '2026-01-10T00:00:00.000Z',
  preferences: {
    priceDropAlerts: true,
    wishlistAlerts: true,
    targetPriceAlerts: true,
    emailNotifications: false,
    pushNotifications: true,
  },
};

export const seedUsers: User[] = [demoUser];
