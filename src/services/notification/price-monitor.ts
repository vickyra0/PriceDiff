import { env } from '@/config/env';
import { tickRandomWatchedPrice } from '@/services/mock/price-engine';

type TickListener = () => void;

const listeners = new Set<TickListener>();
let timer: number | null = null;

export function subscribePriceMonitor(listener: TickListener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function startPriceMonitoring(): () => void {
  if (!env.enableMockApi || timer != null) {
    return () => {
      stopPriceMonitoring();
    };
  }
  timer = window.setInterval(() => {
    tickRandomWatchedPrice();
    listeners.forEach((listener) => listener());
  }, env.priceMonitorIntervalMs);
  return () => {
    stopPriceMonitoring();
  };
}

export function stopPriceMonitoring(): void {
  if (timer != null) {
    window.clearInterval(timer);
    timer = null;
  }
}
