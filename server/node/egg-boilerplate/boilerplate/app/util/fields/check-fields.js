var Parameter = require('parameter');
var parameter = new Parameter({
  validateRoot: true
})

function checkFields(app, resourceName, data, type = 'add') {
  var model = require(`@/service/${app.modelMap[resourceName]}`)
  var shouldVaildFields = model.validFields.filter(field => {
    let validType = field.validType
    return !validType || validType === 'all' || validType === type 
  })

  if(type === 'edit') { // 编辑时，只验证提交的字段
    shouldVaildFields = shouldVaildFields.filter(item => {
      return data[item.key] !== undefined
    })
  }
  
  // https://github.com/node-modules/parameter/blob/master/example.js
  var validRules = transformToParameterRules(shouldVaildFields)

  var res = parameter.validate(validRules, data)
  if(res === undefined) {
    return true
  } else {
    var error = res[0]
    var fieldName = shouldVaildFields.filter(item => item.key === error.field)[0]
    if(fieldName) {
      fieldName = fieldName.name
    }
    return toReadableMsg(error, fieldName)
  }
}

function transformToParameterRules(arr) {
  var res = {}
  arr.forEach(item => {
    res[item.key] = item.rule
  })
  return res
}

// 转化成显示给用户看的验证信息
function toReadableMsg(error, fieldName) {
  fieldName = fieldName || error.field
  if(error.message === 'required') {
    return `${fieldName}必填`
  } if(error.message.includes('length should smaller than')) {
    return `${fieldName}长度太长`
  } if(error.message.includes('length should bigger than')) {
    return `${fieldName}长度太短`
  } else {
    return `未知验证错误: ${JSON.stringify(error)}`
  }
}

module.exports = checkFields
