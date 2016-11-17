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
    showName: {
      ch: '仪表盘',
      en: 'Dashboard'
    }
  }
}, {
  name: 'music',
  path: '/music',
  redirect: { name: 'song' },
  component: {
    template: '<router-view></router-view>'
  },
  meta: {
    showName: {
      ch: '音乐',
      en: 'Music'
    },
    expanded: true
  },
  children: [{
    name: 'song',
    path: 'song',
    meta: {
      showName: {
        ch: '歌曲',
        en: 'Song'
      },
    },
    component: resolve => {
      lazyLoading(resolve, 'music/song/list')
    }
  }, {
    name: 'song-edit',
    path: 'song-edit/:id',
    meta: {
      showName: {
        ch: '歌曲编辑',
        en: 'Edit Song'
      },
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
    showName: {
      ch: '组件',
      en: 'Component'
    },
    expanded: false
  },
  children: [{
    name: 'button',
    path: 'button',
    meta: {
      showName: {
        ch: '按钮',
        en: 'Button'
      }
    },
    component: resolve => {
      lazyLoading(resolve, 'component/button')
    },
  },{
    name: 'icon',
    path: 'icon',
    meta: {
      showName: {
        ch: '图标',
        en: 'Icon'
      }
    },
    component: resolve => {
      lazyLoading(resolve, 'component/icon')
    },
  },{
    name: 'select',
    path: 'select',
    meta: {
      showName: {
        ch: '下拉框',
        en: 'Select'
      }
    },
    component: resolve => {
      lazyLoading(resolve, 'component/select')
    },
  },{
    name: 'datepicker',
    path: 'datepicker',
    meta: {
      showName: {
        ch: '日期选择',
        en: 'Date Picker'
      }
    },
    component: resolve => {
      lazyLoading(resolve, 'component/datepicker')
    },
  },{
    name: 'tree',
    path: 'tree',
    meta: {
      showName: {
        ch: '树形控件',
        en: 'Tree'
      }
    },
    component: resolve => {
      lazyLoading(resolve, 'component/tree')
    },
  },{
    name: 'effect',
    path: 'effect',
    meta: {
      showName: {
        ch: '动画效果',
        en: 'Anim Effect'
      }
    },
    component: resolve => {
      lazyLoading(resolve, 'component/effect')
    },
  },{
    name: 'toast',
    path: 'toast',
    meta: {
      showName: {
        ch: '提示信息',
        en: 'Toast'
      }
    },
    component: resolve => {
      lazyLoading(resolve, 'component/toast')
    },
  },{
    name: 'popup',
    path: 'popup',
    meta: {
      showName: {
        ch: '弹出框',
        en: 'Popup'
      }
    },
    component: resolve => {
      lazyLoading(resolve, 'component/popup')
    },
  },{
    name: 'grid',
    path: 'grid',
    meta: {
      showName: {
        ch: '网格系统',
        en: 'Grid'
      }
    },
    component: resolve => {
      lazyLoading(resolve, 'component/grid')
    },
  },{
    name: 'layout',
    path: 'layout',
    meta: {
      showName: {
        ch: 'CSS 布局',
        en: 'CSS Layout'
      }
    },
    component: resolve => {
      lazyLoading(resolve, 'component/layout')
    },
  },]
}];

module.exports = routes;
