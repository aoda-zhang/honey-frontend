import React from "react";
import "normalize.css";
import { useRoutes } from "react-router-dom";

import routeList from "./router";

const App: React.FC = () => {
  const router = useRoutes(routeList);
  return router;
};

export default App;
