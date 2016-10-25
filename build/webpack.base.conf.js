var webpack = require('webpack')
var path = require('path')
var publicPrefix = '../src/public/'
var autoprefixer = require('autoprefixer')
var precss = require('precss')
var HtmlWebpackPlugin = require('html-webpack-plugin')
// var ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = {
  entry: {
    'app': './src/app.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '', // 用异步加载模块一定要加这个
    filename: '[name].js',
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
      }
    ]
  },
  postcss: function () {
    return [autoprefixer, precss]
  },
  // 让 vue-loader 支持 postcss。 http://vue-loader.vuejs.org/en/features/postcss.html
  vue: {
    postcss: [autoprefixer(), precss()],
    loaders: {
      // not work http://vue-loader.vuejs.org/en/configurations/extract-css.html
      // css: ExtractTextPlugin.extract("css")
      // sass: ExtractTextPlugin.extract("sass!less")
    }
  },
  plugins: [
      new HtmlWebpackPlugin({
        title: '娱乐空间',
        filename: 'index.html',
        template: '!!ejs!index.html'
      }),
      // new ExtractTextPlugin("style.css")
  ],
  resolve: {
    alias: {
      'component': path.resolve(__dirname, '../src/component'),
      'views': path.resolve(__dirname, '../src/views'),
      'setting': path.resolve(__dirname, '../setting.js'),
      'menu': path.resolve(__dirname, `../src/router/menu.js`),
      'language-helper': path.resolve(__dirname, `${publicPrefix}helper/language.js`)
    }
  },
}
