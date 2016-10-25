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
    'name': 'modal',
    'showName': '模态框',
    'path': 'component',
    'component': resolve => {
      lazyLoading(resolve, 'demo/component')
    },
  },{
    'name': 'scss-test',
    'showName': 'SCSS 测试',
    'path': 'scss',
    'component': resolve => {
      lazyLoading(resolve, 'demo/scss')
    },
  }]
}];

module.exports = routes;
