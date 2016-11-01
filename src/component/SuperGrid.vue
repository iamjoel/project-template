<template>
  <div class="super-grid">
    <grid :data="list" :cols="gridConfig.cols" :operates="gridConfig.operates" @edit="edit" @otherOpers="otherOpers">
      </grid>
    <pager :id="id" @updatePager="search"></pager>
  </div>
</template>

<script>
  import Grid from 'component/Grid.vue'
  import Pager from 'component/Pager.vue'
  import { mapGetters } from 'vuex'

  export default {
    props: {
      id: {
        required: true
      },
      autoSearch: {
        default: true,
        type: Boolean
      },
      gridConfig: {
        default(){
          return {
            cols: [],
            operates: []
          }
        },
        type: Object
      },
      searchCondition: {
        default(){
          return {}
        },
        type: Object
      },
      list:{
        default(){
          return []
        },
        type: Array
      },
      current: {
        default: 1,
        type: Number
      },
      total: {
        default: 0,
        type: Number
      },
      limit: {
        default: 5,
        type: Number
      }
    },
    computed: {
      ...mapGetters(['pagers']),
      pager() {
        var pagers = this.$store.state.pagers
        var pager = (pagers && pagers[this.id]) || false
        return pager
      }
    },
    created() {
      var pager = {
        current: this.current,
        total: this.total,
        limit: this.limit
      }
      this.$store.dispatch('updatePager', {
        id: this.id,
        pager: pager
      })
      if(this.autoSearch) {
        this.search()
      }
    },
    methods: {
      edit(rowData){
        this.$emit('edit', rowData)
      },
      otherOpers(){

      },
      pageTo(pageNum) {
        this.pager.current = pageNum
        this.search()
      },
      search(){
        if(this.pager){
          this.$emit('search')
        }
      }
    },
    components: {
      Grid,
      Pager
    }

  }
</script>