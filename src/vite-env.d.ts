/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DJANGO_API_URL?: string;
  readonly VITE_GOOGLE_SHEET_WEBHOOK_URL?: string;
  readonly VITE_EVENT_GOOGLE_FORM_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

