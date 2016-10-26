<template>
  <div class="demo-nav">
    <div class="row" v-show="showNav">
      <div class="col-md-4" v-for="item in demoMenu.children">
          <router-link :to="demoMenu.path + '/' + item.path">
            <div class="jumbotron">
              <div class="container">
                <div class="demo-name">{{item.meta.showName}}</div>
              </div>
            </div>
          </router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
var menu = require('menu')
export default {
  data() {
    return {
      demoMenu: menu.filter((item) => {
        return item.name === 'component'
      })[0]
    }
  },
  watch: {
    $route (route) {
    }
  },
  computed: {
    showNav() {
      // 首页
      return this.$route.matched.length === 1
    }
  }
}
</script>

<style>
  .demo-nav a:hover{
    text-decoration: none;
  }
  .demo-name{
    color: #333;
    text-align: center;
  }
</style>