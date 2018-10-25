var singleTable = ['category']
module.exports = app => {
  const { router, controller } = app
  const jwt = app.middleware.jwt()

  // 单表的CRUD
  singleTable.forEach(tableName => {
    addCRUD(tableName, router, controller.common.index, jwt)
  })
  
  // 多表的CRUD
  router.get(`/api/item/list`, jwt, controller.item.item.list)
  router.get(`/api/item/detail/:id`,jwt, controller.item.item.detail)
  router.post(`/api/item/add`, jwt, controller.common.index.add)
  router.post(`/api/item/edit`, jwt, controller.common.index.edit)

  
  router.post(`/api/picture/upload`, controller.common.upload.uploadImg) // 图片上传
  router.post(`/api/login`, controller.common.login.login);
  
}

function addCRUD(tableName, router, commonController, jwt) {
  router.get(`/api/${tableName}/detail/:id`, jwt, commonController.detail)
  router.get(`/api/${tableName}/list`, jwt, commonController.list)
  router.post(`/api/${tableName}/add`, jwt, commonController.add)
  router.post(`/api/${tableName}/edit`, jwt, commonController.edit)
  router.post(`/api/${tableName}/del/:id`, jwt, commonController.del)
}
