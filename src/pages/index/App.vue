<template>
  <div id="app">
    <j-topbar></j-topbar>
    <el-row :gutter="20" style="margin-top: 65px;">
      <!-- min-height 为了占位 -->
      <el-col :span="4" style="min-height: 100px;">
        <j-siderbar :menu="menu"></j-siderbar>
      </el-col>
      <el-col :span="20">
        <j-breadcrumb :menu="menu"></j-breadcrumb>
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
      menu: [{
        "innerid": Random.guid(),
        "name": "音乐",
        "icon": 'message',
        children: [{
            "innerid": Random.guid(),
            "name": "歌曲",
            path: '/music/song/list',
        },]
      }]
    }
  },
  mounted() {

  }
}
</script>
<style src="@/assets/reset.css"></style>
<style src="@/assets/common.css"></style>

