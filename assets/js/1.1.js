webpackJsonp([1],{

/***/ 6:
/*!***************************************!*\
  !*** ./assets/component ^\.\/.*\.js$ ***!
  \***************************************/
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./film/index.js": 7,
		"./layout/index.js": 10,
		"./music/song/list.js": 18,
		"./sub-menu/index.js": 14
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 6;


/***/ },

/***/ 7:
/*!****************************************!*\
  !*** ./assets/component/film/index.js ***!
  \****************************************/
/***/ function(module, exports, __webpack_require__) {

	var RouteComponent = __webpack_require__(/*! route-component */ 8);
	
	var Main = RouteComponent.extend({
	  template: __webpack_require__(/*! ./index.html */ 9),
	});
	module.exports  = Main;

/***/ },

/***/ 8:
/*!*************************************************!*\
  !*** ./assets/js-src/helper/route-component.js ***!
  \*************************************************/
/***/ function(module, exports, __webpack_require__) {

	var Vue = __webpack_require__(/*! vue */ 1);
	
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

/***/ },

/***/ 9:
/*!******************************************!*\
  !*** ./assets/component/film/index.html ***!
  \******************************************/
/***/ function(module, exports) {

	module.exports = "Film Page!";

/***/ },

/***/ 18:
/*!*********************************************!*\
  !*** ./assets/component/music/song/list.js ***!
  \*********************************************/
/***/ function(module, exports, __webpack_require__) {

	var RouteComponent = __webpack_require__(/*! route-component */ 8);
	
	var Main = RouteComponent.extend({
	  template: __webpack_require__(/*! ./list.html */ 19),
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


/***/ },

/***/ 19:
/*!***********************************************!*\
  !*** ./assets/component/music/song/list.html ***!
  \***********************************************/
/***/ function(module, exports) {

	module.exports = "<table class=\"table table-hover table-striped\">\n  <thead>\n    <tr>\n      <th>{{$root.lan('歌名')}}</th>\n      <th>{{$root.lan('歌手')}}</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr v-for=\"item in list\">\n      <td>{{item.name}}</td>\n      <td>{{item.singer}}</td>\n    </tr>\n  </tbody>\n</table>\n\n";

/***/ }

});
//# sourceMappingURL=1.1.js.map