// 路由配置
var routes = [
  {
    path: '/',
    meta: {
      activeTypeIndex: 0,
    },
    component: resolve => {
      lazyLoading(resolve, 'index')
    },
  },
  {
    path: '/classify-list',
    meta: {
      title: '分类',
      activeTypeIndex: 1,
    },
    component: resolve => {
      lazyLoading(resolve, 'classify-list')
    },
  },
  {
    path: '/cart',
    meta: {
      title: '购物车',
      activeTypeIndex: 2,
      isShowFooter: false
    },
    component: resolve => {
      lazyLoading(resolve, 'cart')
    },
  },
  {
    path: '/member-center',
    meta: {
      title: '个人中心',
      activeTypeIndex: 3,
    },
    component: resolve => {
      lazyLoading(resolve, 'member-center')
    },
  },
  // demo
  {
    path: '/demo/form',
    meta: {
      title: '表单',
      activeTypeIndex: 0,
    },
    component: resolve => {
      lazyLoading(resolve, 'demo/Form', false)
    },
  },
  {
    path: '/demo/list',
    meta: {
      title: '列表',
      activeTypeIndex: 0,
    },
    component: resolve => {
      lazyLoading(resolve, 'demo/List', false)
    },
  },
]



const lazyLoading = (resolve, name, index = true) => {
  require.ensure([], function(require) {
    resolve(require(`@/views/${name}${index ? '/Index' : ''}.vue`));
  })
}

export default routes
