export const copy = {
  appName: 'PricePulse',
  tagline: 'Track prices. Compare stores. Buy smarter.',
  somethingWentWrong: 'Something went wrong.',
  couldNotLoadPage: "We couldn't load this page.",
  tryAgain: 'Try again',
  goToDashboard: 'Go to Dashboard',
  noProductsFound: 'No products found.',
  noStores: 'No stores currently have this product.',
  currentlyUnavailable: 'Currently unavailable',
  priceUnavailable: 'Price unavailable',
  unableToLoadPrices: 'Unable to load prices.',
  wishlistEmptyTitle: 'Your wishlist is empty',
  wishlistEmptyBody: "Save products you want to track and we'll monitor their prices.",
  exploreProducts: 'Explore products',
  trackedEmptyTitle: 'No products being tracked',
  trackedEmptyBody: "Start tracking a product and we'll watch the price for you.",
  searchProducts: 'Search products',
  notificationsEmpty: "You're all caught up!",
  bestPrice: 'Best price',
  targetAlreadyAbove:
    'Your target price is already above the current price. You may receive an alert immediately.',
  invalidTarget: 'Please enter a valid target price.',
} as const;

export type CopyKey = keyof typeof copy;

export function t(key: CopyKey): string {
  return copy[key];
}
