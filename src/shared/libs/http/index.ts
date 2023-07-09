import envConfig from '@/config/env'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { message } from 'antd'
// 基础请求配置
const Http = axios.create({
  timeout: 20000,
  // 根据不同环境，切换请求baseUrl
  baseURL: envConfig?.baseURL
})

// 自定义请求头
const customHeaders = {
  Accept: 'application/json'
}

// 请求config处理
const interceptorsReq = (config: AxiosRequestConfig) => {
  config.headers = { ...config.headers, ...customHeaders }
  return config
}

const errorHandler = error => {
  message.error(`${error}${envConfig?.commonErrorMessage}`)
}

// 错误请求拦截处理
Http.interceptors.request.use(interceptorsReq, err => {
  errorHandler(err?.message)
  return Promise.reject(err?.message)
})

// 成功响应拦截处理
const interceptorsResSuccess = <T>(response: AxiosResponse<T>) => {
  if (response.status >= 200 && response.status < 400) {
    const responseData = response?.data
    return Promise.resolve(responseData)
  } else {
    errorHandler(response.status)
    return Promise.reject()
  }
}

// 错误响应拦截处理
Http.interceptors.response.use(interceptorsResSuccess, error => {
  errorHandler(error?.message)
  return Promise.reject(error)
})

// 基础API
const httpService = {
  async getAPI<T>(url: string, params?: Record<string, any>): Promise<T> {
    // @ts-ignore
    return Http.get<T>(url, { params })
  },
  postAPI<T>(url: string, data?: Record<string, any>): Promise<T> {
    // @ts-ignore
    return Http.post<T>(url, { data })
  },
  putAPI<T>(url: string, data?: Record<string, any>): Promise<T> {
    // @ts-ignore
    return Http.put<T>(url, { data })
  },
  deleteAPI<T>(url: string, params?: Record<string, any>): Promise<T> {
    // @ts-ignore
    return Http.delete<T>(url, { params })
  }
}

export default httpService
