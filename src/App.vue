<template>
  <div id="app">
    <navbar></navbar>
    <!-- 左侧的二级菜单 -->
    <sidebar></sidebar>
    <div id="app-main">
      <levelbar></levelbar>
      <router-view></router-view>
    </div>
  </div>
</template>


<script>
window.jQuery = require('jquery')// 给bootstrap用
window.$ = window.jQuery
require('bootstrap')
import Sidebar from 'component/layout/Sidebar.vue'
import Navbar from 'component/layout/Navbar.vue'
import Levelbar from 'component/layout/Levelbar.vue'
import setting from 'setting'
import store from 'store'

export default {
  name: 'app',
  components: {
    Sidebar,
    Navbar,
    Levelbar
  },
  created() {
    var currLan = store.get('currLan') || setting.language.default
    this.$store.dispatch('updateCurrLan', currLan)
  }
}
</script>

<style src="bootstrap/dist/css/bootstrap.min.css"></style>
<style src="toastr/build/toastr.min.css"></style>
<style lang="sass">
  @import 'assets/scss/layout';
  #app-main{
    margin-left: 16.67%;
    margin-top: 70px;
    padding-left: 20px;
  }
</style>

