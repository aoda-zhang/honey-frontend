import React from 'react'
import { RouteObject } from 'react-router-dom'
import Fare from '@/pages/Fare'
import Login from '@/pages/Auth/Login'
import Register from '@/pages/Auth/Register'
import History from '@/pages/History'
import Home from '@/pages/Home'

const routerList: RouteObject[] = [
  {
    path: '/',
    element: <Home />
  },
  {
    path: 'home',
    element: <Home />
  },
  {
    path: 'fare',
    element: <Fare />
  },
  {
    path: 'login',
    element: <Login />
  },
  {
    path: 'register',
    element: <Register />
  },
  {
    path: 'history',
    element: <History />
  },
  {
    path: '*',
    element: <Home />
  }
]

export default routerList
