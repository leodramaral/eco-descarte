/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CLARITY_PROJECT_ID: string;
  readonly VITE_CLARITY_ENABLED: string;
  readonly VITE_APP_BASE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
