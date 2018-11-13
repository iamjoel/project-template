/*
* 生成 CRUD 操作。
*/
const fs = require('fs-extra')
const argv = require('yargs').argv
const line2upper = require('../app/util/line-to-upper')


if (argv.name) {
  let modelName = argv.name
  console.log(modelName)

  const {modelPath, modelPrefix, modelSuffix} = getModelPathInfo(modelName)

  generatorEmptyModel({modelPath, modelName, modelPrefix, modelSuffix})
  generatorService({modelName, modelPrefix, modelSuffix})
  generatorController({modelName, modelPrefix, modelSuffix})
  generatorRouter({modelName, modelPrefix, modelSuffix})
} else {
  console.log('请传入参数 name。')
}




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

  let dist = line2upper(`app/service/${modelPrefix.join('/')}/${modelSuffix.join('/')}.js`)
  var template = require('./template/service.js')

  fs.outputFileSync(dist, template)
  console.log(`输出 Service 至: ${dist}  成功!`)

}

// 会写文件
function generatorController(info) {
  const {modelName, modelPrefix, modelSuffix} = info
  var modelPrefixPath = modelPrefix.join('/')
  var servicePath = line2upper(`${modelPrefix.join('.')}.${modelSuffix.join('.')}`)

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
  // var modelPrefixPath = modelPrefix.join('/')
  var modelSuffixPath = modelSuffix.join('/')
  var controllerPrefixPath = line2upper(`${modelPrefix.join('.')}.${modelSuffix.join('.')}`)
  
  console.log('路由如下:')
  console.log(`
router.get('/api/${modelSuffixPath}/list', jwt, controller.${controllerPrefixPath}.list)
router.get(\`/\${publicPrefix}/${modelSuffixPath}/list\`, controller.${controllerPrefixPath}.list)

router.get('/api/${modelSuffixPath}/detail/:id', jwt, controller.${controllerPrefixPath}.detail)
router.get(\`/\${publicPrefix}/${modelSuffixPath}/detail/:id\`, controller.${controllerPrefixPath}.detail)

router.post('/api/${modelSuffixPath}/add', jwt, controller.${controllerPrefixPath}.add)
router.post(\`/\${publicPrefix}/${modelSuffixPath}/add\`, controller.${controllerPrefixPath}.add)

router.post('/api/${modelSuffixPath}/edit', jwt, controller.${controllerPrefixPath}.edit)
router.post(\`/${publicPrefix}/${modelSuffixPath}/edit\`, controller.${controllerPrefixPath}.edit)

router.post('/api/${modelSuffixPath}/del/:id', jwt, controller.${controllerPrefixPath}.del)
router.post(\`/${publicPrefix}/${modelSuffixPath}/del/:id\`, controller.${controllerPrefixPath}.del)
`)
  
}


function getModelPathInfo (modelName) {
  const modelMap = require('../config/model-map.js')
  let modelPath = modelMap[modelName]
  if(!modelPath) {
    throw `请在 config/model-map.js 中配置: ${modelName}`
    return
  }
  modelPath = modelPath.split('/')
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

