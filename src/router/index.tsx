import React from 'react'
import { RouteObject } from 'react-router-dom'
import Fare from '@/pages/Fare'
import Login from '@/pages/Auth/Login'
import Register from '@/pages/Auth/Register'

const routerList: RouteObject[] = [
  {
    path: '/',
    element: <Login />
  },
  {
    path: '/fare',
    element: <Fare />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '*',
    element: <Login />
  }
]

export default routerList
