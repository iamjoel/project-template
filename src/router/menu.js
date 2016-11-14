const lazyLoading = (resolve, name, index = false) => {
  require.ensure([], function(require) {
    resolve(require(`views/${name}${index ? '/index' : ''}.vue`));
  })
}

// 路由配置
var routes = [{
  name: 'dashbord',
  path: '/dashboard',
  component: resolve => {
    lazyLoading(resolve, 'dashboard')
  },
  meta: {
    showName: '仪表盘'
  }
}, {
  name: 'music',
  path: '/music',
  redirect: { name: 'song' },
  component: {
    template: '<router-view></router-view>'
  },
  meta: {
    showName: '音乐',
    expanded: true
  },
  children: [{
    name: 'song',
    path: 'song',
    meta: {
      showName: '歌曲',
    },
    component: resolve => {
      lazyLoading(resolve, 'music/song/list')
    }
  }, {
    name: 'song-edit',
    path: 'song-edit/:id',
    meta: {
      showName: '歌曲编辑',
      inMenu: false
    },
    component: resolve => {
      lazyLoading(resolve, 'music/song/edit')
    }
  }]
}, {
  name: 'component',
  path: '/component',
  component: resolve => {
    lazyLoading(resolve, 'component', true)
  },
  meta: {
    showName: '组件',
    expanded: false
  },
  children: [{
    name: 'button',
    path: 'button',
    meta: {
      showName: '按钮',
    },
    component: resolve => {
      lazyLoading(resolve, 'component/button')
    },
  },{
    name: 'icon',
    path: 'icon',
    meta: {
      showName: '图标',
    },
    component: resolve => {
      lazyLoading(resolve, 'component/icon')
    },
  },{
    name: 'select',
    path: 'select',
    meta: {
      showName: '下拉框',
    },
    component: resolve => {
      lazyLoading(resolve, 'component/select')
    },
  },{
    name: 'datepicker',
    path: 'datepicker',
    meta: {
      showName: '日期选择',
    },
    component: resolve => {
      lazyLoading(resolve, 'component/datepicker')
    },
  },{
    name: 'tree',
    path: 'tree',
    meta: {
      showName: '树形控件',
    },
    component: resolve => {
      lazyLoading(resolve, 'component/tree')
    },
  },{
    name: 'effect',
    path: 'effect',
    meta: {
      showName: '动画效果',
    },
    component: resolve => {
      lazyLoading(resolve, 'component/effect')
    },
  },{
    name: 'toast',
    path: 'toast',
    meta: {
      showName: '提示信息',
    },
    component: resolve => {
      lazyLoading(resolve, 'component/toast')
    },
  },{
    name: 'popup',
    path: 'popup',
    meta: {
      showName: '弹出框',
    },
    component: resolve => {
      lazyLoading(resolve, 'component/popup')
    },
  },{
    name: 'grid',
    path: 'grid',
    meta: {
      showName: '网格系统',
    },
    component: resolve => {
      lazyLoading(resolve, 'component/grid')
    },
  },{
    name: 'layout',
    path: 'layout',
    meta: {
      showName: 'CSS 布局',
    },
    component: resolve => {
      lazyLoading(resolve, 'component/layout')
    },
  },]
}];

module.exports = routes;
