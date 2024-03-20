import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ConfigProvider } from "antd";
import "antd/dist/reset.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./App";
const queryClient = new QueryClient();
import envConfig from "./config/env";
import "./i18n";
const theme = {
  token: {
    colorPrimary: envConfig?.colorPrimary,
  },
};
const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <Router>
      <QueryClientProvider client={queryClient}>
        <ConfigProvider theme={theme}>
          <App />
        </ConfigProvider>
      </QueryClientProvider>
    </Router>
  </React.StrictMode>,
);
