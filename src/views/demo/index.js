var RouteComponent = require('route-component');

require('component/modal');
require('component/alert');
require('component/confirm');

var Main = RouteComponent.extend({
  template: '<style>' + require('./style.css') + '</style>' + require('./index.html'),
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
