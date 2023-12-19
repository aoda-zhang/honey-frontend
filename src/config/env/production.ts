module.exports = {
  baseURL: process.env.REACT_APP_BASEURL,
  commonErrorMessage: "出错了，快去找齐琪哥修bug！！！！",
  welcomeMessage: "Welcome to our reimbursement system",
  auth: {
    inputAuthCode: "Please enter the authorization code",
    authCode: process.env.REACT_APP_AUTHCODE,
    noAuthMessage: "个人网站，请勿滥用，输入正确的授权码可进入",
  },
  colorPrimary: "#1c7d29",
  apiKey: {
    bussiness: process.env.REACT_APP_BUSSINESS_API_KEY,
  },
  oilPrice: process.env.REACT_APP_OIL_PRICE,
};
