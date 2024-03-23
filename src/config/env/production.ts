const environment = import.meta.env;
const productionEnv = {
  baseURL: environment?.REACT_APP_BASEURL,
  commonErrorMessage: "出错了，请稍后重试！！！！",
  welcomeMessage: "Welcome to our reimbursement system",
  colorPrimary: "#1c7d29",
  oilPrice: environment?.REACT_APP_OIL_PRICE,
  privateKey: environment?.REACT_APP_PRIVATE_KEY,
};
export default productionEnv;
