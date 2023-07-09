const path = require('path')
const sassResourcesLoader = require('craco-sass-resources-loader')
module.exports = {
  plugins: [
    {
      plugin: sassResourcesLoader,
      options: {
        resources: [
          './src/shared/styles/theme.scss',
          './src/shared/styles/variable.scss',
          './src/shared/styles/common.scss'
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
