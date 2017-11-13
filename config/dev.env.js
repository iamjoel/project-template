var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: process.env.NODE_ENV ? `"${process.env.NODE_ENV}"` : '"development"'
})
