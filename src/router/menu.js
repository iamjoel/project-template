const MENU_PREFIXS = {
  system: 'system', // 系统管理
  music: 'music', // 音乐
}

// 路由配置
var routes = [
  {
    path: '/',
    component: resolve => {
      lazyLoading(resolve, 'dashboard', false)
    },
  },
  ...addPageGroup('song', 'music'), //音乐
  
]

// 
function addPageGroup (name, parent, types=['list', 'update', 'view']){
  if(!Array.isArray(types)) {
    throw 'type should be array'
  }
  return types.map(type => {
    var path = `/${MENU_PREFIXS[parent]}/${name}/${type === 'list' ? 'list' : (type+'/:id')}`
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
        lazyLoading(resolve, `${MENU_PREFIXS[parent]}/${name}/${fileName}`)
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
