var Vue = require('vue');

var languageHelper = require('language-helper');
var defaultLan = require('setting').language.default;

module.exports = Vue.extend({
  template: require('./index.html'),
  data: function() {
    return {
      modules: require('setting').modules,
      currLanguage: defaultLan
    }
  },
  computed: {
    lanText: function () {
      return this.currLanguage === 'Ch' ? '中文' : 'English';
    }
  },
  methods: {
    getPath: function (module) {
      var defalutSubModule = module.sub.filter(function (subModule) {
        return module.default === subModule.id;
      })[0];

      return '/' + module.modulePrefix + defalutSubModule.path;
    },
    lan: function(key) {
      var currLanguage = this.currLanguage;
      return currLanguage === defaultLan ?
        key : (languageHelper.get(currLanguage)[key] || key);
    },
    changeLan: function () {
      if(this.currLanguage === 'Ch'){
        this.currLanguage = 'En';
      } else {
        this.currLanguage = 'Ch';
      }
    }
  },
  components: {
    'sub-menu': require('../sub-menu/index.js')
  },
  store: require('store'),
  vuex: {
    getters: {
      pageRoute: function(state){
        return state.pageRoute;
      }
    }
  }
});
