module.exports = {
  viewFields: ['name'],
  validFields: [{
    key: 'name',
    // https://github.com/node-modules/parameter
    rule: {
      type: 'string'
    },
    validType: 'all', // add, edit, all. default: all
  }]
}