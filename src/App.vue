<template>
  <div id="app">
    <navbar></navbar>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-2 sub-menu-wrap">
          <!-- 左侧的二级菜单 -->
          <sidebar></sidebar>
        </div>
        <div class="col-sm-10">
          <levelbar></levelbar>
          <router-view></router-view>
        </div>
      </div>
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

export default {
  name: 'app',
  components: {
    Sidebar,
    Navbar,
    Levelbar
  },
  created() {
    var currLan = localStorage.getItem('currLan') || setting.language.default
    this.$store.dispatch('updateCurrLan', currLan)
  }
}
</script>

<style src="bootstrap/dist/css/bootstrap.min.css"></style>
<style src="toastr/build/toastr.min.css"></style>

