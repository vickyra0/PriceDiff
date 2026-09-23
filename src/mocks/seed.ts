import { demoUser } from '@/mocks/users';
import type { AppNotification } from '@/types/notification';
import type { PriceTracking } from '@/types/tracking';
import type { WishlistItem } from '@/types/wishlist';

export const seedWishlist: WishlistItem[] = [
  {
    id: 'wish_1',
    userId: demoUser.id,
    productId: 'prod_nike_air_max',
    addedAt: '2026-09-10T10:00:00.000Z',
    addedPrice: 8999,
  },
  {
    id: 'wish_2',
    userId: demoUser.id,
    productId: 'prod_levis_jeans',
    addedAt: '2026-09-12T10:00:00.000Z',
    addedPrice: 3299,
  },
  {
    id: 'wish_3',
    userId: demoUser.id,
    productId: 'prod_sony_xm6',
    addedAt: '2026-09-18T10:00:00.000Z',
    addedPrice: 31990,
  },
];

export const seedTracking: PriceTracking[] = [
  {
    id: 'trk_1',
    userId: demoUser.id,
    productId: 'prod_iphone_16',
    targetPrice: 70000,
    status: 'active',
    createdAt: '2026-09-15T09:00:00.000Z',
    lastCheckedAt: '2026-09-23T08:00:00.000Z',
    previousPrice: 74999,
  },
  {
    id: 'trk_2',
    userId: demoUser.id,
    productId: 'prod_macbook_air_m4',
    targetPrice: 94990,
    status: 'active',
    createdAt: '2026-09-16T09:00:00.000Z',
    lastCheckedAt: '2026-09-23T08:00:00.000Z',
    previousPrice: 104900,
  },
];

export const seedNotifications: AppNotification[] = [
  {
    id: 'ntf_seed_1',
    userId: demoUser.id,
    type: 'price_drop',
    title: 'Price Drop',
    message: 'Sony WH-1000XM6 dropped by ₹2,000 on Flipkart.',
    productId: 'prod_sony_xm6',
    isRead: false,
    createdAt: '2026-09-23T07:10:00.000Z',
  },
  {
    id: 'ntf_seed_2',
    userId: demoUser.id,
    type: 'wishlist_update',
    title: 'Wishlist Update',
    message: 'Nike Air Max is ₹1,000 cheaper than when you saved it.',
    productId: 'prod_nike_air_max',
    isRead: false,
    createdAt: '2026-09-23T06:40:00.000Z',
  },
  {
    id: 'ntf_seed_3',
    userId: demoUser.id,
    type: 'tracking_started',
    title: 'Tracking started',
    message: "We'll notify you when iPhone 16 reaches ₹70,000 or below.",
    productId: 'prod_iphone_16',
    isRead: true,
    createdAt: '2026-09-15T09:01:00.000Z',
  },
];
