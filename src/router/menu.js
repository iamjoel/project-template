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
    // 编辑和查看共用一个页面
    if(type === 'view') {
      fileName = 'update'
    }
    // fileName = fileName.charAt(0).toUpperCase() + fileName.substr(1)
    // debugger
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






// 权限
// {
//   path: '/limit',
//   name: 'limit',
//   component: resolve => {
//     lazyLoading(resolve, 'demo/Limit')
//   },
// },
