var Vue = require('vue')

var languageHelper = require('language-helper')
var defaultLan = require('setting').language.default

module.exports = Vue.extend({
  template: `<style>${require('./style.css')}</style>${require('./index.html')}`,
  data () {
    return {
      modules: require('setting').modules,
      currLanguage: defaultLan
    }
  },
  computed: {
    lanText () {
      return this.currLanguage === 'Ch' ? '中文' : 'English'
    }
  },
  methods: {
    getPath (module) {
      var defalutSubModule = module.sub.filter(subModule =>{
        return module.default === subModule.id
      })[0]

      return '/' + module.modulePrefix + defalutSubModule.path
    },
    lan (key) {
      var currLanguage = this.currLanguage
      return currLanguage === defaultLan ?
        key : (languageHelper.get(currLanguage)[key] || key)
    },
    changeLan () {
      if(this.currLanguage === 'Ch'){
        this.currLanguage = 'En'
      } else {
        this.currLanguage = 'Ch'
      }
    }
  },
  components: {
    'sub-menu': require('../sub-menu/index.js')
  },
  store: require('store'),
  vuex: {
    getters: {
      pageRoute(state){
        return state.pageRoute
      }
    }
  }
})
