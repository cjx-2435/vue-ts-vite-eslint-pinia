import http from '@/api/config'
import { User as UserType, Resp } from '~/index'

export default class User {
  // 登录并获取token
  public static async Login(user: UserType) {
    const { message, msg, status } = await http.post<UserType, Resp<string>>('/login', user)
    return { message, msg }
  }
}
