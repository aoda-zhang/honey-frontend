import CryptoJS from "crypto-js";
import envConfig from "@/config/env";
import * as dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
export type HMACParams = {
  data: string;
  timestamp: number;
};
export const getCryptUTCTimestamp = timestamp => {
  try {
    return CryptoJS.AES.encrypt(
      CryptoJS.enc.Utf8.parse(`${timestamp}`),
      envConfig?.privateKey,
    );
  } catch (error) {
    console.error(`${error}`);
  }
};
export const getUTCTimestamp = () => {
  return Math.floor(dayjs.utc().valueOf() / 1000);
};
export const generateHMAC = ({ data, timestamp }: HMACParams): string => {
  try {
    const bodyString = data ? JSON.stringify(data) : "";
    return CryptoJS.HmacSHA256(
      `${bodyString}+${timestamp}`,
      envConfig?.privateKey,
    ).toString(CryptoJS.enc.Hex);
  } catch (error) {
    console.error(`${error}`);
  }
};
