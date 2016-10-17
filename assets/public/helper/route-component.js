var Vue = require('vue');

var RouteComponent = Vue.extend({
  route: {
    data (transition) {
      // 页面切换时会执行
      this.updatePageRoute(transition.to.path);
    }
  },
  vuex: {
    actions: {
      updatePageRoute: function(store, route){
        store.dispatch('updatePageRoute', route);
        console.info('dispatch:updatePageRoute, route: ' + route);
      }
    }
  }
});
module.exports  = RouteComponent;