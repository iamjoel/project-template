var Vue = require('vue');
var Modal = require('component/modal');
module.exports = Vue.component('confirm', {
  template: '<style>' + require('./style.css') + '</style>' + require('./index.html'),
  props: {
    show: {
      type: Boolean,
      required: true,
      twoWay: true
    },
    confirmed: {
      type: Boolean,
      default: false
    },
     width: {
      default: '4.5rem'
    }
  },
  methods: {
    confirm: function () {
      this.show = false;
      this.confirmed = false;
      setTimeout(function () {
        this.confirmed = true;
      }.bind(this), 0);
    },
    cancel: function () {
      this.show = false;
      this.confirmed = false;
    }
  }
});


