import Vue from 'vue'
import fundebug from 'fundebug-javascript'
import {fundebugAPIKey} from '@/setting'

fundebug.apikey = fundebugAPIKey

Vue.config.errorHandler = function(err, vm, info) {
  var componentName = formatComponentName(vm);
  var propsData = vm.$options && vm.$options.propsData;

  fundebug.notifyError(err, {
    metaData: {
      componentName: componentName,
      propsData: propsData,
      info: info
    }
  });
}

function formatComponentName(vm) {
  if (vm.$root === vm) return 'root';
  var name = vm._isVue ? (vm.$options && vm.$options.name) || (vm.$options && vm.$options._componentTag) : vm.name;
  return (name ? 'component <' + name + '>' : 'anonymous component') + (vm._isVue && vm.$options && vm.$options.__file ? ' at ' + (vm.$options && vm.$options.__file) : '');

}

// 测试有没成功。
// fundebug.notify("Test", "Hello Fundebug!") 
