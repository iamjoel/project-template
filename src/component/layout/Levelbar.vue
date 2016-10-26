<template>
  <div class="levelbar clearfix">
    <h2 class="pull-left title">{{name}}</h2>
    <div class="pull-right">
      <breadcrumb :list="list"><breadcrumb>
    </div>
  </div>
</template>

<script>
import Breadcrumb from './Breadcrumb.vue'
import menu from  'menu'
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
      return this.$route.meta && this.$route.meta.showName || this.$route.name
    }
  },

  methods: {
    getList () {
      let matched = this.$route.matched
      let first = matched[0]
      if (first && (first.name !== '首页' || first.path !== '')) {
        matched = [{ name: '首页', path: '/' }].concat(matched)
      }
      this.list = matched
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
    margin: 10px 0;
  }
</style>