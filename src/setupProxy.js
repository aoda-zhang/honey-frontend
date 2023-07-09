const { createProxyMiddleware } = require('http-proxy-middleware')

/**
 * 1.可设置多个proxy代理
 * 2.此文件一定要存在src目录下，不是根目录下，本人有血的教训！！！！！
 *  */

module.exports = function (app) {
  app.use(
    // 浏览器匹配api，代理到地址后端项目地址http://172.19.5.35:9536
    createProxyMiddleware('/api', {
      target: 'https://zyr.onrender.com',
      secure: false,
      changeOrigin: true
      // 根据具体后端项目，无api字段可直接配置为/，有api字段可不用这行处理
    })
  )
  app.use(
    // 浏览器匹配apc，代理到地址http://172.19.5.34:9531
    createProxyMiddleware('/apc', {
      target: 'http://172.19.5.34:9531',
      secure: false,
      changeOrigin: true,
      pathRewrite: {
        '^/apc': '/'
      }
    })
  )
}
