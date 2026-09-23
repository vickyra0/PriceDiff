import { env } from '@/config/env';
import { httpClient } from '@/services/http/client';
import type {
  AuthService,
  DemoService,
  NotificationService,
  ProductService,
  TrackingService,
  WishlistService,
} from '@/services/contracts';
import { mockAuthService } from '@/services/mock/auth.service';
import { mockDemoService } from '@/services/mock/demo.service';
import { mockNotificationService } from '@/services/mock/notification.service';
import { mockProductService } from '@/services/mock/product.service';
import { mockTrackingService } from '@/services/mock/tracking.service';
import { mockWishlistService } from '@/services/mock/wishlist.service';

const httpAuthService: AuthService = {
  login: (credentials) => httpClient.post('/auth/login', credentials).then((res) => res.data),
  register: (payload) => httpClient.post('/auth/register', payload).then((res) => res.data),
  logout: () => httpClient.post('/auth/logout').then(() => undefined),
  getCurrentUser: () => httpClient.get('/auth/me').then((res) => res.data),
  requestPasswordReset: (email) => httpClient.post('/auth/forgot-password', { email }).then(() => undefined),
  resetPassword: (token, password) =>
    httpClient.post('/auth/reset-password', { token, password }).then(() => undefined),
  updateProfile: (patch) => httpClient.patch('/auth/profile', patch).then((res) => res.data),
  updatePreferences: (preferences) =>
    httpClient.patch('/auth/preferences', preferences).then((res) => res.data),
};

const httpProductService: ProductService = {
  searchProducts: (filters) => httpClient.get('/products', { params: filters }).then((res) => res.data),
  getProductById: (id) => httpClient.get(`/products/${id}`).then((res) => res.data),
  getPriceHistory: (productId, range) =>
    httpClient.get(`/products/${productId}/history`, { params: { range } }).then((res) => res.data),
  getSuggestions: (query) => httpClient.get('/products/suggestions', { params: { query } }).then((res) => res.data),
  getFacets: () => httpClient.get('/products/facets').then((res) => res.data),
  getDeals: () => httpClient.get('/products/deals').then((res) => res.data),
  recordView: (productId) => httpClient.post('/products/views', { productId }).then((res) => res.data),
  getRecentlyViewed: () => httpClient.get('/products/recent').then((res) => res.data),
  addRecentSearch: (query) => httpClient.post('/search/recent', { query }).then((res) => res.data),
  getRecentSearches: () => httpClient.get('/search/recent').then((res) => res.data),
};

const httpWishlistService: WishlistService = {
  getWishlist: (userId) => httpClient.get('/wishlist', { params: { userId } }).then((res) => res.data),
  addToWishlist: (userId, productId) =>
    httpClient.post('/wishlist', { userId, productId }).then((res) => res.data),
  removeFromWishlist: (userId, productId) =>
    httpClient.delete('/wishlist', { data: { userId, productId } }).then(() => undefined),
};

const httpTrackingService: TrackingService = {
  getTracking: (userId) => httpClient.get('/tracking', { params: { userId } }).then((res) => res.data),
  startTracking: (userId, productId, targetPrice) =>
    httpClient.post('/tracking', { userId, productId, targetPrice }).then((res) => res.data),
  updateTarget: (trackingId, targetPrice) =>
    httpClient.patch(`/tracking/${trackingId}`, { targetPrice }).then((res) => res.data),
  setStatus: (trackingId, status) =>
    httpClient.patch(`/tracking/${trackingId}/status`, { status }).then((res) => res.data),
  removeTracking: (trackingId) => httpClient.delete(`/tracking/${trackingId}`).then(() => undefined),
};

const httpNotificationService: NotificationService = {
  getNotifications: (userId) => httpClient.get('/notifications', { params: { userId } }).then((res) => res.data),
  markRead: (id) => httpClient.patch(`/notifications/${id}/read`).then((res) => res.data),
  markAllRead: (userId) => httpClient.post('/notifications/read-all', { userId }).then(() => undefined),
  deleteNotification: (id) => httpClient.delete(`/notifications/${id}`).then(() => undefined),
  addNotification: (notification) => httpClient.post('/notifications', notification).then((res) => res.data),
};

const httpDemoService: DemoService = {
  simulatePriceDrop: async () => {
    throw { message: 'Demo controls are only available with the mock API.' };
  },
  simulateTargetReached: async () => {
    throw { message: 'Demo controls are only available with the mock API.' };
  },
  resetMockData: async () => {
    throw { message: 'Demo controls are only available with the mock API.' };
  },
};

export const authService: AuthService = env.enableMockApi ? mockAuthService : httpAuthService;
export const productService: ProductService = env.enableMockApi ? mockProductService : httpProductService;
export const wishlistService: WishlistService = env.enableMockApi
  ? mockWishlistService
  : httpWishlistService;
export const trackingService: TrackingService = env.enableMockApi
  ? mockTrackingService
  : httpTrackingService;
export const notificationService: NotificationService = env.enableMockApi
  ? mockNotificationService
  : httpNotificationService;
export const demoService: DemoService = env.enableMockApi ? mockDemoService : httpDemoService;
