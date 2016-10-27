// 只支持 2 中语言。要支持多中语言，可以用 https://github.com/kazupon/vue-i18n
import lans from 'i18n/En.json'
export default function install(Vue) {
  var defaultLan = 'Ch'

  Vue.prototype.$currLan = {
    name: defaultLan
  }
  Vue.prototype.$changeLan = (lan) => {
    Vue.set(Vue.prototype.$currLan, 'name', lan)
  }
  Vue.prototype.$i18n = function (key) {
    if(Vue.prototype.$currLan.name === defaultLan) {
      return key
    } else {
      lans[key]
    }
  }
}