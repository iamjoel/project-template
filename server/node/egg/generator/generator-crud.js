/*
* 生成 CRUD 操作。
*/
const fs = require('fs-extra')

const modelName = 't2'
const {modelPath, modelPrefix, modelSuffix} = getModelPathInfo(modelName)

generatorEmptyModel({modelPath, modelName, modelPrefix, modelSuffix})
generatorService({modelName, modelPrefix, modelSuffix})
generatorController({modelName, modelPrefix, modelSuffix})
generatorRouter({modelName, modelPrefix, modelSuffix})


function generatorEmptyModel(info) {
  const {modelName, modelPath} = info
  let dist = `app/service/${modelPath.join('/')}.js` // 从项目根路径开始算的

  const template = `
module.exports = {
  viewFields: [ 'name', ],
  validFields: [{
    key: 'name',
    name: '名称',
    rule: {
      type: 'string',
    },
    validType: 'all'
  }]
}`
  fs.outputFileSync(dist, template)
  console.log(`输出 Model 至: ${dist} 成功!`)
}

// 会写文件
function generatorService(info) {
  const {modelName, modelPrefix, modelSuffix} = info

  let dist = `app/service/${modelPrefix.join('/')}/${modelSuffix.join('/')}.js`
  var template = require('./template/service.js')

  fs.outputFileSync(dist, template)
  console.log(`输出 Service 至: ${dist}  成功!`)

}

// 会写文件
function generatorController(info) {
  const {modelName, modelPrefix, modelSuffix} = info
  var modelPrefixPath = modelPrefix.join('/')
  var servicePath = `${modelPrefix.join('.')}.${modelSuffix.join('.')}`

  let dist = `app/controller/${modelPrefix.join('/')}/${modelSuffix.join('/')}.js`
  var template = require('./template/controller.js')
  template = template.replace(/{servicePath}/g, servicePath)

  fs.outputFileSync(dist, template)
  console.log(`输出 Controller 至: ${dist}  成功!`)
}

// 输出到控制台
function generatorRouter(info) {
  const publicPrefix = 'publicApi'

  const {modelPrefix, modelSuffix} = info
  var modelPrefixPath = modelPrefix.join('/')
  var controllerPrefixPath = `${modelPrefix.join('.')}.${modelSuffix.join('.')}`
  
  console.log('路由如下:')
  console.log(`
router.get('/api/${modelPrefixPath}/list', jwt, controller.${controllerPrefixPath}.list)
router.get(\`/\${publicPrefix}/${modelPrefixPath}/list\`, jwt, controller.${controllerPrefixPath}.list)

router.get('/api/${modelPrefixPath}/detail/:id', jwt, controller.${controllerPrefixPath}.detail)
router.get(\`/\${publicPrefix}/${modelPrefixPath}/detail/:id\`, jwt, controller.${controllerPrefixPath}.detail)

router.post('/api/${modelPrefixPath}/add', jwt, controller.${controllerPrefixPath}.add)
router.post(\`/\${publicPrefix}/${modelPrefixPath}/add\`, jwt, controller.${controllerPrefixPath}.add)

router.post('/api/${modelPrefixPath}/edit', jwt, controller.${controllerPrefixPath}.edit)
router.post(\`/${publicPrefix}/${modelPrefixPath}/edit\`, jwt, controller.${controllerPrefixPath}.edit)
`)
  
}


function getModelPathInfo (modelName) {
  const modelMap = require('../config/model-map.js')
  let modelPath = modelMap[modelName].split('/')
  var modelPrefix = []
  var modelSuffix = []
  var isFindModel = false
  modelPath.forEach(item => {
    if(isFindModel) {
      modelSuffix.push(item)
    } else {
      if(item === 'model') {
        isFindModel = true
      } else {
        modelPrefix.push(item)
      }
    }
  })
  
  return {modelPath, modelPrefix, modelSuffix}
}

