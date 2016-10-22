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
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
window.jQuery = require('jquery')// 给bootstrap用
require('bootstrap')
var Sidebar = require('component/layout/Sidebar.vue')
var Navbar = require('component/layout/Navbar.vue')

export default {
  name: 'app',
  components: {
    Sidebar,
    Navbar
  }
}
</script>
<style src="bootstrap/dist/css/bootstrap.min.css"></style>
