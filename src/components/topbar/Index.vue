<template>
<el-menu theme="dark" :default-active="'2'" mode="horizontal" id="sc-menu">
  <el-menu-item index="1">Logo</el-menu-item>
  <el-menu-item index="2" class="menu__ops">
    <router-link :to="'/system/inform/list'">link</router-link>
  </el-menu-item>
</el-menu>
</template>

<script>
  export default {
    data () {
      return {

      }
    },
    methods: {

    }
  }
</script>

<style>

</style>
