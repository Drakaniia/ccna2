/// <reference types="astro/client" />

interface ImportMetaEnv {
  /** Public origin of the Cloudflare Worker that performs Buksu SSO auth. */
  readonly PUBLIC_AUTH_BASE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
