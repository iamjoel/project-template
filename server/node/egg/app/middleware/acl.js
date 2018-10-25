// 接口权限
var acl = require('acl')
acl = new acl(new acl.memoryBackend())

var roleGuest = {
  roles: ['2'],
  allows: [
  {
    resources: 'item', permissions: ['list', 'detail']
  }]
}

var roleAdmin = {
  roles: ['1'],
  allows: [
  {
    resources: 'item', permissions: ['add', 'edit', 'del']
  }]
}


acl.allow([roleGuest])
acl.allow('1', ['item'], ['add', 'edit', 'del'])



async function test(argument) {
  console.log('---- acl ------')
  // console.log(await acl.allowedPermissions('1', 'item'))
  console.log(await acl.areAnyRolesAllowed('1', 'item', 'add'))
  // console.log(acl.isAllowed('1', 'item', 'edit'))
  // console.log(acl.isAllowed('1', 'item', 'del'))

  console.log(await acl.allowedPermissions('2', 'item'))

  acl.allow('guest', 'blogs', 'view')
  console.log(await acl.areAnyRolesAllowed('guest', 'blogs', 'view'))
  console.log(await acl.allowedPermissions('guest', 'view'))
  console.log(await acl.whatResources('guest'))

  console.log('---- acl ------')

}
test()

