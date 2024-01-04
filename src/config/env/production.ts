const environment = import.meta.env;
const productionEnv = {
  baseURL: environment?.REACT_APP_BASEURL,
  commonErrorMessage: "出错了，请稍后重试！！！！",
  welcomeMessage: "Welcome to our reimbursement system",
  colorPrimary: "#1c7d29",
  apiKey: {
    bussiness: environment?.REACT_APP_BUSSINESS_API_KEY,
  },
  oilPrice: environment?.REACT_APP_OIL_PRICE,
};
export default productionEnv;
