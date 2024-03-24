import { message } from "antd";
import { HttpBusinessMappingCode, commonHeader } from "./interface";
import storage from "@/shared/utils/storage";
import authAPI from "@/pages/Auth/apis";
import envConfig from "@/config/env";
const jwtExpiredHandle = async () => {
  try {
    const newAuthToken = await authAPI.refreshToken({
      refreshToken: storage.get(commonHeader.refreshToken),
    });

    await storage.set(commonHeader["access-token"], newAuthToken?.accessToken);
    await storage.set(commonHeader.refreshToken, newAuthToken?.refreshToken);
  } catch (error) {
    message.error("登陆过期，请重新登录！");
    await storage.remove(commonHeader["access-token"]);
    await storage.remove(commonHeader.refreshToken);
    window.location.href = "/login";
  }
};

const httpErrorHandler = async error => {
  switch (error?.status ?? error?.statusCode) {
    case 401:
      if (
        error?.data === HttpBusinessMappingCode.jwtexpired ||
        error?.message === HttpBusinessMappingCode.unauthorized
      ) {
        message.error(error?.message);
        jwtExpiredHandle();
      }
      break;
    case 500:
      message.error(`${envConfig?.systemSettings?.commonErrorMessage}`);
      break;
    default:
      message.error(
        error?.message
          ? error?.message
          : `${envConfig?.systemSettings?.commonErrorMessage}`,
      );
  }
};

export default httpErrorHandler;
