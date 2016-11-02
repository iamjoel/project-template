<template>
  <div>
    <div class="super-grid">
      <grid :id="id" :data="list" :cols="gridConfig.cols" :operates="gridConfig.operates" @updateOrder="search" @clickItem="clickItem" @edit="edit" @delete="showDeleteConfirm" @otherOpers="otherOpers">
        </grid>
      <pager :id="id" @updatePager="search"></pager>
    </div>
    <confirm v-show="showConfirm" @hide="showConfirm=false" @confirm="deleteIt">确定删除?</confirm>
  </div>
</template>

<script>
  import Vue from 'vue'
  import Grid from 'component/Grid.vue'
  import Pager from 'component/Pager.vue'
  import Confirm from 'component/Confirm.vue'
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
    data() {
      return {
        showConfirm: false,
        deleteData: {}
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
      pageTo(pageNum) {
        this.pager.current = pageNum
        this.search()
      },
      search(){
        if(this.pager){
          // 避免创建时，因为分页和排序都变化而导致的两次search
          Vue.nextTick(function () {
            this.$emit('search')
          }.bind(this))
        }
      }
    },
    components: {
      Grid,
      Pager,
      Confirm
    }

  }
</script>