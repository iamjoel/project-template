var RouteComponent = require('route-component');

require('modal');
require('alert');
require('confirm');

var Main = RouteComponent.extend({
  template: require('./index.html'),
  data: function () {
    return {
      showModal:false,
      showAlert: false,
      showConfirm: false,
      confirmResult: false
    };
  },
  watch: {
    confirmResult: function (val, oldVal) {
      if(val === true){
        console.log('confirmed');
      }
    }
  },
  ready: function () {
  }
});
module.exports = Main;
