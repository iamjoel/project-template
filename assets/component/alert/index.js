var Vue = require('vue');
var Modal = require('component/modal')
module.exports = Vue.component('alert', {
  template: '<style>' + require('./style.css') + '</style>' + require('./index.html'),
  props: {
    show: {
      type: Boolean,
      required: true,
      twoWay: true
    },
    width: {
      default: '4.5rem'
    }
  }
});


