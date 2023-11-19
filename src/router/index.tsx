import React from 'react'
import Welcome from '@/pages/Welcome'
import { RouteObject } from 'react-router-dom'
import Fare from '@/pages/Fare'
import Login from '@/pages/Auth/Login'
import Register from '@/pages/Auth/Register'

const routerList: RouteObject[] = [
  {
    path: '/',
    element: <Welcome />
  },
  {
    path: '/welcome',
    element: <Welcome />
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
    element: <Welcome />
  }
]

export default routerList
