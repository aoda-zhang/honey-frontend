const path = require('path')
const sassResourcesLoader = require('craco-sass-resources-loader')
module.exports = {
  plugins: [
    {
      plugin: sassResourcesLoader,
      options: {
        resources: [
          './src/shared/style/theme.scss',
          './src/shared/style/variable.scss',
          './src/shared/style/common.scss'
        ]
      }
    }
  ],
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@env': path.resolve(__dirname, 'config/env/index.ts')
    }
  }
}
