const lazyLoading = (resolve, name, index = false) => {
  require.ensure([], function(require) {
    resolve(require(`views/${name}${index ? '/index' : ''}.vue`));
  })
}

// 路由配置
var routes = [{
  'name': 'dashbord',
  'showName': 'Dashboard',
  'path': '/',
  'component': resolve => {
    lazyLoading(resolve, 'dashboard')
  }
}, {
  'name': 'demo',
  'showName': '示例',
  'path': '/demo',
  'component': resolve => {
    lazyLoading(resolve, 'demo', true)
  },
  children: [{
    'showName': '组件示例',
    'path': 'component',
    'component': resolve => {
      lazyLoading(resolve, 'demo/component')
    },
  }]
}];

module.exports = routes;
