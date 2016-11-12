var webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
var path = require('path')
var ExtractTextPlugin = require("extract-text-webpack-plugin")


module.exports = merge(baseWebpackConfig, {
  vue: {
    loaders: {
      css: ExtractTextPlugin.extract("css"),
      sass: ExtractTextPlugin.extract("css!sass")
    }
  },
  plugins: [
    // 去除warning 提示
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: "'production'" // 注意这里:双引号里一定单引号
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new ExtractTextPlugin('style.[contenthash].css', {
      allChunks: true // https://github.com/webpack/extract-text-webpack-plugin/issues/208
    }),
    // new webpack.optimize.CommonsChunkPlugin({
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
    // })
  ]
})
