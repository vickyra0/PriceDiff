import { simulateLatency } from '@/services/api/delay';
import type { TrackingService } from '@/services/contracts';
import { mockDb } from '@/services/mock/db';
import type { PriceTracking } from '@/types/tracking';
import { createId } from '@/utils/cn';
import { getLowestPrice, isTargetPriceReached } from '@/utils/price.utils';
import { findActiveTracking } from '@/utils/tracking.utils';

export const mockTrackingService: TrackingService = {
  async getTracking(userId) {
    await simulateLatency();
    return mockDb.getState().tracking.filter((item) => item.userId === userId);
  },
  async startTracking(userId, productId, targetPrice) {
    await simulateLatency();
    if (!Number.isFinite(targetPrice) || targetPrice <= 0) {
      throw { message: 'Please enter a valid target price.', code: 'INVALID_TARGET' };
    }
    const existing = findActiveTracking(mockDb.getState().tracking, userId, productId);
    const product = mockDb.getState().products.find((item) => item.id === productId);
    const current = product ? getLowestPrice(product.offers) : null;
    if (existing) {
      const updated: PriceTracking = {
        ...existing,
        targetPrice,
        status: isTargetPriceReached(current, targetPrice) ? 'target_reached' : 'active',
        lastCheckedAt: new Date().toISOString(),
      };
      mockDb.setState({
        tracking: mockDb.getState().tracking.map((item) => (item.id === existing.id ? updated : item)),
      });
      return updated;
    }
    const record: PriceTracking = {
      id: createId('trk'),
      userId,
      productId,
      targetPrice,
      status: isTargetPriceReached(current, targetPrice) ? 'target_reached' : 'active',
      createdAt: new Date().toISOString(),
      lastCheckedAt: new Date().toISOString(),
      previousPrice: current,
    };
    mockDb.setState({ tracking: [record, ...mockDb.getState().tracking] });
    return record;
  },
  async updateTarget(trackingId, targetPrice) {
    await simulateLatency();
    if (!Number.isFinite(targetPrice) || targetPrice <= 0) {
      throw { message: 'Please enter a valid target price.', code: 'INVALID_TARGET' };
    }
    const current = mockDb.getState().tracking.find((item) => item.id === trackingId);
    if (!current) {
      throw { message: 'Tracking record not found.', status: 404 };
    }
    const product = mockDb.getState().products.find((item) => item.id === current.productId);
    const price = product ? getLowestPrice(product.offers) : null;
    const updated: PriceTracking = {
      ...current,
      targetPrice,
      status:
        current.status === 'paused'
          ? 'paused'
          : isTargetPriceReached(price, targetPrice)
            ? 'target_reached'
            : 'active',
    };
    mockDb.setState({
      tracking: mockDb.getState().tracking.map((item) => (item.id === trackingId ? updated : item)),
    });
    return updated;
  },
  async setStatus(trackingId, status) {
    await simulateLatency(120);
    const current = mockDb.getState().tracking.find((item) => item.id === trackingId);
    if (!current) {
      throw { message: 'Tracking record not found.', status: 404 };
    }
    const updated = { ...current, status };
    mockDb.setState({
      tracking: mockDb.getState().tracking.map((item) => (item.id === trackingId ? updated : item)),
    });
    return updated;
  },
  async removeTracking(trackingId) {
    await simulateLatency(120);
    mockDb.setState({
      tracking: mockDb.getState().tracking.filter((item) => item.id !== trackingId),
    });
  },
};
