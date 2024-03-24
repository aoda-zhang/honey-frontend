import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ConfigProvider } from "antd";
import "antd/dist/reset.css";

import App from "./App";
import envConfig from "./config/env";
import "./i18n";
const theme = {
  token: {
    colorPrimary: envConfig?.systemSettings?.colorPrimary,
  },
};
const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <Router>
      <ConfigProvider theme={theme}>
        <App />
      </ConfigProvider>
    </Router>
  </React.StrictMode>,
);
