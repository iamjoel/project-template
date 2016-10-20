var Vue = require('vue');
var Vuex = require('vuex');

Vue.use(Vuex);

var state = {
  pageRoute: ''
};

var mutations = {
  updatePageRoute: function(state, pageRoute) {
    state.pageRoute = pageRoute;
  }
};

module.exports = new Vuex.Store({
  state: state,
  mutations: mutations
});
