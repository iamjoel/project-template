<template>
<div class="j-siderbar">
  <el-menu theme="dark" :default-openeds="[currMenuId]" :default-active="currSubMenuId" style="height: 100%; overflow-y: auto">
    <el-submenu :index="item.id" v-for="item in menu" :key="item.id">
      <template slot="title">
        <!-- <i :class="'el-icon-' + item.icon"></i> -->{{item.name}}
      </template>
      <el-menu-item-group title="">
        <el-menu-item :index="subMenu.id" v-for="subMenu in item.children" :key="subMenu.id" @click="$router.push(subMenu.path)">
          <router-link :to="subMenu.path">{{subMenu.name}}</router-link>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</div>
</template>

<script src="./main.js"></script>

<style scoped>
.j-siderbar{
  position: fixed;
  z-index: 1;
  left: 0;
  top: 60px;
  width: 16.66667%;
  bottom: 0;
  background-color: #324157;
}
.el-menu-item:hover{
  border-bottom: none !important;
  background: none !important;
}
#sc-menu{
  height: 74px;
  background-color: #0fa866;
  border-radius: 0;
}

.logo {
  height: 40px;
  padding-top: 17px;
}

.menu__ops {
  float: right !important;
}


</style>
