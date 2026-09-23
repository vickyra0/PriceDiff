interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_APP_NAME: string;
  readonly VITE_ENABLE_MOCK_API: string;
  readonly VITE_ENABLE_DEMO_CONTROLS: string;
  readonly VITE_PRICE_MONITOR_INTERVAL_MS: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
