/**
 * webpack打包相关在此配置
 */
const {
  override,
  addWebpackAlias,
  adjustStyleLoaders,
  addWebpackPlugin,
  fixBabelImports
} = require('customize-cra')
const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const resolve = dir => path.join(__dirname, '.', dir)
const rewireReactHotLoader = require('react-app-rewire-hot-loader')
const isPrd = process.env.NODE_ENV === 'production'
module.exports = override(
  // antd 按需加载
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css'
  }),
  // 路径别名设置
  addWebpackAlias({
    '@': resolve(__dirname, './src'),
    '@apis': resolve(__dirname, './src/apis'),
    '@components': resolve(__dirname, './src/components')
  }),
  // scss全局样式动态挂载
  adjustStyleLoaders(rule => {
    if (rule.test.toString().includes('scss')) {
      rule.use.push({
        loader: require.resolve('sass-resources-loader'),
        options: {
          resources: [
            './src/assets/style/theme.scss',
            './src/assets/style/variable.scss',
            './src/assets/style/common.scss'
          ]
        }
      })
    }
  }),
  isPrd &&
    addWebpackPlugin(
      new UglifyJsPlugin({
        cache: false,
        parallel: true,
        uglifyOptions: {
          warnings: false,
          compress: {
            drop_console: true,
            drop_debugger: true
          }
        }
      })
    ),
  (config, env) => {
    config = rewireReactHotLoader(config, env)
    return config
  }
)
