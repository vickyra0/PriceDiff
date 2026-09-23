import type { Product, ProductOffer } from '@/types/product';

export function withDerivedOfferDiscounts(offers: ProductOffer[]): ProductOffer[] {
  return offers.map((offer) => ({
    ...offer,
    discountPercentage:
      offer.price != null && offer.originalPrice != null && offer.originalPrice > offer.price
        ? Math.round(((offer.originalPrice - offer.price) / offer.originalPrice) * 100)
        : 0,
  }));
}

export function cloneProduct(product: Product): Product {
  return {
    ...product,
    gallery: [...product.gallery],
    specifications: product.specifications.map((item) => ({ ...item })),
    offers: product.offers.map((offer) => ({ ...offer })),
  };
}
