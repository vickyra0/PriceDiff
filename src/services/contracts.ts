import type { PaginatedResult } from '@/types/api';
import type { AppNotification } from '@/types/notification';
import type { PriceHistoryPoint, PriceHistoryRange, Product } from '@/types/product';
import type { SearchFilters, SearchSuggestionGroup } from '@/types/search';
import type { PriceTracking, TrackingStatus } from '@/types/tracking';
import type {
  AuthCredentials,
  AuthSession,
  RegisterPayload,
  User,
  UserPreferences,
} from '@/types/user';
import type { WishlistItem } from '@/types/wishlist';

export interface AuthService {
  login(credentials: AuthCredentials): Promise<AuthSession>;
  register(payload: RegisterPayload): Promise<AuthSession>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<User | null>;
  requestPasswordReset(email: string): Promise<void>;
  resetPassword(token: string, password: string): Promise<void>;
  updateProfile(patch: Partial<Pick<User, 'name' | 'avatarUrl'>>): Promise<User>;
  updatePreferences(preferences: UserPreferences): Promise<User>;
}

export interface ProductService {
  searchProducts(filters: SearchFilters): Promise<PaginatedResult<Product>>;
  getProductById(id: string): Promise<Product>;
  getPriceHistory(productId: string, range: PriceHistoryRange): Promise<PriceHistoryPoint[]>;
  getSuggestions(query: string): Promise<SearchSuggestionGroup>;
  getFacets(): Promise<{ categories: string[]; brands: string[] }>;
  getDeals(): Promise<Product[]>;
  recordView(productId: string): Promise<string[]>;
  getRecentlyViewed(): Promise<Product[]>;
  addRecentSearch(query: string): Promise<string[]>;
  getRecentSearches(): Promise<string[]>;
}

export interface WishlistService {
  getWishlist(userId: string): Promise<WishlistItem[]>;
  addToWishlist(userId: string, productId: string): Promise<WishlistItem>;
  removeFromWishlist(userId: string, productId: string): Promise<void>;
}

export interface TrackingService {
  getTracking(userId: string): Promise<PriceTracking[]>;
  startTracking(userId: string, productId: string, targetPrice: number): Promise<PriceTracking>;
  updateTarget(trackingId: string, targetPrice: number): Promise<PriceTracking>;
  setStatus(trackingId: string, status: TrackingStatus): Promise<PriceTracking>;
  removeTracking(trackingId: string): Promise<void>;
}

export interface NotificationService {
  getNotifications(userId: string): Promise<AppNotification[]>;
  markRead(id: string): Promise<AppNotification>;
  markAllRead(userId: string): Promise<void>;
  deleteNotification(id: string): Promise<void>;
  addNotification(notification: AppNotification): Promise<AppNotification>;
}

export interface DemoService {
  simulatePriceDrop(productId?: string): Promise<Product>;
  simulateTargetReached(productId?: string): Promise<Product>;
  resetMockData(): Promise<void>;
}

/** Future backend-only contract. The React app never scrapes storefronts. */
export interface PriceProvider {
  getProductPrice(productUrl: string): Promise<{ price: number; currency: string; checkedAt: string }>;
}
