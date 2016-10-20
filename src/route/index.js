var Vue = require('vue')
var Router = require('vue-router')
Vue.use(Router) // 路由

var router = new Router({
  routes: [
    ...generateRoutes(require('./routes'))
  ]
})

// router.redirect({ '*': require('setting').defaultRoute })// 默认路由

// router.beforeEach(function(transition) {
//   // transition.to.path// 当前路由
//   // show loading
//   console.info('show loading')
//   transition.next()
// }).afterEach(function(transition) {
//   console.info('hide loading')
// })


function generateRoutes (menu = [], routes = []) {
  for (let i = 0, l = menu.length; i < l; i++) {
    let item = menu[i]
    if (item.path) {
      routes.push(item)
    }
    if (!item.component) {
      generateRoutes(item.children, routes)
    }
  }
  return routes
}



module.exports = router
