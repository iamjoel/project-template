var settings = {
  defaultRoute: '/music/songs',
  language: {
    default: 'Ch', // 默认语言
    others: ['En']// 其他语言
  },
  modules: [{
    name: '音乐',
    modulePrefix: 'music',// 模块的路由前缀
    default: 1,// 模块的默认首页
    sub: [{
      id: 1,
      name: '歌曲',
      path: '/songs'
    },{
      id: 2,
      name: '歌手',
      path: '/people'
    }]
  }, {
    name: '电影',
    modulePrefix: 'film',
    default: 1,
    sub: [{
      id: 1,
      name: '电影',
      path: '/film'
    },{
      id: 2,
      name: '演员',
      path: '/people'
    }]
  }]
};

module.exports = settings;
