import routerConfig from '@/setting/base/router'

// 路由配置
var routes = [
  {
    path: '/',
    component: resolve => {
      lazyLoading(resolve, 'Dashboard', false)
    }
  },
  ...routerConfig.map(item => {
    return {
      path: item.routePath,
      component: resolve => {
        lazyLoading(
          resolve,
          item.filePath.replace(/\.vue$/, ''),
          false,
          !item.isEjected
        )
      }
    }
  })
]

const lazyLoading = (resolve, name, index = false, notEjected) => {
  require.ensure([], function (require) {
    resolve(
      require(`@/${notEjected ? 'auto/' : ''}views/${name}${
        index ? '/Index' : ''
      }.vue`)
    )
  })
}

export default routes
