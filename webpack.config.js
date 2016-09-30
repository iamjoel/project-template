var webpack = require('webpack');
var path = require('path');
var srcPrefix = './assets/js-src/';
module.exports = {
  devtool: 'eval-source-map',
  entry: {
    'app': srcPrefix + 'app',
    vendors: ['vue','jquery']
  },
  output: {
    'path': 'assets/js',
    filename: '[name].js',
    trunkFilename: '[name].bundle.js',
    publicPath: '/assets/js/' // 用异步加载模块一定要加这个
  },
  module: {
    loaders: [
      { test: /\.html$/, loader: "html-loader" }, {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'url?limit=10000'
      },
      { test: /\.css$/, loader: "css-loader" }
    ]
  },
  resolve: {
    alias: {
      'store': path.resolve(__dirname, 'assets/js-src/helper/store.js'),
      'route-component': path.resolve(__dirname, 'assets/js-src/helper/route-component.js'),
      'setting': path.resolve(__dirname, 'setting.js'),
      'language-helper': path.resolve(__dirname, 'assets/js-src/helper/language.js'),
      'modal': path.resolve(__dirname, 'assets/component/modal/index.js'),
      'alert': path.resolve(__dirname, 'assets/component/alert/index.js'),
      'confirm': path.resolve(__dirname, 'assets/component/confirm/index.js'),
    }
  },
  // plugins: [new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js')]
};
