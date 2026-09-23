import { subDays } from 'date-fns';
import { simulateLatency } from '@/services/api/delay';
import type { ProductService } from '@/services/contracts';
import { mockDb } from '@/services/mock/db';
import type { PriceHistoryRange } from '@/types/product';
import { getLowestPrice } from '@/utils/price.utils';
import {
  buildSuggestions,
  filterProducts,
  getFacets,
  paginate,
  sortProducts,
} from '@/utils/search.utils';

function rangeDays(range: PriceHistoryRange): number {
  switch (range) {
    case '7d':
      return 7;
    case '30d':
      return 30;
    case '3m':
      return 90;
    case '6m':
      return 180;
    case '1y':
    default:
      return 365;
  }
}

export const mockProductService: ProductService = {
  async searchProducts(filters) {
    await simulateLatency();
    if (filters.query.includes('__error__')) {
      throw { message: 'Unable to load products.', code: 'SEARCH_FAILED', status: 500 };
    }
    const filtered = filterProducts(mockDb.getState().products, filters);
    const sorted = sortProducts(filtered, filters.sort, filters.query);
    return paginate(sorted, filters.page, filters.pageSize);
  },
  async getProductById(id) {
    await simulateLatency();
    const product = mockDb.getState().products.find((item) => item.id === id);
    if (!product) {
      throw { message: 'This product could not be found.', code: 'NOT_FOUND', status: 404 };
    }
    return product;
  },
  async getPriceHistory(productId, range) {
    await simulateLatency(200);
    const all = mockDb.getState().priceHistory[productId] ?? [];
    const from = subDays(new Date('2026-09-23'), rangeDays(range));
    return all.filter((point) => new Date(point.date) >= from);
  },
  async getSuggestions(query) {
    await simulateLatency(120);
    return buildSuggestions(mockDb.getState().products, query);
  },
  async getFacets() {
    return getFacets(mockDb.getState().products);
  },
  async getDeals() {
    await simulateLatency();
    return [...mockDb.getState().products]
      .sort((a, b) => {
        const aOff = Math.max(...a.offers.map((offer) => offer.discountPercentage), 0);
        const bOff = Math.max(...b.offers.map((offer) => offer.discountPercentage), 0);
        return bOff - aOff;
      })
      .slice(0, 6);
  },
  async recordView(productId) {
    const viewed = [productId, ...mockDb.getState().recentlyViewed.filter((id) => id !== productId)].slice(0, 8);
    mockDb.setState({ recentlyViewed: viewed });
    return viewed;
  },
  async getRecentlyViewed() {
    const { products, recentlyViewed } = mockDb.getState();
    return recentlyViewed
      .map((id) => products.find((product) => product.id === id))
      .filter((product): product is NonNullable<typeof product> => Boolean(product));
  },
  async addRecentSearch(query) {
    const trimmed = query.trim();
    if (!trimmed) {
      return mockDb.getState().recentSearches;
    }
    const next = [trimmed, ...mockDb.getState().recentSearches.filter((item) => item !== trimmed)].slice(0, 8);
    mockDb.setState({ recentSearches: next });
    return next;
  },
  async getRecentSearches() {
    return mockDb.getState().recentSearches;
  },
};

export function cheapestProducts(limit = 6) {
  return [...mockDb.getState().products]
    .filter((product) => getLowestPrice(product.offers) != null)
    .sort((a, b) => (getLowestPrice(a.offers) ?? 0) - (getLowestPrice(b.offers) ?? 0))
    .slice(0, limit);
}
