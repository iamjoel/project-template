import Index from './components/Index.vue'

export function install (Vue) {
  Vue.component('{{ name }}', Index)
}

export {
  Index,
}

const plugin = {
  version: VERSION,
  install,
}

export default plugin

let GlobalVue = null
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue
}
if (GlobalVue) {
  GlobalVue.use(plugin)
}
