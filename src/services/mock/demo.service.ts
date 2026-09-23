import { simulateLatency } from '@/services/api/delay';
import type { DemoService } from '@/services/contracts';
import { mockDb } from '@/services/mock/db';
import { applyProductPrice } from '@/services/mock/price-engine';
import { getLowestPrice } from '@/utils/price.utils';

function resolveProductId(productId?: string): string {
  if (productId) {
    return productId;
  }
  const { tracking, wishlist, products } = mockDb.getState();
  return tracking[0]?.productId ?? wishlist[0]?.productId ?? products[0]?.id ?? '';
}

export const mockDemoService: DemoService = {
  async simulatePriceDrop(productId) {
    await simulateLatency(120);
    const id = resolveProductId(productId);
    const product = mockDb.getState().products.find((item) => item.id === id);
    if (!product) {
      throw { message: 'No product available to simulate.' };
    }
    const current = getLowestPrice(product.offers) ?? 1000;
    return applyProductPrice(id, Math.max(99, Math.round(current * 0.92))).product;
  },
  async simulateTargetReached(productId) {
    await simulateLatency(120);
    const id = resolveProductId(productId);
    const tracking = mockDb.getState().tracking.find((item) => item.productId === id && item.status === 'active');
    const product = mockDb.getState().products.find((item) => item.id === id);
    if (!product) {
      throw { message: 'No product available to simulate.' };
    }
    const target = tracking?.targetPrice ?? Math.round((getLowestPrice(product.offers) ?? 1000) * 0.9);
    return applyProductPrice(id, Math.max(99, target - 500)).product;
  },
  async resetMockData() {
    await simulateLatency(80);
    mockDb.reset();
  },
};
