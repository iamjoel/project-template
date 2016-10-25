<template>
  <div class="levelbar clearfix">
    <h2 class="pull-left title">{{name}}</h2>
    <div class="pull-right">
      <breadcrumb :list="list"><breadcrumb>
    </div>
  </div>
</template>

<script>
var Breadcrumb = require('./Breadcrumb.vue')
var menu = require('menu')
export default {
  components: {
    Breadcrumb
  },
  data () {
    return {
      list: null
    }
  },

  created () {
    this.getList()
  },

  computed: {
    name () {
      return this.$route.name
    }
  },

  methods: {
    getList () {
      let matched = this.$route.matched
      let first = matched[0]
      if (first && (first.name !== '首页' || first.path !== '')) {
        matched = [{ name: '首页', path: '/' }].concat(this.formatName(matched))
      }
      this.list = matched
    },
    formatName (matched) {
      let paths = [...matched]
      if(paths[0]) {
        let firstMenuInfo
        firstMenuInfo = menu.filter((item)=>{
          return item.name === paths[0].name
        })[0]
        if(firstMenuInfo) {
          paths[0].name = firstMenuInfo.showName || paths[0].name
          if(paths[1] && firstMenuInfo.children) {
            let secMenuInfo
            secMenuInfo = firstMenuInfo.children.filter((item)=>{
              return item.name === paths[1].name
            })[0]
            if(secMenuInfo) {
              paths[1].name = secMenuInfo.showName || paths[1].name
            }
          }
        }

      }
      return paths
    }
  },

  watch: {
    $route () {
      this.getList()
    }
  }
}
</script>


<style scoped>
  .title{
    height: 32px;
    line-height: 32px;
    font-size: 22px;
    margin: 0;
  }
  .levelbar{
    margin-bottom: 10px;
  }
</style>