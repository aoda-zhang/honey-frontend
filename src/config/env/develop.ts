const environment = import.meta.env;
const developEnv = {
  baseURL: environment?.REACT_APP_BASEURL,
  commonErrorMessage: "出错了，快去找齐琪哥修bug！！！！",
  colorPrimary: "#1c7d29",
  oilPrice: environment?.REACT_APP_OIL_PRICE,
};
export default developEnv;
