import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { ConfigProvider } from "antd";
import "antd/dist/reset.css";
import envConfig from "./config/env";
const theme = {
  token: {
    colorPrimary: envConfig?.colorPrimary,
  },
};

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ConfigProvider theme={theme}>
        <App />
      </ConfigProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root"),
);
