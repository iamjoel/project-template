const commonTable = [];
const publicPrefix = 'publicApi';
const autoRouter = require('../auto/router')
const ejectedRouter = require('../auto/ejected-router')
module.exports = app => {
  const { router, controller } = app;
  const jwt = app.middleware.jwt();

  autoRouter(router, controller, jwt) // 生成工具生成
  ejectedRouter(router, controller, jwt) // 生成工具生成

  // 通用的CRUD
  commonTable.forEach(tableName => {
    addCRUD(tableName, router, controller.common.index, jwt, publicPrefix);
  });

  router.post('/api/picture/upload', controller.common.upload.uploadImg); // 图片上传
  router.post('/api/file/upload', controller.common.upload.uploadFile); // 文件上传
  router.post('/api/login', controller.common.login.login);

};

function addCRUD(tableName, router, commonController, jwt) {
  let publicApi = [ 'detail', 'list' ];
  if (typeof tableName === 'object') {
    if (Array.isArray(tableName.publicApi)) {
      publicApi = tableName.publicApi;
    }
    tableName = tableName.name;
  }
  router.get(`/api/${tableName}/detail/:id`, jwt, commonController.detail);
  if (publicApi.includes('detail')) {
    router.get(`/${publicPrefix}/${tableName}/detail/:id`, jwt, commonController.detail);
  }

  router.get(`/api/${tableName}/list`, jwt, commonController.list);
  if (publicApi.includes('list')) {
    router.get(`/${publicPrefix}/${tableName}/list`, jwt, commonController.list);
  }

  router.post(`/api/${tableName}/add`, jwt, commonController.add);
  if (publicApi.includes('add')) {
    router.post(`/${publicPrefix}/${tableName}/add`, jwt, commonController.add);
  }

  router.post(`/api/${tableName}/edit`, jwt, commonController.edit);
  if (publicApi.includes('edit')) {
    router.post(`/${publicPrefix}/${tableName}/edit`, jwt, commonController.edit);
  }

  router.post(`/api/${tableName}/del/:id`, jwt, commonController.del);
  if (publicApi.includes('del')) {
    router.post(`/${publicPrefix}/${tableName}/del/:id`, jwt, commonController.del);
  }
}
