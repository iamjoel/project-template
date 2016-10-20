var webpack = require('webpack')
var path = require('path')
var srcPrefix = './src/public/'
var autoprefixer = require('autoprefixer')
var precss = require('precss')

module.exports = {
  devtool: 'eval-source-map',
  entry: {
    'app': './src/app.js'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist', // 用异步加载模块一定要加这个
    filename: '[name].js',
    trunkFilename: '[name].bundle.js'
  },
  module: {
    loaders: [
      { test: /\.html$/, loader: "html-loader" }, {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'url?limit=10000'
      },
      { test: /\.css$/, loader: "css-loader!postcss-loader" }, {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.vue$/,
        loader: 'vue',
        options: {
          // vue-loader options go here
        }
      }
    ]
  },
  postcss: function () {
    return [autoprefixer, precss]
  },
  resolve: {
    alias: {
      'vue': 'vue/dist/vue.js',// 用 Standalone 版本 https://github.com/vuejs/vue/wiki/Vue-2.0-RC-Starter-Resources#standalone-vs-runtime-builds
      'component': path.resolve(__dirname, 'src/component'),
      'views': path.resolve(__dirname, 'src/views'),
      'store': path.resolve(__dirname, `${srcPrefix}helper/store.js`),
      'route-component': path.resolve(__dirname, `${srcPrefix}helper/route-component.js`),
      'setting': path.resolve(__dirname, 'setting.js'),
      'language-helper': path.resolve(__dirname, `${srcPrefix}helper/language.js`)
    }
  },
}
