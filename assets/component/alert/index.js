var Vue = require('vue');
var Modal = require('modal')
module.exports = Vue.component('alert', {
  template: require('./index.html'),
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


