import React from 'react'
import { RouteObject } from 'react-router-dom'
import BusinessMap from 'src/pages/BuissnessMap'
import Home from 'src/pages/Home'
import Hospital from 'src/pages/Hospital'
import PreviewMap from 'src/pages/PreviewMap'

const routerList: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
    children: [
      {
        path: '/hospital',
        element: <Hospital />
      },
      {
        path: '/businessMap',
        element: <BusinessMap />
      },
      {
        path: '/previewMap',
        element: <PreviewMap />
      }
    ]
  }
]

export default routerList
