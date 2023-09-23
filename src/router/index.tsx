import React from 'react'
import Welcome from '@/pages/Welcome'
import { RouteObject } from 'react-router-dom'
import Fare from '@/pages/Fare'

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
    path: '*',
    element: <Welcome />
  }
]

export default routerList
