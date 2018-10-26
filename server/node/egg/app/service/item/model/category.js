module.exports = {
  viewFields: [ 'name', 'detail' ],
  validFields: [{
    key: 'name',
    name: '名称',
    // https://github.com/node-modules/parameter
    rule: {
      type: 'string',
      max: 5,
      min: 2,
    },
    validType: 'all', // add, edit, all. default: all
  }, {
    key: 'detail',
    name: '详情',
    // https://github.com/node-modules/parameter
    rule: {
      type: 'string',
      max: 100,
      min: 5,
    },
    validType: 'edit', // add, edit, all. default: all
  }],
};
