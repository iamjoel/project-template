var resources = ['category']
module.exports = app => {
  const { router, controller } = app

  // 通用的CRUD
  const commonController = controller.common.index
  resources.forEach(resourceName => {
    router.get(`/api/${resourceName}/detail/:id`, commonController.detail)
    router.get(`/api/${resourceName}/list`, commonController.list)
    router.post(`/api/${resourceName}/add`, commonController.add)
    router.post(`/api/${resourceName}/edit`, commonController.edit)
    router.post(`/api/${resourceName}/del/:id`, commonController.del)
  })
}