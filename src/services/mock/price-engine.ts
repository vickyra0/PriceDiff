import { formatISO } from 'date-fns';
import { mockDb } from '@/services/mock/db';
import type { AppNotification } from '@/types/notification';
import type { Product } from '@/types/product';
import { formatPrice } from '@/utils/format';
import { createNotification } from '@/utils/notification.utils';
import { calculateSavings, getLowestPrice, isTargetPriceReached } from '@/utils/price.utils';
import { withDerivedOfferDiscounts } from '@/utils/product.utils';

export interface PriceTickResult {
  product: Product;
  previousPrice: number | null;
  currentPrice: number | null;
  notifications: AppNotification[];
}

export function applyProductPrice(productId: string, nextLowest: number): PriceTickResult {
  const state = mockDb.getState();
  const product = state.products.find((item) => item.id === productId);
  if (!product) {
    throw { message: 'Product not found.', status: 404 };
  }
  const previousPrice = getLowestPrice(product.offers);
  const updatedOffers = withDerivedOfferDiscounts(
    product.offers.map((offer, index) => {
      if (offer.price == null) {
        return offer;
      }
      const isLowest = offer.price === previousPrice;
      const price = isLowest || index === 0 ? nextLowest : Math.round(nextLowest * (1 + index * 0.015));
      return {
        ...offer,
        price,
        lastCheckedAt: new Date().toISOString(),
      };
    }),
  );
  const updatedProduct: Product = {
    ...product,
    offers: updatedOffers,
    updatedAt: new Date().toISOString(),
  };
  const currentPrice = getLowestPrice(updatedOffers);
  const historyPointDate = formatISO(new Date(), { representation: 'date' });
  const existingHistory = state.priceHistory[productId] ?? [];
  const lowestOffer = updatedOffers.find((offer) => offer.price === currentPrice);
  const history = [
    ...existingHistory,
    ...(lowestOffer && currentPrice != null
      ? [
          {
            date: historyPointDate,
            price: currentPrice,
            platformId: lowestOffer.platformId,
            platformName: lowestOffer.platformName,
          },
        ]
      : []),
  ];

  const notifications: AppNotification[] = [];
  const dropped = previousPrice != null && currentPrice != null && currentPrice < previousPrice;

  for (const tracking of state.tracking.filter((item) => item.productId === productId && item.status === 'active')) {
    const user = state.users.find((item) => item.id === tracking.userId);
    const prefs = user?.preferences;
    const reached = isTargetPriceReached(currentPrice, tracking.targetPrice);
    if (reached && prefs?.targetPriceAlerts) {
      notifications.push(
        createNotification({
          userId: tracking.userId,
          type: 'target_reached',
          title: 'Target Reached',
          message: `${product.title} is now ${formatPrice(currentPrice)}. Your target price was ${formatPrice(tracking.targetPrice)}. You save ${formatPrice(calculateSavings(previousPrice, currentPrice))} compared to the previous price.`,
          productId,
        }),
      );
    } else if (dropped && prefs?.priceDropAlerts && currentPrice != null && previousPrice != null) {
      notifications.push(
        createNotification({
          userId: tracking.userId,
          type: 'price_drop',
          title: 'Price Alert!',
          message: `${product.title} is now ${formatPrice(currentPrice)}. ↓ ${formatPrice(previousPrice - currentPrice)}`,
          productId,
        }),
      );
    }
  }

  for (const wish of state.wishlist.filter((item) => item.productId === productId)) {
    const user = state.users.find((item) => item.id === wish.userId);
    if (!user?.preferences.wishlistAlerts) {
      continue;
    }
    if (dropped && currentPrice != null && previousPrice != null) {
      notifications.push(
        createNotification({
          userId: wish.userId,
          type: 'wishlist_update',
          title: 'Price Drop',
          message: `${product.title} price dropped from ${formatPrice(previousPrice)} to ${formatPrice(currentPrice)}. ↓ ${formatPrice(previousPrice - currentPrice)}`,
          productId,
        }),
      );
    }
    const tracking = state.tracking.find(
      (item) => item.userId === wish.userId && item.productId === productId && item.status === 'active',
    );
    if (tracking && isTargetPriceReached(currentPrice, tracking.targetPrice) && user.preferences.targetPriceAlerts) {
      const already = notifications.some(
        (item) => item.userId === wish.userId && item.type === 'target_reached' && item.productId === productId,
      );
      if (!already) {
        notifications.push(
          createNotification({
            userId: wish.userId,
            type: 'target_reached',
            title: 'Target Reached',
            message: `${product.title} is now below your target price. Current: ${formatPrice(currentPrice)} Target: ${formatPrice(tracking.targetPrice)}`,
            productId,
          }),
        );
      }
    }
  }

  const tracking = state.tracking.map((item) => {
    if (item.productId !== productId) {
      return item;
    }
    const reached = item.status === 'active' && isTargetPriceReached(currentPrice, item.targetPrice);
    return {
      ...item,
      previousPrice,
      lastCheckedAt: new Date().toISOString(),
      status: reached ? 'target_reached' : item.status,
    };
  });

  mockDb.setState({
    products: state.products.map((item) => (item.id === productId ? updatedProduct : item)),
    tracking,
    notifications: [...notifications, ...state.notifications],
    priceHistory: { ...state.priceHistory, [productId]: history },
  });

  return { product: updatedProduct, previousPrice, currentPrice, notifications };
}

export function tickRandomWatchedPrice(): PriceTickResult | null {
  const { tracking, wishlist, products } = mockDb.getState();
  const watchedIds = [
    ...new Set([
      ...tracking.filter((item) => item.status === 'active').map((item) => item.productId),
      ...wishlist.map((item) => item.productId),
    ]),
  ];
  if (watchedIds.length === 0) {
    return null;
  }
  const productId = watchedIds[Math.floor(Math.random() * watchedIds.length)];
  if (!productId) {
    return null;
  }
  const product = products.find((item) => item.id === productId);
  const current = product ? getLowestPrice(product.offers) : null;
  if (current == null) {
    return null;
  }
  const next = Math.max(Math.round(current * (0.96 + Math.random() * 0.03)), 99);
  return applyProductPrice(productId, next);
}
