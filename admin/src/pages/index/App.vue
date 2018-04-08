<template>
  <div id="app">
    <j-topbar></j-topbar>
    <div class="ly" style="margin-top: 65px;">
      <div style="width: 250px;">
        <j-siderbar :menu="$store.state.menu"></j-siderbar>
      </div>
      <div class="lyi-f">
        <j-breadcrumb :menu="$store.state.menu"></j-breadcrumb>
        <router-view id="main-content"></router-view>
      </div>
    </div>
    
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
  require('@/views/music/singer/api/mock.js')
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

