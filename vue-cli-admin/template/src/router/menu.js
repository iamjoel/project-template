import routerConfig from '@/setting/base/router'

// 路由配置
var routes = [
  {
    path: '/',
    component: resolve => {
      lazyLoading(resolve, 'Dashboard', false)
    },
  },
  {
    path: '/account',
    component: resolve => {
      lazyLoading(resolve, 'account/List', false)
    },
  },
  ...routerConfig.map(item => {
    return {
      path: item.routePath,
      component: resolve => {
        lazyLoading(resolve, item.filePath.replace(/\.vue$/, ''), false)
      }
    }
  }),
]

// import {menuConfig} from '@/setting'
// // 页面的路由的定义
// menuConfig.forEach(menu => {
//   var parentId = menu.id
//   if(menu.children) { // 二级菜单
//     menu.children.forEach(pageGroup => {
//       pageGroup.pages.forEach(page => {
//         addRoute(page.filePath, page.routePath)
//       })
//     })
//   } else { // 一级路由
//     menu.pages.forEach(page => {
//       addRoute(page.filePath, page.routePath)
//     })
//   }
// })

// function addRoute(filePath, routePath) {
//   routes.push({
//     path: routePath,
//     component: resolve => {
//       lazyLoading(resolve, filePath)
//     }
//   })
// }

const lazyLoading = (resolve, name, index = false) => {
  require.ensure([], function(require) {
    resolve(require(`@/views/${name}${index ? '/Index' : ''}.vue`));
  })
}

export default routes
