import Vue from 'vue'
import { Toast } from 'vant'

Vue.config.errorHandler = function (error, vm, info) {
  var componentName = formatComponentName(vm)
  var propsData = vm.$options && vm.$options.propsData

  Toast.fail(error)
  console.error(`${componentName}: ${error}`)
  console.error(`更多错误信息: ${info}`)
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

// 测试有没成功。
// fundebug.notify("Test", "Hello Fundebug!")
