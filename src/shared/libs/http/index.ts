import envConfig from '@/config/env'
import axios, { AxiosRequestConfig, AxiosResponse, AxiosRequestHeaders } from 'axios'
import { HttpResponseType, commonHeader } from './interface'
import storage from '@/shared/utils/storage'
import httpErrorHandler from './errorHandle'
const Http = axios.create({
  timeout: 20000,
  baseURL: envConfig.baseURL
})
// 自定义请求头 函数式调用可及时更新local获取的参数
const getHttpHeaders = () => {
  return {
    Accept: 'application/json',
    'Access-Token': storage.get(commonHeader['access-token'])
  }
}

// 成功请求config处理
const interceptorsReq = (config: AxiosRequestHeaders) => {
  // @ts-ignore
  config.headers = { ...config.headers, ...getHttpHeaders() }
  return config
}

// 请求拦截处理
// @ts-ignore
Http.interceptors.request.use(interceptorsReq, err => {
  httpErrorHandler(err)
  return Promise.reject(err?.message)
})

// 成功响应拦截处理
const interceptorsResSuccess = (response: AxiosResponse<HttpResponseType>) => {
  if (response?.data?.status >= 200 && response?.data?.status < 400 && response?.data?.isSuccess) {
    const responseData = response?.data?.data
    return Promise.resolve(responseData)
  } else {
    httpErrorHandler(response?.data)
    return Promise.reject()
  }
}
// 响应拦截处理
Http.interceptors.response.use(interceptorsResSuccess, error => {
  console.log('esponse?.data-----------', error)
  httpErrorHandler(error?.response?.data)
  return Promise.reject(error)
})
const httpService = {
  async getAPI<T extends unknown>(
    url: string,
    params?: Record<string, any>,
    config?: AxiosRequestConfig
  ): Promise<T> {
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
  ): Promise<T> {
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
