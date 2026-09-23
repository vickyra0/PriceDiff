import type { PriceTracking } from '@/types/tracking';

export function findActiveTracking(
  records: PriceTracking[],
  userId: string,
  productId: string,
): PriceTracking | undefined {
  return records.find(
    (record) =>
      record.userId === userId &&
      record.productId === productId &&
      record.status !== 'expired',
  );
}
