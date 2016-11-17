<template>
  <ol class="breadcrumb">
    <li v-for="(item, index) in list">
        <template v-if="index !== list.length - 1 && !item.redirect">
          <router-link :to="item.path">{{toName(item)}}</router-link>
        </template>
        <template v-else>
        {{toName(item)}}
        </template>
    </li>
  </ol>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    list: {
      default: []
    }
  },
  computed: {
    ...mapGetters(['currLan']),
  },
  methods: {
    toName(item) {
      if(item.meta && item.meta.showName) {
        return this.$options.filters.toI18nName(item.meta.showName, this.currLan)
      }
      return item.name
    }
  }
}
</script>
<style>
  .breadcrumb{
    margin-bottom: 0;
  }
</style>
