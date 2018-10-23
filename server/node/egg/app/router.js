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
}

function addCRUD(tableName, router, commonController) {
  router.get(`/api/${tableName}/detail/:id`, commonController.detail)
  router.get(`/api/${tableName}/list`, commonController.list)
  router.post(`/api/${tableName}/add`, commonController.add)
  router.post(`/api/${tableName}/edit`, commonController.edit)
  router.post(`/api/${tableName}/del/:id`, commonController.del)
}


var Parameter = require('parameter');

var parameter = new Parameter({
  // translate: function() {
  //   var args = Array.prototype.slice.call(arguments)
  //   console.log(args)
  //   return args
  // },
  validateRoot: true, // restrict the being validate value must be a object
});

var data = {
  name: 'a',
  age: 24,
  gender: 'male'
};

var rule = {
  name: {
    type: 'string',
    max: 5
  },
  age: 'int',
  gender: ['male', 'female', 'unknown']
};

var error = parameter.validate(rule, data)
if(error && error[0]) {
  // smaller than. empty.
  error = `${error.field} ${error.message}。 ${error.code} ... ${JSON.stringify(error)}`
}
console.log('aaaa')
console.log(`error: ${JSON.stringify(error)}`)