import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
// 使用 gzip 或者 brotli 来压缩资源
import viteCompression from 'vite-plugin-compression'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // 获取环境变量
  const env = loadEnv(mode, process.cwd())
  return {
    base: './',
    plugins: [
      vue(),
      // gzip压缩 生产环境生成 .gz 文件
      viteCompression({
        verbose: true,
        disable: false,
        threshold: 10240,
        algorithm: 'gzip',
        ext: '.gz',
      }),
    ],
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
    build: {
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
    },
    server: {
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
