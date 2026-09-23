export interface EcommercePlatform {
  id: string;
  name: string;
  logo: string;
  baseUrl: string;
  isActive: boolean;
  accentColor: string;
}

export type OfferAvailability = 'in_stock' | 'out_of_stock';

export interface ProductOffer {
  id: string;
  productId: string;
  platformId: string;
  platformName: string;
  platformTitle: string;
  productUrl: string;
  price: number | null;
  originalPrice: number | null;
  discountPercentage: number;
  currency: string;
  availability: OfferAvailability;
  lastCheckedAt: string;
}

export interface ProductSpecification {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  brand: string;
  category: string;
  imageUrl: string;
  gallery: string[];
  rating: number;
  reviewCount: number;
  offers: ProductOffer[];
  specifications: ProductSpecification[];
  createdAt: string;
  updatedAt: string;
}

export interface PriceHistoryPoint {
  date: string;
  price: number;
  platformId: string;
  platformName: string;
}

export type PriceHistoryRange = '7d' | '30d' | '3m' | '6m' | '1y';
