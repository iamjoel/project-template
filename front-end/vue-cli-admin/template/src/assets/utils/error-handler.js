import Vue from 'vue'
import { Message } from 'element-ui'

Vue.config.errorHandler = function (error, vm, info) {
  var componentName = formatComponentName(vm)
  var propsData = vm.$options && vm.$options.propsData

  Message({
    type: 'error',
    message: error
  })
  console.error(`${componentName}: ${error}`)
  console.error(`更多错误信息: ${info}`)
  // 也可以用 fundebug，或自己定义的后端接口来记录错误。
}

function formatComponentName (vm) {
  if (vm.$root === vm) return 'root'
  var name = vm._isVue
    ? (vm.$options && vm.$options.name) ||
      (vm.$options && vm.$options._componentTag)
    : vm.name
  return (
    (name ? 'component <' + name + '>' : 'anonymous component') +
    (vm._isVue && vm.$options && vm.$options.__file
      ? ' at ' + (vm.$options && vm.$options.__file)
      : '')
  )
}

window.onerror = function (error, url, line) {
  console.error(`文件: ${url}第${line}行: ${error}`)
}
