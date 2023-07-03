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
  baseURL: process.env.API_BASE_URL || 'https://example.com/api'
})

// 自定义请求头
const customHeaders = {
  Accept: 'application/json'
}

// 请求拦截处理
const interceptorsReq = (config: AxiosRequestConfig) => {
  config.headers = { ...config.headers, ...customHeaders }
  return config
}

// 错误请求拦截处理
Http.interceptors.request.use(interceptorsReq, err => {
  return Promise.reject(err.message)
})

// 成功响应拦截处理
const interceptorsResSuccess = <T>(response: AxiosResponse<Response<T>>) => {
  if (response.status >= 200 && response.status < 300) {
    const responseData = response.data
    if (responseData.success && responseData.data !== undefined) {
      return Promise.resolve(responseData)
    } else {
      throw new Error('Invalid response data')
    }
  } else {
    throw new Error(`Request failed with status code ${response.status}`)
  }
}

// 错误响应拦截处理
Http.interceptors.response.use(interceptorsResSuccess, error => {
  // return errorHandler(error);
  return Promise.reject(error)
})

// 基础API
function getApi<T>(url: string, params?: Record<string, any>): Promise<AxiosResponse<Response<T>>> {
  return Http.get<Response<T>>(url, { params })
}

function postApi<T>(url: string, data?: Record<string, any>): Promise<AxiosResponse<Response<T>>> {
  return Http.post<Response<T>>(url, { data })
}

function putApi<T>(url: string, data?: Record<string, any>): Promise<AxiosResponse<Response<T>>> {
  return Http.put<Response<T>>(url, { data })
}

function deleteApi<T>(
  url: string,
  params?: Record<string, any>
): Promise<AxiosResponse<Response<T>>> {
  return Http.delete<Response<T>>(url, { params })
}

export { getApi, postApi, putApi, deleteApi }
