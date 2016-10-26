var Vue = require('vue')
var Router = require('vue-router')
Vue.use(Router) // 路由

var router = new Router({
  routes: [
    ...generateRoutes(require('./menu')),
    {
      path: '*',
      redirect: '/dashboard'
    }
  ]
})

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
