<template>
  <div class="j-siderbar">
    <el-menu
      theme="dark"
      :default-openeds="[currMenuId]"
      :default-active="currSubMenuId || currMenuId"
      style="height: 100%; overflow-y: auto"
    >
      <template v-for="item in menu">
        <el-menu-item
          :index="item.name"
          v-if="!item.children"
          @click="$router.push(item.path)"
        >
          <router-link :to="item.path || ''">\{{ item.name }}</router-link>
        </el-menu-item>
        <el-submenu :index="item.name" v-else>
          <template slot="title">
            \{{ item.name }}
          </template>
          <el-menu-item-group title="" v-if="item.children">
            <el-menu-item
              v-for="subMenu in item.children"
              :key="item.name"
              :index="subMenu.name"
              @click="$router.push(subMenu.path)"
            >
              <router-link :to="subMenu.path || ''">\{{
                subMenu.name
              }}</router-link>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script src="./main.js"></script>

<style scoped>
.j-siderbar {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 60px;
  width: 250px;
  bottom: 0;
  background-color: #324157;
}
.el-menu-item:hover {
  border-bottom: none !important;
  background: none !important;
}
#sc-menu {
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
