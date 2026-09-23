import { subDays, formatISO } from 'date-fns';
import type { PriceHistoryPoint, Product } from '@/types/product';

function hash(value: string): number {
  let h = 0;
  for (let i = 0; i < value.length; i += 1) {
    h = (h << 5) - h + value.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

export function generatePriceHistory(products: Product[], days = 365): Record<string, PriceHistoryPoint[]> {
  const history: Record<string, PriceHistoryPoint[]> = {};
  const today = new Date('2026-09-23T00:00:00.000Z');

  for (const product of products) {
    const points: PriceHistoryPoint[] = [];
    for (const offer of product.offers) {
      if (offer.price == null) {
        continue;
      }
      let cursor = offer.originalPrice ?? Math.round(offer.price * 1.08);
      const seed = hash(`${product.id}-${offer.platformId}`);
      for (let day = days; day >= 0; day -= 4) {
        const wave = Math.sin((days - day + seed) / 18) * 0.03;
        const jitter = ((seed + day) % 7) / 200;
        cursor = Math.max(Math.round(cursor * (1 - wave * 0.15 - jitter * 0.2)), Math.round(offer.price * 0.82));
        if (day < 8) {
          cursor = offer.price;
        }
        points.push({
          date: formatISO(subDays(today, day), { representation: 'date' }),
          price: cursor,
          platformId: offer.platformId,
          platformName: offer.platformName,
        });
      }
    }
    history[product.id] = points.sort((a, b) => a.date.localeCompare(b.date));
  }
  return history;
}
