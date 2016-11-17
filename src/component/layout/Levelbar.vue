<template>
  <div class="levelbar clearfix">
    <h2 class="pull-left title">{{toName($route)}}</h2>
    <div class="pull-right">
      <breadcrumb :list="list"><breadcrumb>
    </div>
  </div>
</template>

<script>
import Breadcrumb from './Breadcrumb.vue'
import menu from  'menu'
import { mapGetters } from 'vuex'

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
    ...mapGetters(['currLan'])
  },
  methods: {
    getList () {
      let matched = this.$route.matched
      let first = matched[0]
      if (first && (first.name !== '首页' || first.path !== '')) {
        matched = [{ meta: {showName:{ch: '首页', en: 'Home'}}, path: '/' }].concat(matched)
      }
      this.list = matched
    },
    toName(item) {
      if(item.meta && item.meta.showName) {
        return this.$options.filters.toI18nName(item.meta.showName, this.currLan)
      }
      return item.name
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