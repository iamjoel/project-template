var singleTable = ['category']
module.exports = app => {
  const { router, controller } = app
  
  // 单表的CRUD
  singleTable.forEach(tableName => {
    addCRUD(tableName, router, controller.common.index)
  })
  
  // 多表的CRUD
  router.get(`/api/item/list`, controller.item.item.list)
  router.get(`/api/item/detail/:id`, controller.item.item.detail)
  router.post(`/api/item/add`, controller.common.index.add)
  router.post(`/api/item/edit`, controller.common.index.edit)

  
  router.post(`/api/picture/upload`, controller.common.upload.uploadImg) // 图片上传

}

function addCRUD(tableName, router, commonController) {
  router.get(`/api/${tableName}/detail/:id`, commonController.detail)
  router.get(`/api/${tableName}/list`, commonController.list)
  router.post(`/api/${tableName}/add`, commonController.add)
  router.post(`/api/${tableName}/edit`, commonController.edit)
  router.post(`/api/${tableName}/del/:id`, commonController.del)
}