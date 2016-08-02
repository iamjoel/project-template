webpackJsonp([2],{

/***/ 4:
/*!****************************************!*\
  !*** ./assets/component/film/index.js ***!
  \****************************************/
/***/ function(module, exports, __webpack_require__) {

	var Vue = __webpack_require__(/*! vue */ 1);
	
	var Music = Vue.extend({
	  template: 'Film'
	});
	module.exports  = Music;


/***/ },

/***/ 5:
/*!*****************************************!*\
  !*** ./assets/component/music/index.js ***!
  \*****************************************/
/***/ function(module, exports, __webpack_require__) {

	var Vue = __webpack_require__(/*! vue */ 1);
	
	var Music = Vue.extend({
	  template: __webpack_require__(/*! ./index.html */ 6)
	});
	module.exports  = Music;


/***/ },

/***/ 6:
/*!*******************************************!*\
  !*** ./assets/component/music/index.html ***!
  \*******************************************/
/***/ function(module, exports) {

	module.exports = "Muisc Page!";

/***/ },

/***/ 16:
/*!***************************************!*\
  !*** ./assets/component ^\.\/.*\.js$ ***!
  \***************************************/
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./app/index.js": 7,
		"./film/index.js": 4,
		"./music/index.js": 5
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
	webpackContext.id = 16;


/***/ }

});
//# sourceMappingURL=2.2.js.map