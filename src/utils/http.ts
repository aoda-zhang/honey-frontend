import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

// 后端统一的响应体结构
export interface Response<T> {
  code: number
  message: string
  data: T
  success: boolean
}
// 基础请求配置
const Http = axios.create({
  timeout: 20000,
  // 根据不同环境，切换请求baseUrl
  baseURL: ''
})
// Req拦截
const interceptorsReq = (config: AxiosRequestConfig) => {
  // 自定义请求头
  const customizeHeads = {
    Accept: 'application/json'
  }
  config.headers = { ...config.headers, ...customizeHeads }
  return config
}
// 错误请求拦截处理
Http.interceptors.request.use(interceptorsReq, err => {
  return Promise.reject(err.message)
})
// 成功响应拦截处理
const interceptorsResSuccess = (response: AxiosResponse) => {
  if (response.status === 200) {
    return Promise.resolve(response.data)
  }
}
// 错误响应拦截处理
Http.interceptors.response.use(interceptorsResSuccess, error => {
  // return errorHandler(error);
})

// 基础API
function getApi<T>(url: string, params?: Record<string, any>): Promise<Response<T>> {
  return Http.get<T>(url, { params })
}

function postApi<T>(url: string, params?: Record<string, any>): Promise<Response<T>> {
  return Http.post<T>(url, params)
}

function putApi<T>(url: string, params?: Record<string, any>): Promise<Response<T>> {
  return Http.put<T>(url, params)
}

function deleteApi<T>(url: string, params?: Record<string, any>): Promise<Response<T>> {
  return Http.delete<T>(url, { params })
}
export { getApi, postApi, putApi, deleteApi }
