import {PAGES} from '@/setting'

// 路由配置
var routes = [
  {
    path: '/',
    component: resolve => {
      lazyLoading(resolve, 'dashboard', false)
    },
  },
]

// 常规页面的路由
PAGES.forEach(item => {
  var parentId = item.id
  item.children.forEach(child => {
    routes.push(...addPageGroup(child.id, parentId))
  })
})

function addPageGroup (name, parent, types=['list', 'update', 'view']){
  if(!Array.isArray(types)) {
    throw 'type should be array'
  }
  return types.map(type => {
    var path = `/${parent}/${name}/${type === 'list' ? 'list' : (type+'/:id')}`
    var fileName = type
    if(type === 'view') {
      fileName = 'update'
    }
    return {
      path,
      component: resolve => {
        lazyLoading(resolve, `${parent}/${name}/${fileName}`)
      }
    }
  })
}

const lazyLoading = (resolve, name, index = false) => {
  require.ensure([], function(require) {
    resolve(require(`@/views/${name}${index ? '/Index' : ''}.vue`));
  })
}

export default routes
