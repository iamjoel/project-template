/*
* 权限控制
* admin 有所有权限，就不在这里设置权限了
*/

// 访客
const guest = {
  roles: [ '2' ], // 以后用字典
  allows: [
    {
      resources: 'item', permissions: [ 'list', 'detail' ],
    },
    {
      resources: 'category', permissions: [ 'list', 'detail' ],
    }],
};
module.exports = [ guest ];
