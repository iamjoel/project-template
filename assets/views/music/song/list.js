var RouteComponent = require('route-component');

var css = require('./list.css');

var Main = RouteComponent.extend({
  template: '<style>' + css + '</style>' + require('./list.html'),
  data: {
    list:[]
  },
  ready: function () {
    this.$http.get('/assets/component/music/song/list-data.json').then(function (data) {
      this.$set('list', data.data);
    });
  }
});
module.exports  = Main;
