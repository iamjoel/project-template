import Vue from 'vue'
import Router from 'vue-router'
import menu from 'menu'
Vue.use(Router) // 路由

var router = new Router({
  routes: [
    ...generateRoutes(menu),
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



export default router
