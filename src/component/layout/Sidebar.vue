<template>
  <aside>
    <ul class="menu-list">
      <li v-for="item in menu">
        <router-link :to="item.path">{{item.showName}}</router-link>
        <ul v-show="item.children" class="sub-item" :class="{'unfold': isunfold(item.path)}">
          <li v-for="subItem in item.children">
            <router-link :to="item.path + '/'+ subItem.path">{{subItem.showName}}</router-link>
          </li>
        </ul>
      </li>
    </ul>
  </aside>
</template>

<script>
var menu = require('../../router/menu')
export default {
  data() {
    return {
      menu,
      subMenu: []
    }
  },
  watch: {
    $route (route) {
    }
  },
  methods: {
    isunfold(path) {
      var currPath = this.$route.path
      return currPath.indexOf(path) === 0
    }
  }
}
</script>

<style scoped>
  ul{
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .menu-list ul{
    padding-left: 20px;
  }

  .sub-item{
    display: none;
  }
  .sub-item.unfold{
    display: block;
  }
</style>
