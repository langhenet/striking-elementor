const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = merge(common, {
  mode: 'production',
  // devtool: 'source-map',
  optimization: {
		minimize: true
    // splitChunks: {
    //   chunks: 'all'
    // }
  },
  plugins: [

    // new BundleAnalyzerPlugin()
  ]
})