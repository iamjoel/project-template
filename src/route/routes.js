const lazyLoading = (resolve, controllerPath) => {
  require.ensure([], function(require) {
    resolve(require(`views/${controllerPath}.js`));
  })
}

// 路由配置
var routes = [{
    'name': 'demo',
    'path': '/demo/index',
    'component': resolve => {
      lazyLoading(resolve, 'demo/index')
    }
  },
  // {
  //   'path': '/music/songs',
  //   'controllerPath': 'music/song/list'
  // },
  // {
  //   'path': '/music/people',
  //   'controllerPath': 'music/song/list'
  // },
  // {
  //   'path': '/film/film',
  //   'controllerPath': 'film/index'
  // },
  // {
  //   'path': '/film/people',
  //   'controllerPath': 'film/index'
  // }
];

module.exports = routes;
