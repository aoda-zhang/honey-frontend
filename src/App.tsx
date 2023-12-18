import React from 'react'
import 'normalize.css'
import routeList from './router'
import { useRoutes } from 'react-router-dom'

const App: React.FC = () => {
  const router = useRoutes(routeList)
  return router
}

export default App
