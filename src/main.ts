import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import '@/api/config'
import NProgress from 'NProgress'
import 'nprogress/nprogress.css' // 引入样式
import { createPinia } from 'pinia'
import { naive } from '@/lib'
// 引入naive-ui推荐字体
import 'vfonts/Lato.css'

// 简单配置
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false })

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

createApp(App).use(router).use(createPinia()).use(naive).mount('#app')
