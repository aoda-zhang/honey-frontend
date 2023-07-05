import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import 'antd/dist/reset.css'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ConfigProvider>
        <App />
      </ConfigProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)
