function readBoolean(value: string | undefined, fallback: boolean): boolean {
  if (value == null || value === '') {
    return fallback;
  }
  return value === 'true' || value === '1';
}

function readNumber(value: string | undefined, fallback: number): number {
  if (value == null || value === '') {
    return fallback;
  }
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

const viteEnv = import.meta.env;

export const env = {
  apiBaseUrl: viteEnv.VITE_API_BASE_URL ?? 'http://localhost:5000/api',
  appName: viteEnv.VITE_APP_NAME ?? 'PricePulse',
  enableMockApi: readBoolean(viteEnv.VITE_ENABLE_MOCK_API, true),
  enableDemoControls: readBoolean(viteEnv.VITE_ENABLE_DEMO_CONTROLS, true),
  priceMonitorIntervalMs: readNumber(viteEnv.VITE_PRICE_MONITOR_INTERVAL_MS, 20_000),
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
} as const;
