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

export default {
  name: 'app',
  components: {
    'j-siderbar': Sidebar,
    'j-topbar': Topbar,
    'j-breadcrumb': Breadcrumb,
  },
  mounted() {
    var role = localStorage.getItem('j-role') || 'user'
    this.$store.commit(types.ROLE, role)
    this.$store.dispatch('fetchMenuAndLimit')
  }
}
</script>
<style src="@/assets/reset.css"></style>
<style src="@/assets/common.css"></style>

