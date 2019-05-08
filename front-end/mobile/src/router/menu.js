// 路由配置
var routes = [
  {
    path: '/',
    meta: {
      title: '首页',
      activeTypeIndex: 0
    },
    component: resolve => {
      lazyLoading(resolve, 'index')
    }
  },
  {
    path: '/member-center',
    meta: {
      title: '个人中心',
      activeTypeIndex: 3
    },
    component: resolve => {
      lazyLoading(resolve, 'member-center')
    }
  }
]

const lazyLoading = (resolve, name, index = true) => {
  require.ensure([], function (require) {
    resolve(require(`@/views/${name}${index ? '/Index' : ''}.vue`))
  })
}

export default routes
