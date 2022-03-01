// 正常情况下 统一请求返回值类型
export interface Resp<T = any> {
  status: number
  msg: string
  message: T
}

export interface User {
  name: string
  password: string
}
