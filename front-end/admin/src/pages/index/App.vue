<template>
  <div id="app">
    <topbar/>
    <div class="ly" style="margin-top: 65px;">
      <div style="width: 250px;">
        <siderbar :menu="$store.state.menu"></siderbar>
      </div>
      <div class="lyi-f">
        <breadcrumb :menu="$store.state.menu"></breadcrumb>
        <router-view id="main-content"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Siderbar from '@/components/siderbar/Index'
import Topbar from '@/components/topbar/Index'
import Breadcrumb from '@/components/breadcrumb/Index'
import * as types from '@/store/mutation-types'
import { title } from '@/setting'

// var isMock = true
// if(isMock) {
//   require('@/views/account/api/mock.js')
//   require('@/views/music/song/api/mock.js')
//   require('@/views/music/singer/api/mock.js')
// }
export default {
  name: 'app',
  components: {
    Siderbar,
    Topbar,
    Breadcrumb
  },
  mounted () {
    var role = localStorage.getItem('j-role') || 'admin'
    this.$store.commit(types.ROLE, role)
    this.$store.dispatch('fetchMenuAndLimit')
    this.$store.dispatch('fetchBasicData')
  },
  created () {
    document.title = title
  }
}
</script>
<style src="@/assets/reset.css"></style>
<style src="css-utils-collection"></style>
<style src="@/assets/common.css"></style>
