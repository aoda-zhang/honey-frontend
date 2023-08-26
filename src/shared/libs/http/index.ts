import envConfig from '@/config/env'
import message from 'antd/es/message'
import axios, { AxiosRequestConfig, AxiosResponse, AxiosRequestHeaders } from 'axios'
const Http = axios.create({
  timeout: 20000,
  baseURL: envConfig.baseURL
})
// 自定义请求头
const customHeaders = {
  Accept: 'application/json'
}

// 成功请求config处理
const interceptorsReq = (config: AxiosRequestHeaders) => {
  // @ts-ignore
  config.headers = { ...config.headers, ...customHeaders }
  return config
}

const errorHandler = error => {
  message.error(`${error}${envConfig?.commonErrorMessage}`)
}

// 请求拦截处理
// @ts-ignore
Http.interceptors.request.use(interceptorsReq, err => {
  errorHandler(err)
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
// 响应拦截处理
Http.interceptors.response.use(interceptorsResSuccess, error => {
  errorHandler(error?.message)
  return Promise.reject(error)
})
const httpService = {
  async getAPI<T extends unknown>(
    url: string,
    params?: Record<string, any>,
    config?: AxiosRequestConfig
  ): Promise<T | any> {
    // @ts-ignore
    return Http.get<T>(url, { params, ...config })
  },
  deleteAPI<T extends unknown>(
    url: string,
    params?: Record<string, any>,
    config?: AxiosRequestConfig
  ): Promise<T> {
    // @ts-ignore
    return Http.delete<T>(url, { params, ...config })
  },
  postAPI<T extends unknown>(
    url: string,
    data?: Record<string, any>,
    config?: AxiosRequestConfig
  ): Promise<T | any> {
    // @ts-ignore
    return Http.post<T>(url, data, { ...config })
  },
  putAPI<T extends unknown>(
    url: string,
    data?: Record<string, any>,
    config?: AxiosRequestConfig
  ): Promise<T> {
    // @ts-ignore
    return Http.put<T>(url, data, { ...config })
  }
}
export default httpService
