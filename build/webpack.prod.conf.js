var webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
var path = require('path')

module.exports = merge(baseWebpackConfig, {
  // plugins: [new webpack.optimize.CommonsChunkPlugin({
  //   name: 'vendor',
  //   minChunks(module, count) {
  //     // any required modules inside node_modules are extracted to vendor
  //     return (
  //       module.resource &&
  //       /\.js$/.test(module.resource) &&
  //       module.resource.indexOf(
  //         path.join(__dirname, '../node_modules')
  //       ) === 0
  //     )
  //   }
  // })]
})
