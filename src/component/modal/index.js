var Vue = require('vue');
var Modal = Vue.component('modal', {
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

module.exports = Modal;

