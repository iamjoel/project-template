<template>
<div class="sc-siderbar">

  
  <el-menu theme="dark" :default-openeds="[currMenuId]" :default-active="currSubMenuId">
    <el-submenu :index="item.innerid" v-for="item in menu" :key="item.innerid">
      <template slot="title">
        <i :class="'el-icon-' + item.icon"></i>{{item.name}}
      </template>
      <el-menu-item-group title="">
        <el-menu-item :index="subMenu.innerid" v-for="subMenu in item.children" :key="subMenu.innerid">
          <router-link :to="subMenu.path">{{subMenu.name}}</router-link>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</div>
</template>

<script src="./main.js"></script>

<style scoped>
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
