webpackJsonp([2],{124:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{}},methods:{logout:function(){location.href="login.html"}}}},125:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(202),i=n.n(r),a=n(203),u=n.n(a),o=n(201),c=n.n(o),s=n(29);e.default={name:"app",components:{"j-siderbar":i.a,"j-topbar":u.a,"j-breadcrumb":c.a},mounted:function(){var t=localStorage.getItem("j-role")||"user";this.$store.commit(s.a,t),this.$store.dispatch("fetchMenuAndLimit")}}},127:function(t,e,n){"use strict";function r(t,e,n,r){return t.forEach(function(t){var u=t.id;t.children?t.children.forEach(function(t){t.pages||(t.pages=e.map(function(t){return h()({},t)})),t.pages=t.pages.map(function(e){var n=a(e,u,t.id);return h()(e,n)}),t.mainPage=i(t),c(t,n,r)}):(t.pages||(t.pages=e.map(function(t){return h()({},t)})),t.pages=t.pages.map(function(e){var n=a(e,void 0,t.id);return h()(e,n)}),t.mainPage=i(t),c(t,n,r))}),t}function i(t){var e,n=t.main||"list";return e=t.pages.filter(function(t){return t.type===n})[0],e||(e=t.pages[0]),e}function a(t,e,n){return{filePath:u(t,e,n),routePath:o(t,e,n)}}function u(t,e,n){var r=t.filePath;if(!r){var i=t.type;"view"===i&&(i="update"),r=(e?e+"/":"")+n+"/"+i}var a=r.split("/");return a.map(function(t,e){return e===a.length-1?s(t):t}).join("/")}function o(t,e,n){var r=t.routePath;if(!r){var i={update:"update/:id",view:"view/:id"}[t.type]||t.type;r=(e?e+"/":"")+n+"/"+i}return"/"!==r.charAt(0)&&(r="/"+r),r}function c(t,e,n){var r=t.ajaxKey||t.id,i=["list","detail","add","edit","del"],a=t.pages.filter(function(t){return-1===i.indexOf(t.type)}).map(function(t){return t.type}),u=[].concat(i,f()(a));e[r]=l(n+"/"+r,u)}function s(t){return t.charAt(0).toUpperCase()+t.substr(1)}function l(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:["list","detail","add","edit","del"],n=arguments[2],r={};return n&&n.length>0&&(e=[].concat(f()(e),f()(n))),e.forEach(function(e){r[e]=t+"/"+e}),r}var d=n(30),f=n.n(d),p=n(83),h=n.n(p);n(8);e.a=r},128:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r={list:"列表",update:"编辑",view:"详情"};e.default={props:{menu:{type:Array}},computed:{pathArr:function(){return this.$route.path.split("/").filter(function(t){return""!==t})},currMenu:function(){var t=!1,e=this.pathArr,n=this.menu;return e.length>=1&&n.length>0&&n.forEach(function(n){if(!t)if(n.children){if(n.children.length>0){var r=n.children[0];if(!r.path)return void console.error(r);var i=r.path.split("/")[1];i===e[0]&&(t=n)}}else{var i=n.path.split("/")[1];i===e[0]&&(t=n)}}),t},menuName:function(){return this.currMenu?this.currMenu.name:""},subMenuName:function(){if(!this.currMenu.children)return"";var t,e=this.currMenu,n=this.pathArr;if(e){var i="";e.children.forEach(function(t){t.path.split("/")[2]===n[1]&&(i=t.name)}),t=i+(r[this.pathArr[2]]||"未知"+this.pathArr[2])}return t}},mounted:function(){}}},129:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{menu:{type:Array}},computed:{pathArr:function(){return this.$route.path.split("/").filter(function(t){return""!==t})},currMenu:function(){var t=this.menu,e=!1,n=this.pathArr;return n.length>=1&&t.length>0&&t.forEach(function(t){if(!e)if(t.children){if(t.children.length>0){var r=t.children[0];if(!r.path)return void console.error(r);var i=r.path.split("/")[1];i===n[0]&&(e=t)}}else{var i=t.path.split("/")[1];i===n[0]&&(e=t)}}),e},currMenuId:function(){return this.currMenu?this.currMenu.id:""},currSubMenuId:function(){if(!this.currMenu.children)return"";var t,e=this.currMenu,n=this.pathArr;return e&&e.children.forEach(function(e){e.path.split("/")[2]===n[1]&&(t=e.id)}),t}},data:function(){return{}},methods:{},mounted:function(){}}},130:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(1),i=n(81),a=n.n(i),u=n(79),o=n(21),c=(n.n(o),n(7)),s=n.n(c),l=n(16),d=n.n(l),f=n(80),p=n(8);r.default.use(s.a),r.default.config.productionTip=!1,r.default.prototype.developing=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"backend",e="backend"===t?"后端接口":"前端";s.a.Message({showClose:!0,message:e+"开发中",type:"info"})},n(20),r.default.prototype.$http=d.a,r.default.filter("img",function(t,e){return p.a+"/"+("small"===e?"thumb_img/":"")+t}),new r.default({el:"#app",router:u.a,store:f.a,template:"<App/>",components:{App:a.a}})},132:function(t,e,n){"use strict";function r(t,e){a.push({path:e,component:function(e){u(e,t)}})}var i=n(8),a=[{path:"/",component:function(t){u(t,"Dashboard",!1)}}];i.b.forEach(function(t){t.id;t.children?t.children.forEach(function(t){t.pages.forEach(function(t){r(t.filePath,t.routePath)})}):t.pages.forEach(function(t){r(t.filePath,t.routePath)})});var u=function(t,e){var r=arguments.length>2&&void 0!==arguments[2]&&arguments[2];n.e(0).then(function(i){t(n(216)("./"+e+(r?"/Index":"")+".vue"))}.bind(null,n)).catch(n.oe)};e.a=a},133:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),n.d(e,"setUser",function(){return u}),n.d(e,"fetchMenuAndLimit",function(){return c});var r=n(29),i=n(8),a=n(16),u=(n.n(a),function(t,e){(0,t.commit)(r.b,e)}),o=[];i.b.forEach(function(t){var e=t;if(t.children){var n=t.children.map(function(t){return{id:t.id,name:t.name,role:t.role,path:t.mainPage.routePath}});return o.push({id:e.id,name:e.name,role:e.role,children:n})}return o.push({id:e.id,name:e.name,role:e.role,path:t.mainPage.routePath})}),console.log(o);var c=function(t){var e=t.commit,n=t.state,i=(t.getters,n.role),a=o.filter(function(t){return!t.role||t.role===i&&(t.children&&(t.children=t.children.filter(function(t){return!t.role||t.role===i})),!0)});e(r.c,{data:{menu:a,limit:{}}})}},134:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),n.d(e,"placeHolder",function(){return r});var r=function(t){return"xxx"}},135:function(t,e,n){"use strict";var r,i=n(84),a=n.n(i),u=n(29),o=(n(8),n(1),r={},a()(r,u.a,function(t,e){t.role=e}),a()(r,u.b,function(t,e){t.user=e}),a()(r,u.c,function(t,e){t.menu=e.data.menu,t.limit=e.data.limit}),r);e.a=o},194:function(t,e){},195:function(t,e){},196:function(t,e){},197:function(t,e){},20:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(48),i=n.n(r),a=n(16),u=n.n(a),o=n(7);n.n(o);u.a.interceptors.response.use(function(t){var e=t.data,r=(t.config,e.errorCode);return r?1==r?void(location.href="login.html"):(n.i(o.Message)({message:e.errorMessage||"未知错误",type:"error"}),i.a.reject()):t},function(t){return i.a.reject(t)})},201:function(t,e,n){var r=n(15)(n(128),n(206),null,null,null);t.exports=r.exports},202:function(t,e,n){function r(t){n(197)}var i=n(15)(n(129),n(208),r,"data-v-cb1f0aea",null);t.exports=i.exports},203:function(t,e,n){function r(t){n(194)}var i=n(15)(n(124),n(205),r,null,null);t.exports=i.exports},205:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"topbar"}},[n("el-menu",{attrs:{theme:"dark","default-active":"2",mode:"horizontal",id:"sc-menu"}},[n("el-menu-item",{attrs:{index:"1"}},[t._v("娱乐")]),t._v(" "),n("el-menu-item",{staticStyle:{float:"right"},attrs:{index:"2"},on:{click:function(e){t.logout()}}},[t._v("登出")])],1)],1)},staticRenderFns:[]}},206:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("el-breadcrumb",{staticStyle:{padding:"20px 0 20px 30px"},attrs:{separator:"/"}},[n("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[t._v("首页")]),t._v(" "),t.menuName?n("el-breadcrumb-item",[t._v(t._s(t.menuName))]):t._e(),t._v(" "),t.subMenuName?n("el-breadcrumb-item",[t._v(t._s(t.subMenuName))]):t._e()],1)},staticRenderFns:[]}},207:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("j-topbar"),t._v(" "),n("el-row",{staticStyle:{"margin-top":"65px"},attrs:{gutter:20}},[n("el-col",{staticStyle:{"min-height":"100px"},attrs:{span:4}},[n("j-siderbar",{attrs:{menu:t.$store.state.menu}})],1),t._v(" "),n("el-col",{attrs:{span:20}},[n("j-breadcrumb",{attrs:{menu:t.$store.state.menu}}),t._v(" "),n("router-view",{attrs:{id:"main-content"}})],1)],1)],1)},staticRenderFns:[]}},208:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"j-siderbar"},[n("el-menu",{staticStyle:{height:"100%","overflow-y":"auto"},attrs:{theme:"dark","default-openeds":[t.currMenuId],"default-active":t.currSubMenuId||t.currMenuId}},[t._l(t.menu,function(e){return[e.children?n("el-submenu",{attrs:{index:e.id}},[n("template",{slot:"title"},[t._v("\n          "+t._s(e.name)+"\n        ")]),t._v(" "),e.children?n("el-menu-item-group",{attrs:{title:""}},t._l(e.children,function(e){return n("el-menu-item",{key:e.id,attrs:{index:e.id},on:{click:function(n){t.$router.push(e.path)}}},[n("router-link",{attrs:{to:e.path}},[t._v(t._s(e.name))])],1)})):t._e()],2):n("el-menu-item",{attrs:{index:e.id},on:{click:function(n){t.$router.push(e.path)}}},[n("router-link",{attrs:{to:e.path}},[t._v(t._s(e.name))])],1)]})],2)],1)},staticRenderFns:[]}},21:function(t,e){},29:function(t,e,n){"use strict";n.d(e,"b",function(){return r}),n.d(e,"c",function(){return i}),n.d(e,"a",function(){return a});var r="user/fetch",i="member-and-limit",a="role"},79:function(t,e,n){"use strict";var r=n(30),i=n.n(r),a=n(1),u=n(209),o=n(132);a.default.use(u.a),e.a=new u.a({routes:[].concat(i()(o.a),[{path:"*",redirect:"/"}])})},8:function(t,e,n){"use strict";n.d(e,"a",function(){return o}),n.d(e,"d",function(){return c}),n.d(e,"c",function(){return d}),n.d(e,"b",function(){return p});var r,i=n(30),a=(n.n(i),n(127)),u=!1;u=!0,r="http://127.0.0.1:3000";var o=r+"/imgs",c=u,s=r+"/api",l=[{id:"dashboard",name:"仪表盘",pages:[{type:"dashboard",filePath:"dashboard",routePath:"dashboard"}]},{id:"account",name:"帐号",role:"admin"},{id:"music",name:"音乐",children:[{id:"song",name:"歌曲"}]}],d={},f=[{type:"list"},{type:"update"},{type:"view"}],p=n.i(a.a)(l,f,d,s);console.log(p)},80:function(t,e,n){"use strict";var r=n(1),i=n(211),a=n(135),u=n(133),o=n(134);r.default.use(i.a);var c={user:{id:null,name:null},menu:[],limit:{}};e.a=new i.a.Store({state:c,mutations:a.a,actions:u,getters:o,strict:!1})},81:function(t,e,n){function r(t){n(196),n(195)}var i=n(15)(n(125),n(207),r,null,null);t.exports=i.exports}},[130]);
//# sourceMappingURL=index.40a7b1275e24b317ef98.js.map