import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // 获取环境变量
  const env = loadEnv(mode, process.cwd())
  return {
    base: './',
    plugins: [vue()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '~': path.resolve(__dirname, './types'),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/common/style/main.scss";',
        },
      },
    },
    server: {
      strictPort: true, // * 固定端口(如果端口被占用则中止)
      host: true, // 0.0.0.0
      proxy: env.VITE_OPEN_PROXY
        ? {
            //配置跨域
            [env.VITE_BASE_URL]: {
              target: env.VITE_TARGET_URL,
              ws: true,
              changOrigin: true,
              rewrite: (path) => path.replace(env.VITE_BASE_URL, ''),
            },
          }
        : null,
    },
  }
})
