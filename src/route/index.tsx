import React from 'react'
import { RouteObject } from 'react-router-dom'
import BusinessMap from 'src/pages/BuissnessMap'
import PreviewMap from 'src/pages/PreviewMap'

const routerList: RouteObject[] = [
  {
    path: '/',
    element: <BusinessMap />
  },
  {
    path: '/previewMap',
    element: <PreviewMap />
  },
  {
    path: '*',
    element: <BusinessMap />
  }
]

export default routerList
