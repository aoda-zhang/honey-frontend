/// <referencetypes="react-scripts"/>
import { AxiosRequestConfig as config } from 'axios'
interface HttpResponse<T> {
  code: number
  message: string
  data: T
  success: boolean
}
// axios 响应体重构
declare module 'axios' {
  export interface AxiosRequestConfig extends config {
    // 扩展的请求config
    validityTime?: number
    disableCache?: boolean
  }
  export interface AxiosInstance {
    <T = any>(config: AxiosRequestConfig): Promise<HttpResponse<T>>
    request<T = any>(config: AxiosRequestConfig): Promise<HttpResponse<T>>
    get<T = any>(url: string, config?: AxiosRequestConfig): Promise<HttpResponse<T>>
    delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<HttpResponse<T>>
    head<T = any>(url: string, config?: AxiosRequestConfig): Promise<HttpResponse<T>>
    post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<HttpResponse<T>>
    put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<HttpResponse<T>>
    patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<HttpResponse<T>>
  }
}
