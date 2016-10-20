<template>
  <div id="app">
    <nav class="navbar navbar-default" role="navigation">
      <div class="container-fluid">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
            <span class="sr-only">切换导航</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">Joy</a>
        </div>
        <div class="collapse navbar-collapse navbar-ex1-collapse">
          <ul id="menu" class="nav navbar-nav navbar-right">
            <li v-for="module in modules">
              <a href="javascript:void(0);">{{lan(module.name)}}</a>
            </li>
            <li><a href="javascript:void(0);" @click="changeLan">{{lanText}}</a></li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-2 sub-menu-wrap">
          <!-- 左侧的二级菜单 -->
          <!--    <sub-menu :page-route="pageRoute"></sub-menu> -->
        </div>
        <div class="col-sm-10">
          <!-- <router-view></router-view> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// var route = require('./route')
var languageHelper = require('language-helper')
var defaultLan = require('setting').language.default
export default {
  name: 'app',
  // route,
  data () {
    return {
      modules: require('setting').modules,
      currLanguage: defaultLan
    }
  },
  computed: {
    lanText () {
      return this.currLanguage === 'Ch' ? '中文' : 'English'
    }
  },
  methods: {
    getPath (module) {
      var defalutSubModule = module.sub.filter(subModule =>{
        return module.default === subModule.id
      })[0]

      return '/' + module.modulePrefix + defalutSubModule.path
    },
    lan (key) {
      var currLanguage = this.currLanguage
      return currLanguage === defaultLan ?
        key : (languageHelper.get(currLanguage)[key] || key)
    },
    changeLan () {
      if(this.currLanguage === 'Ch'){
        this.currLanguage = 'En'
      } else {
        this.currLanguage = 'Ch'
      }
    }
  }
}
</script>

<style>
.navbar{
  border-radius: 0;
}
</style>
