import {
  create,
  NButton,
  NConfigProvider,
  NMessageProvider,
  NDialogProvider,
  NLoadingBarProvider,
} from 'naive-ui'

// 按需全局注册naive-ui组件
export const naive = create({
  components: [NLoadingBarProvider, NDialogProvider, NConfigProvider, NMessageProvider, NButton],
})
