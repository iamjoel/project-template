import {menuConfig} from '@/setting'

// 路由配置
var routes = [
  {
    path: '/',
    component: resolve => {
      lazyLoading(resolve, 'Dashboard', false)
    },
  },
  // 通用一级列表页
  {
    path: '/common/:configName/list',
    component: resolve => {
      lazyLoading(resolve, 'common/List', false)
    },
  },
  // 通用二级级列表页
  {
    path: '/common/:parent/:configName/list',
    component: resolve => {
      lazyLoading(resolve, 'common/List', false)
    },
  },
]

// 页面的路由的定义
menuConfig.forEach(menu => {
  var parentId = menu.id
  if(menu.children) { // 二级菜单
    menu.children.forEach(pageGroup => {
      pageGroup.pages.forEach(page => {
        addRoute(page.filePath, page.routePath)
      })
    })
  } else { // 一级路由
    menu.pages.forEach(page => {
      addRoute(page.filePath, page.routePath)
    })
  }
})

function addRoute(filePath, routePath) {
  routes.push({
    path: routePath,
    component: resolve => {
      lazyLoading(resolve, filePath)
    }
  })
}


const lazyLoading = (resolve, name, index = false) => {
  require.ensure([], function(require) {
    resolve(require(`@/views/${name}${index ? '/Index' : ''}.vue`));
  })
}

export default routes
