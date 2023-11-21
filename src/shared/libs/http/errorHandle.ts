import { message } from 'antd'
import { HttpBusinessMappingCode, commonHeader } from './interface'
import storage from '@/shared/utils/storage'
import authAPI from '@/pages/Auth/apis'
import envConfig from '@/config/env'
const jwtExpiredHandle = async () => {
  try {
    const newToken = await authAPI.refreshToken({
      refreshToken: storage.get(commonHeader.refreshToken)
    })

    await storage.set(commonHeader['access-token'], newToken?.accessToken)
    await storage.set(commonHeader.refreshToken, newToken?.refreshToken)
  } catch (error) {
    message.error('登陆过期，请重新登录！')
    window.location.href = '/login'
  }
}

const httpErrorHandler = async error => {
  switch (error?.status ?? error?.statusCode) {
    case 401:
      if (error?.data === HttpBusinessMappingCode.jwtexpired) {
        jwtExpiredHandle()
      }
      break
    case 500:
      message.error(`${envConfig?.commonErrorMessage}`)
      break
    default:
      message.error(error?.message ? error?.message : `${envConfig?.commonErrorMessage}`)
  }
}

export default httpErrorHandler
