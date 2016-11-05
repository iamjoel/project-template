var webpack = require('webpack')
var path = require('path')
const SRC = '../src'
var autoprefixer = require('autoprefixer')
var precss = require('precss')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = {
  entry: {
    'app': './src/app.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '', // 用异步加载模块一定要加这个
    filename: '[name].[hash].js', // 服务器可以开强缓存
    trunkFilename: '[name].bundle.js'
  },
  module: {
    loaders: [
      { test: /\.html$/, loader: "html-loader" },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'url?limit=10000'
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
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
        }
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      }
    ]
  },
  postcss: function () {
    return [autoprefixer, precss]
  },
  vue: {
    postcss: [autoprefixer(), precss()],// 让 vue-loader 支持 postcss。 http://vue-loader.vuejs.org/en/features/postcss.html
    loaders: {
      css: ExtractTextPlugin.extract("css")
      // sass: ExtractTextPlugin.extract("sass!less")
    }
  },
  plugins: [
      new ExtractTextPlugin('style.[contenthash].css', {
        allChunks: true // https://github.com/webpack/extract-text-webpack-plugin/issues/208
      }),
      new HtmlWebpackPlugin({
        title: '娱乐空间',
        filename: 'index.html',
        template: '!!ejs!index.html'
      }),
  ],
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.js',// standalone version。 想用 complie 方法
      'api': path.resolve(__dirname, `${SRC}/api`),
      'router': path.resolve(__dirname, `${SRC}/router`),
      'component': path.resolve(__dirname, `${SRC}/component`),
      'plugin': path.resolve(__dirname, `${SRC}/plugin`),
      'views': path.resolve(__dirname, `${SRC}/views`),
      'utils': path.resolve(__dirname, `${SRC}/utils`),
      'setting': path.resolve(__dirname, '../setting.js'),
      'menu': path.resolve(__dirname, `${SRC}/router/menu.js`),
      'i18n': path.resolve(__dirname, `${SRC}/i18n`)
    }
  },
}
