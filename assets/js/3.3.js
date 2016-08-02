webpackJsonp([3],{

/***/ 10:
/*!********************************!*\
  !*** ./assets/js-src ^\.\/.*$ ***!
  \********************************/
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./helper/route-helper": 11,
		"./helper/route-helper.js": 11,
		"./routes": 3,
		"./routes.js": 3
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
	webpackContext.id = 10;


/***/ },

/***/ 11:
/*!**********************************************!*\
  !*** ./assets/js-src/helper/route-helper.js ***!
  \**********************************************/
/***/ function(module, exports, __webpack_require__) {

	function RouteHelper() {
	  this.routes = {};
	}
	
	RouteHelper.prototype = {
	  add: function(routePath, compontPath) {
	    compontPath = compontPath || '../component/' + routePath.replace(/^\//, '') + '/index';
	    this.routes[routePath] = {
	      component: function(resolve) {
	        __webpack_require__.e/* nsure */(2, function(require) {
	          resolve(__webpack_require__(/*! . */ 12)(compontPath));
	        });
	      }
	    }
	  },
	  get: function () {
	    return this.routes;
	  }
	}
	
	module.exports = RouteHelper;


/***/ }

});
//# sourceMappingURL=3.3.js.map