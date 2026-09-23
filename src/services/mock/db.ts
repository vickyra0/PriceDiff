import { storageKeys } from '@/constants/app';
import { generatePriceHistory } from '@/mocks/priceHistory';
import { seedProducts } from '@/mocks/products';
import { seedNotifications, seedTracking, seedWishlist } from '@/mocks/seed';
import { seedUsers } from '@/mocks/users';
import { storageService } from '@/services/storage/storage.service';
import type { AppNotification } from '@/types/notification';
import type { PriceHistoryPoint, Product } from '@/types/product';
import type { PriceTracking } from '@/types/tracking';
import type { User } from '@/types/user';
import type { WishlistItem } from '@/types/wishlist';
import { cloneProduct } from '@/utils/product.utils';

interface MockState {
  users: User[];
  products: Product[];
  wishlist: WishlistItem[];
  tracking: PriceTracking[];
  notifications: AppNotification[];
  recentSearches: string[];
  recentlyViewed: string[];
  priceHistory: Record<string, PriceHistoryPoint[]>;
}

function createFreshState(): MockState {
  const products = seedProducts.map(cloneProduct);
  return {
    users: seedUsers.map((user) => ({
      ...user,
      preferences: { ...user.preferences },
    })),
    products,
    wishlist: seedWishlist.map((item) => ({ ...item })),
    tracking: seedTracking.map((item) => ({ ...item })),
    notifications: seedNotifications.map((item) => ({ ...item })),
    recentSearches: ['iPhone 16', 'Nike Air Max'],
    recentlyViewed: ['prod_iphone_16', 'prod_sony_xm6'],
    priceHistory: generatePriceHistory(products),
  };
}

function readState(): MockState {
  const fresh = createFreshState();
  return {
    users: storageService.get<User[]>(storageKeys.users) ?? fresh.users,
    products: storageService.get<Product[]>(storageKeys.products) ?? fresh.products,
    wishlist: storageService.get<WishlistItem[]>(storageKeys.wishlist) ?? fresh.wishlist,
    tracking: storageService.get<PriceTracking[]>(storageKeys.tracking) ?? fresh.tracking,
    notifications:
      storageService.get<AppNotification[]>(storageKeys.notifications) ?? fresh.notifications,
    recentSearches: storageService.get<string[]>(storageKeys.recentSearches) ?? fresh.recentSearches,
    recentlyViewed: storageService.get<string[]>(storageKeys.recentlyViewed) ?? fresh.recentlyViewed,
    priceHistory:
      storageService.get<Record<string, PriceHistoryPoint[]>>(storageKeys.priceHistory) ??
      fresh.priceHistory,
  };
}

let state: MockState = readState();

function persist(): void {
  storageService.set(storageKeys.users, state.users);
  storageService.set(storageKeys.products, state.products);
  storageService.set(storageKeys.wishlist, state.wishlist);
  storageService.set(storageKeys.tracking, state.tracking);
  storageService.set(storageKeys.notifications, state.notifications);
  storageService.set(storageKeys.recentSearches, state.recentSearches);
  storageService.set(storageKeys.recentlyViewed, state.recentlyViewed);
  storageService.set(storageKeys.priceHistory, state.priceHistory);
}

persist();

export const mockDb = {
  getState(): MockState {
    return state;
  },
  setState(partial: Partial<MockState>): void {
    state = { ...state, ...partial };
    persist();
  },
  reset(): void {
    storageService.clearAppData();
    state = createFreshState();
    persist();
  },
};
