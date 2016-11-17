<template>
  <div>
    <div class="super-grid">
      <grid :data="list" :cols="gridConfig.cols" :operates="gridConfig.operates" @updateOrder="search" @clickItem="clickItem" @edit="edit" @delete="showDeleteConfirm" @otherOpers="otherOpers" ref="grid">
        </grid>
      <pager @updatePager="search" ref="pager"></pager>
    </div>
    <confirm v-show="showConfirm" @hide="showConfirm=false" @confirm="deleteIt">确定删除?</confirm>
  </div>
</template>

<script>
  import Vue from 'vue'
  import Grid from 'component/Grid.vue'
  import Pager from 'component/Pager.vue'
  import Confirm from 'component/Confirm.vue'

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
      current: {
        default: 1,
        type: Number
      },
      total: {
        default: 0,
        type: Number
      },
      limit: {
        type: Number
      }
    },
    data() {
      return {
        showConfirm: false,
        deleteData: {}
      }
    },
    mounted() {
      this.setPagerInfo({
        current: this.current,
        total: this.total,
        limit: this.limit
      })
      if(this.autoSearch) {
        this.search()
      }
    },
    methods: {
      clickItem(data) {
        this.$emit('clickItem', data)
      },
      edit(rowData){
        this.$emit('edit', rowData)
      },
      showDeleteConfirm(rowData) {
        this.showConfirm = true
        this.deleteData = rowData
      },
      deleteIt(rowData){
        this.showConfirm = false
        this.$emit('delete', this.deleteData)
      },
      otherOpers({name, data}){
        this.$emit(name, data)
      },
      search(){
        // 避免创建时，因为分页和排序都变化而导致的两次search
        Vue.nextTick(function () {
          this.$emit('search')
        }.bind(this))
      },
      getOrder() {
        return this.$refs.grid.getOrder()
      },
      getPagerInfo() {
        return this.$refs.pager.getPagerInfo()
      },
      setPagerInfo() {
        return this.$refs.pager.setPagerInfo(...arguments)
      }

    },
    components: {
      Grid,
      Pager,
      Confirm
    }

  }
</script>