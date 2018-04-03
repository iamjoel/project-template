<template>
  <div id="app">
    <j-topbar></j-topbar>
    <el-row :gutter="20" style="margin-top: 65px;">
      <!-- min-height 为了占位 -->
      <el-col :span="4" style="min-height: 100px;">
        <j-siderbar :menu="$store.state.menu"></j-siderbar>
      </el-col>
      <el-col :span="20">
        <j-breadcrumb :menu="$store.state.menu"></j-breadcrumb>
        <router-view id="main-content"></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Sidebar from '@/components/siderbar'
import Topbar from '@/components/topbar'
import Breadcrumb from '@/components/breadcrumb'
import * as types from '@/store/mutation-types'

import {isMock} from '@/setting'
if(isMock || true) {
  require('@/views/music/song/api/mock.js')
}
export default {
  name: 'app',
  components: {
    'j-siderbar': Sidebar,
    'j-topbar': Topbar,
    'j-breadcrumb': Breadcrumb,
  },
  mounted() {
    var role = localStorage.getItem('j-role') || 'user'
    // this.$store.commit(types.ROLE, role)
    this.$store.commit(types.ROLE, 'admin')
    this.$store.dispatch('fetchMenuAndLimit')
    this.$store.dispatch('fetchBasicData')
  }
}
</script>
<style src="@/assets/reset.css"></style>
<style src="css-utils-collection"></style>
<style src="@/assets/common.css"></style>

