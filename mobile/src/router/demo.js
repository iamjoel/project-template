export default [
  {
    path: '/demo/media',
    meta: {
      title: 'Media',
      activeTypeIndex: 0,
    },
    component: resolve => {
      lazyLoading(resolve, 'demo/Media', false)
    },
  },
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
    path: '/demo/list/infinate-load',
    meta: {
      title: '列表无限加载',
      activeTypeIndex: 0,
    },
    component: resolve => {
      lazyLoading(resolve, 'demo/list/Infinate-load', false)
    },
  },
  {
    path: '/demo/list/no-data',
    meta: {
      title: '列表无数据',
      activeTypeIndex: 0,
    },
    component: resolve => {
      lazyLoading(resolve, 'demo/list/No-data', false)
    },
  },
  {
    path: '/demo/list/filter',
    meta: {
      title: '列表搜索条件',
      activeTypeIndex: 0,
    },
    component: resolve => {
      lazyLoading(resolve, 'demo/list/filter')
    },
  },
  {
    path: '/demo/list/pull-refresh',
    meta: {
      title: '下拉刷新',
      activeTypeIndex: 0,
    },
    component: resolve => {
      lazyLoading(resolve, 'demo/list/PullRefresh', false)
    },
  },
  {
    path: '/demo/list/hor-scroll',
    meta: {
      title: '横向滚动',
      activeTypeIndex: 0,
    },
    component: resolve => {
      lazyLoading(resolve, 'demo/list/Hor-scroll', false)
    },
  },
  {
    path: '/demo/tree-select',
    meta: {
      title: '分类选择',
      activeTypeIndex: 0,
    },
    component: resolve => {
      lazyLoading(resolve, 'demo/TreeSelect', false)
    },
  },
  {
    path: '/demo/img/lazyload',
    meta: {
      title: '懒加载',
      activeTypeIndex: 0,
    },
    component: resolve => {
      lazyLoading(resolve, 'demo/img/Lazyload', false)
    },
  },
  {
    path: '/demo/img/img-preview',
    meta: {
      title: '图片预览',
      activeTypeIndex: 0,
    },
    component: resolve => {
      lazyLoading(resolve, 'demo/img/ImgPreview', false)
    },
  },
  {
    path: '/demo/img/img-badge',
    meta: {
      title: '角标',
      activeTypeIndex: 0,
    },
    component: resolve => {
      lazyLoading(resolve, 'demo/img/ImgBadge', false)
    },
  },
  
]

const lazyLoading = (resolve, name, index = true) => {
  require.ensure([], function(require) {
    resolve(require(`@/views/${name}${index ? '/Index' : ''}.vue`));
  })
}