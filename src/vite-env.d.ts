/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_OPENWEATHER_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
