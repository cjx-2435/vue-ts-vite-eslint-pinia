/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface ImportMetaEnv {
  readonly VITE_TIME_OUT: string
  readonly VITE_OPEN_PROXY: boolean
  readonly VITE_TARGET_URL: string
  readonly VITE_BASE_URL: string
  readonly VITE_PORT: string
}
