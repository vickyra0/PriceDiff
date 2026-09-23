import type { Product, ProductOffer } from '@/types/product';

const STOCK_OFFERS = (offers: ProductOffer[]) =>
  offers.filter(
    (offer) =>
      offer.availability === 'in_stock' &&
      offer.price != null &&
      Number.isFinite(offer.price) &&
      offer.price > 0,
  );

export function getLowestOffer(offers: ProductOffer[]): ProductOffer | null {
  const valid = STOCK_OFFERS(offers);
  if (valid.length === 0) {
    return null;
  }
  return valid.reduce((lowest, offer) =>
    (offer.price ?? Number.POSITIVE_INFINITY) < (lowest.price ?? Number.POSITIVE_INFINITY)
      ? offer
      : lowest,
  );
}

export function getHighestOffer(offers: ProductOffer[]): ProductOffer | null {
  const valid = STOCK_OFFERS(offers);
  if (valid.length === 0) {
    return null;
  }
  return valid.reduce((highest, offer) =>
    (offer.price ?? 0) > (highest.price ?? 0) ? offer : highest,
  );
}

export function getLowestPrice(offers: ProductOffer[]): number | null {
  return getLowestOffer(offers)?.price ?? null;
}

export function getHighestPrice(offers: ProductOffer[]): number | null {
  return getHighestOffer(offers)?.price ?? null;
}

export function getAveragePrice(offers: ProductOffer[]): number | null {
  const valid = STOCK_OFFERS(offers);
  if (valid.length === 0) {
    return null;
  }
  const total = valid.reduce((sum, offer) => sum + (offer.price ?? 0), 0);
  return Math.round(total / valid.length);
}

export function getDiscountPercentage(price: number | null, originalPrice: number | null): number {
  if (price == null || originalPrice == null || originalPrice <= 0 || price < 0) {
    return 0;
  }
  if (price >= originalPrice) {
    return 0;
  }
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}

export function getPriceDifference(
  currentPrice: number | null,
  comparisonPrice: number | null,
): number | null {
  if (currentPrice == null || comparisonPrice == null) {
    return null;
  }
  return currentPrice - comparisonPrice;
}

export function isTargetPriceReached(
  currentPrice: number | null | undefined,
  targetPrice: number | null | undefined,
): boolean {
  if (currentPrice == null || targetPrice == null) {
    return false;
  }
  if (currentPrice <= 0 || targetPrice <= 0) {
    return false;
  }
  return currentPrice <= targetPrice;
}

export function calculateSavings(
  originalPrice: number | null | undefined,
  currentPrice: number | null | undefined,
): number {
  if (originalPrice == null || currentPrice == null) {
    return 0;
  }
  const savings = originalPrice - currentPrice;
  return savings > 0 ? savings : 0;
}

export function calculatePriceDropPercentage(
  previousPrice: number | null | undefined,
  currentPrice: number | null | undefined,
): number {
  if (previousPrice == null || currentPrice == null || previousPrice <= 0) {
    return 0;
  }
  return Number((((previousPrice - currentPrice) / previousPrice) * 100).toFixed(2));
}

export function getStoreCount(offers: ProductOffer[]): number {
  return offers.filter((offer) => offer.price != null).length;
}

export function getProductLowestPrice(product: Product): number | null {
  return getLowestPrice(product.offers);
}

export function getMaxDiscount(product: Product): number {
  return product.offers.reduce((max, offer) => Math.max(max, offer.discountPercentage), 0);
}
