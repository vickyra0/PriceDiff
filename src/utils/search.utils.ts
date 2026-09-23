import type { PaginatedResult } from '@/types/api';
import type { Product } from '@/types/product';
import type { SearchFilters, SearchSuggestionGroup, SortOption } from '@/types/search';
import { getLowestPrice, getMaxDiscount } from '@/utils/price.utils';

function matchesQuery(product: Product, query: string): boolean {
  if (!query.trim()) {
    return true;
  }
  const haystack = `${product.title} ${product.brand} ${product.category} ${product.description}`.toLowerCase();
  return haystack.includes(query.trim().toLowerCase());
}

export function filterProducts(products: Product[], filters: SearchFilters): Product[] {
  return products.filter((product) => {
    if (!matchesQuery(product, filters.query)) {
      return false;
    }
    if (filters.category && product.category !== filters.category) {
      return false;
    }
    if (filters.brand && product.brand !== filters.brand) {
      return false;
    }
    if (filters.platformId) {
      const hasPlatform = product.offers.some(
        (offer) => offer.platformId === filters.platformId && offer.price != null,
      );
      if (!hasPlatform) {
        return false;
      }
    }
    const lowest = getLowestPrice(product.offers);
    if (filters.minPrice != null && (lowest == null || lowest < filters.minPrice)) {
      return false;
    }
    if (filters.maxPrice != null && (lowest == null || lowest > filters.maxPrice)) {
      return false;
    }
    if (filters.minRating != null && product.rating < filters.minRating) {
      return false;
    }
    if (filters.availability !== 'any') {
      const matchesAvailability = product.offers.some(
        (offer) => offer.availability === filters.availability && offer.price != null,
      );
      if (!matchesAvailability) {
        return false;
      }
    }
    return true;
  });
}

export function sortProducts(products: Product[], sort: SortOption, query: string): Product[] {
  const cloned = [...products];
  cloned.sort((a, b) => {
    switch (sort) {
      case 'price_asc':
        return (getLowestPrice(a.offers) ?? Number.POSITIVE_INFINITY) - (getLowestPrice(b.offers) ?? Number.POSITIVE_INFINITY);
      case 'price_desc':
        return (getLowestPrice(b.offers) ?? 0) - (getLowestPrice(a.offers) ?? 0);
      case 'discount':
        return getMaxDiscount(b) - getMaxDiscount(a);
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'relevance':
      default: {
        if (!query.trim()) {
          return b.rating - a.rating;
        }
        const q = query.trim().toLowerCase();
        const aScore = a.title.toLowerCase().includes(q) ? 2 : 0;
        const bScore = b.title.toLowerCase().includes(q) ? 2 : 0;
        return bScore - aScore || b.rating - a.rating;
      }
    }
  });
  return cloned;
}

export function paginate<T>(items: T[], page: number, pageSize: number): PaginatedResult<T> {
  const safePage = Math.max(1, page);
  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const currentPage = Math.min(safePage, totalPages);
  const start = (currentPage - 1) * pageSize;
  return {
    items: items.slice(start, start + pageSize),
    page: currentPage,
    pageSize,
    totalItems,
    totalPages,
  };
}

export function buildSuggestions(products: Product[], query: string): SearchSuggestionGroup {
  const q = query.trim().toLowerCase();
  if (!q) {
    return { products: [], brands: [], categories: [] };
  }
  const matchedProducts = products
    .filter((product) => product.title.toLowerCase().includes(q))
    .slice(0, 5)
    .map((product) => ({ id: product.id, title: product.title }));
  const brands = [...new Set(products.map((product) => product.brand))]
    .filter((brand) => brand.toLowerCase().includes(q))
    .slice(0, 4);
  const categories = [...new Set(products.map((product) => product.category))]
    .filter((category) => category.toLowerCase().includes(q))
    .slice(0, 4);
  return { products: matchedProducts, brands, categories };
}

export function getFacets(products: Product[]): { categories: string[]; brands: string[] } {
  return {
    categories: [...new Set(products.map((product) => product.category))].sort(),
    brands: [...new Set(products.map((product) => product.brand))].sort(),
  };
}
