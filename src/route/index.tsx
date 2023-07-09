import Welcome from '@/pages/Welcome'
import React from 'react'
import { RouteObject } from 'react-router-dom'
import BusinessMap from 'src/pages/BuissnessMap'
import PreviewMap from 'src/pages/PreviewMap'

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
    path: '/businessMap',
    element: <BusinessMap />
  },
  {
    path: '/previewMap',
    element: <PreviewMap />
  },
  {
    path: '*',
    element: <Welcome />
  }
]

export default routerList
