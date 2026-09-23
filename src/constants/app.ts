export const routes = {
  home: '/',
  dashboard: '/dashboard',
  search: '/search',
  product: (id: string) => `/products/${id}`,
  productPattern: '/products/:productId',
  wishlist: '/wishlist',
  tracked: '/tracked',
  notifications: '/notifications',
  profile: '/profile',
  settings: '/settings',
  login: '/login',
  register: '/register',
  forgotPassword: '/forgot-password',
  resetPassword: '/reset-password',
} as const;

export const storageKeys = {
  theme: 'pricepulse.theme',
  session: 'pricepulse.session',
  users: 'pricepulse.users',
  products: 'pricepulse.products',
  wishlist: 'pricepulse.wishlist',
  tracking: 'pricepulse.tracking',
  notifications: 'pricepulse.notifications',
  recentSearches: 'pricepulse.recentSearches',
  recentlyViewed: 'pricepulse.recentlyViewed',
  priceHistory: 'pricepulse.priceHistory',
} as const;
