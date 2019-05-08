<template>
  <div id="topbar">
    <el-menu
      :default-active="'2'"
      mode="horizontal"
      id="sc-menu"
      style="background: rgb(64, 158, 255);color: #f00"
    >
      <el-menu-item index="1">\{{ title }}</el-menu-item>
      <!-- <el-menu-item index="2" class="menu__ops">
      <router-link :to="'/system/inform/list'">link</router-link>
    </el-menu-item> -->
      <el-menu-item index="2" @click="logout()" style="float:right;"
        >登出</el-menu-item
      >
    </el-menu>
  </div>
</template>

<script>
import { title } from '@/setting'
export default {
  data () {
    return {
      title
    }
  },
  methods: {
    logout () {
      location.href = 'login.html'
    }
  }
}
</script>

<style>
#topbar {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
}

#topbar .el-menu-item {
  color: #fff;
}

#topbar .el-menu-item:hover {
  border-bottom: none !important;
  background: none;
}
</style>
