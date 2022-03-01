import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import App from '@/App.vue'
import NProgress from 'nprogress'
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: App, // 注意这里要带上 文件后缀.vue
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
