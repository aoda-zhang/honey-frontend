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
  return CryptoJS.AES.encrypt(`${timestamp}`, envConfig?.privateKey).toString();
};
export const getUTCTimestamp = () => {
  return Math.floor(dayjs.utc().valueOf() / 1000);
};
export const generateHMAC = ({ data, timestamp }: HMACParams): string => {
  const bodyString = data ? JSON.stringify(data) : "";
  console.log("bodyString", bodyString);

  const hmac = CryptoJS.HmacSHA256(
    `${bodyString}+${timestamp}`,
    envConfig?.privateKey,
  );
  return CryptoJS.enc.Hex.stringify(hmac);
};
