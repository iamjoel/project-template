var webpack = require('webpack')
var path = require('path')
const SRC = '../src'
var autoprefixer = require('autoprefixer')
var HtmlWebpackPlugin = require('html-webpack-plugin')

// Cannot use 'chunkhash' in webpack dev server. https://github.com/webpack/webpack/issues/2393
var hashType = process.env.NODE_ENV === 'production' ? 'chunkhash' : 'hash'

module.exports = {
  entry: {
    'app': './src/app.js',
    'login': './src/login.js',
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '', // 用异步加载模块一定要加这个
    filename: `[name].[${hashType}].js`, // 服务器可以开强缓存
    trunkFilename: '[name].bundle.js'
  },
  module: {
    loaders: [
      { test: /\.html$/, loader: "html-loader" }, {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'url?limit=10000'
      }, {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url?limit=10000'
      },
      { test: /\.css$/, 
        loader: "css-loader!postcss-loader" 
      }, 
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }, {
        test: /\.vue$/,
        loader: 'vue',
        options: {}
      }, {
        test: /\.json$/,
        loader: 'json-loader',
      }
    ]
  },
  postcss: function() {
    return [autoprefixer]
  },
  vue: {
    postcss: [autoprefixer()], // 让 vue-loader 支持 postcss。 http://vue-loader.vuejs.org/en/features/postcss.html
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: '管理后台',
      filename: 'index.html',
      template: '!!ejs!src/views/index.html',
      excludeChunks: ['login']
    }),
    new HtmlWebpackPlugin({
      filename: 'login.html',
      template: '!!ejs!src/views/login.html',
      excludeChunks: ['app']
    })
  ],
  resolve: {
    alias: {
      // 'vue$': 'vue/dist/vue.js', // standalone version。 想用 complie 方法
      'api': path.resolve(__dirname, `${SRC}/api`),
      'assets': path.resolve(__dirname, `${SRC}/assets`),
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
