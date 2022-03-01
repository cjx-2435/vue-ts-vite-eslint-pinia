import axios, { AxiosRequestConfig, AxiosResponse, AxiosInstance, AxiosError } from 'axios'
import { BASE_URL, TIME_OUT } from '@/common/constants'
import { Resp } from '~/index'

console.log(BASE_URL, TIME_OUT)

class Http {
  protected instance: AxiosInstance
  private static _http: Http | null
  // 单例模式
  public static getInstance(config: AxiosRequestConfig) {
    if (!this._http) {
      this._http = new Http(config)
    }
    return this._http
  }
  // 请求库 构造函数
  private constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config)

    this.instance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        const token = sessionStorage.getItem('token')
        if (token) {
          config.headers = {
            ...config.headers,
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          }
        }
        return config
      },
      (err: AxiosError) => {
        return Promise.reject(err)
      }
    )

    this.instance.interceptors.response.use(
      (resp: AxiosResponse<Resp>) => {
        if (resp.data.status > 299 || resp.data.status < 200) {
          return Promise.reject(resp.data.msg)
        }
        return resp.data
      },
      (err: AxiosError) => {
        if (err.response && err.response.status >= 500) {
          return Promise.reject(`响应状态码${err.response?.status},详情请查看network`)
        }
        return Promise.reject(
          err.response?.data?.msg ?? `响应码${err.response?.status},详情请查看network`
        )
      }
    )
  }
  // axios request
  // D为 config中 data 的类型，R是 返回值 的类型
  public async request<D = any, R = Resp>(config: AxiosRequestConfig<D>): Promise<R> {
    // 第一个泛型 为axiosResponse中data的默认值, 第二个泛型为 返回的Promise内容的类型，第三个泛型为 config中 data 的类型，也是其他方法body参数的类型
    const data = await this.instance.request<R, R, D>(config)
    return data
  }
  // axios get
  public async get<D = any, R = Resp>(url: string, config?: AxiosRequestConfig<D>): Promise<R> {
    const data = await this.instance.get<R, R, D>(url, config)
    return data
  }
  // axios post
  public async post<D = any, R = Resp>(
    url: string,
    _data?: D,
    config?: AxiosRequestConfig<URLSearchParams>
  ): Promise<R> {
    const mapping: any[][] = []
    if (_data) {
      for (const key in _data) {
        mapping.push([key, _data[key]])
      }
    }
    const mappingData = new URLSearchParams(mapping)
    const data = await this.instance.post<R, R, URLSearchParams>(url, mappingData, config)
    return data
  }
  // axios put
  public async put<D = any, R = Resp>(
    url: string,
    _data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<R> {
    const data = await this.instance.put<R, R, D>(url, _data, config)
    return data
  }
  // axios delete
  public async delete<D = any, R = Resp>(url: string, config?: AxiosRequestConfig<D>): Promise<R> {
    const data = await this.instance.delete<R, R, D>(url, config)
    return data
  }
}

const http = Http.getInstance({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
})

export default http
