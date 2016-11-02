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
    name: 'modal',
    path: 'modal',
    meta: {
      showName: '模态框',
    },
    component: resolve => {
      lazyLoading(resolve, 'component/modal')
    },
  },{
    name: 'ui',
    path: 'ui',
    meta: {
      showName: 'UI 组件',
    },
    component: resolve => {
      lazyLoading(resolve, 'component/ui')
    },
  }, {
    name: 'scss-test',
    path: 'scss',
    component: resolve => {
      lazyLoading(resolve, 'component/scss')
    },
    meta: {
      showName: 'SCSS 测试',
    },
  }]
}];

module.exports = routes;
