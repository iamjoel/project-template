<template>
  <div id="app">
    <j-topbar v-if="!isMainFillAll"></j-topbar>
    <el-row :gutter="20">
      <el-col :span="4" v-if="!isMainFillAll">
        <j-siderbar :menu="menu"></j-siderbar>
      </el-col>
      <el-col :span="isMainFillAll ? 24 : 20">
        <j-breadcrumb :menu="menu" v-if="!isMainFillAll"></j-breadcrumb>
        <router-view id="main-content"></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Sidebar from '@/components/siderbar'
import Topbar from '@/components/topbar'
import Breadcrumb from '@/components/breadcrumb'
// require('@/assets/assets/utils/ajax') // 对ajax 加拦截器
import Mock from 'mockjs'
var Random = Mock.Random


export default {
  name: 'app',
  components: {
    'j-siderbar': Sidebar,
    'j-topbar': Topbar,
    'j-breadcrumb': Breadcrumb,
  },
  data() {
    return {
      isMainFillAll: false,
      menu: [{
        "innerid": Random.guid(),
        "name": "音乐",
        "icon": 'message',
        children: [{
            "innerid": Random.guid(),
            "name": "歌曲",
            path: 'music/song/list',
        },]
      }]
    }
  },
  watch: {
    // 登录页，
    '$router.path': function () {
      if(this.$router.path === '/login') {
        this.isMainFillAll = true
      } else {
        this.isMainFillAll = false
      }
    }
  },
  mounted() {

  }
}
</script>
<style src="@/assets/reset.css"></style>
<style>
.el-menu {
  border-radius: 0;
}
.el-menu-item a{
  color: inherit;
  text-decoration: none;
}
</style>
