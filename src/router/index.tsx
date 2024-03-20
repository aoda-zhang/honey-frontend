import React from "react";
import { Navigate, RouteObject } from "react-router-dom";

import Fare from "@/pages/Fare";
import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Register";
import History from "@/pages/History";
import Home from "@/pages/Home";
import Setting from "@/pages/Setting";

const routerList: RouteObject[] = [
  {
    path: "/",
    index: true,
    element: <Home />,
  },
  {
    path: "home",
    element: <Home />,
  },
  {
    path: "fare",
    element: <Fare />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "history",
    element: <History />,
  },
  {
    path: "setting",
    element: <Setting />,
    children: [
      {
        path: "a",
        element: <div>内容A</div>,
      },
      {
        path: "b",
        element: <div>内容B</div>,
      },
      {
        path: "*",
        element: <Navigate to={"/setting/a"} replace />,
      },
    ],
  },
  {
    path: "*",
    element: <Home />,
  },
];
export default routerList;
