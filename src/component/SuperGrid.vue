<template>
  <div class="super-grid">
    <grid :data="list" :cols="gridConfig.cols" :operates="gridConfig.operates" @edit="edit" @otherOpers="otherOpers">
      </grid>
    <pager :total="pager.total" :current="pager.current" @pageTo="pageTo"></pager>
  </div>
</template>

<script>
  import Grid from 'component/Grid.vue'
  import Pager from 'component/Pager.vue'

  export default {
    props: {
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
      pager:{
        default(){
          return {
            current: 1,
            total: 1,
            limit: 5
          }
        },
        type: Object
      },
    },
    // data() {
    //   return {
    //     pager:{
    //       current: 1,
    //       total: 1,
    //       limit: 5
    //     }
    //   }
    // },
    created() {
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
        var searchCondition = this.searchCondition
        var pager = this.pager
        this.$emit('search', {searchCondition, pager})
      }
    },
    components: {
      Grid,
      Pager
    }

  }
</script>