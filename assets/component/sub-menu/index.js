var Vue = require('vue');
var modules = require('setting').modules;

var SubMenu = Vue.extend({
  template: '<style>' + require('./style.css') + '</style>' + require('./index.html'),
  props: ['pageRoute'],
  computed: {
    subModules: function() {
      var pageRoute = this.pageRoute;
      if (!pageRoute) {
        return;
      }
      // pageRoute 类似: module/subModule/params
      var moudleInfo = /\/?(\w+)\/(\w+)/.exec(pageRoute);
      var modulePrefix = moudleInfo[1];
      var subModuleRoute = moudleInfo[2];
      var subModule = modules.filter(function(item) {
        return item.modulePrefix === modulePrefix;
      })[0].sub;
      return subModule.map(function(item) {
        item.fullPath = '/' + modulePrefix + item.path;
        return item;
      });
    }
  }
});



module.exports = SubMenu;
