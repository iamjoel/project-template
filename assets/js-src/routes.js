// 路由配置
var routes = [
{
  'routePath': '/music/songs',
  'controllerPath': 'music/song/list'
},
{
  'routePath': '/music/people',
  'controllerPath': 'music/song/list'
},
{
  'routePath': '/film/film',
  'controllerPath': 'film/index'
},
{
  'routePath': '/film/people',
  'controllerPath': 'film/index'
}];


// 将配置转化成 vue-route 需要的个数
var routesMap = require('./helper/route-helper')(routes);

module.exports = routesMap;
