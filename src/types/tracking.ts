export type TrackingStatus = 'active' | 'target_reached' | 'paused' | 'expired';

export interface PriceTracking {
  id: string;
  userId: string;
  productId: string;
  targetPrice: number;
  status: TrackingStatus;
  createdAt: string;
  lastCheckedAt: string;
  previousPrice: number | null;
}
