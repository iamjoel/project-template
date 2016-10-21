<template>
  <aside>
    <h1>子模块</h1>
    <ul class="sub-nav">
      <li v-for="item in subMenu" class="sub-nav__item">{{item.showName}}</li>
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
      this.subMenu = this.getSubMenu(route.path)
    }
  },
  methods: {
    getSubMenu(path) {
      let result = this.menu.filter( item => {
        return path.indexOf(item.name) > -1
      })
      return (result && result[0].children) ? result[0].children : []
    }
  }
}
</script>
