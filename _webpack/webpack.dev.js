const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

let PROXY_URL = 'http://vigneto.langhe.test/';

module.exports = merge(common, {
  devtool: 'inline-source-map',
  plugins: [
    // about SASS compilation
    new BrowserSyncPlugin({
      // browse to http://localhost:3000/ during development
      reload: true,
      host: 'localhost',
      files: [
        {
          match: [
            '**/*.php',
            '**/*.twig' // CASSI
          ],
          fn: function (event, file) {
            if (event === 'change') {
              const bs = require('browser-sync').get('bs-webpack-plugin')
              bs.reload()
            }
          }
        }
      ],
      port: 3000,
      // proxy the Webpack Dev Server endpoint
      // (which should be serving on http://localhost:3100/)
      // through BrowserSync
      proxy: PROXY_URL
    })
  ]
})
