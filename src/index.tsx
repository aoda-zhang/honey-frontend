import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import 'antd/dist/antd.css'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ConfigProvider locale={zhCN}>
        <App />
      </ConfigProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)
