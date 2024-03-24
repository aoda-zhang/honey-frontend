const environment = import.meta.env;
const developEnv = {
  http: {
    baseURL: environment?.REACT_APP_BASEURL,
    auth: {
      privateKey: environment?.REACT_APP_PRIVATE_KEY,
    },
    systemSettings: {
      colorPrimary: "#1c7d29",
      commonErrorMessage: "系统出错，请稍后重试.",
      oilPrice: environment?.REACT_APP_OIL_PRICE,
    },
  },
};

export default developEnv;
