export interface HttpResponseType {
  data: unknown
  isSuccess: boolean
  message: string | string[]
  status: number
}
