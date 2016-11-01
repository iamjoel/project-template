
<template>
  <nav class="pagination-wrap" :class="classList" v-if="pager.total > 0">
    <ul class="pagination">
      <li :class="{disabled: pager.current === 1}"><a href="javascript:void(0)" @click="pageTo(1)">首页</a></li>
      <li :class="{disabled: pager.current === 1}"><a href="javascript:void(0)" @click="pageTo(pager.current - 1)">上一页</a></li>

      <li v-for="i in shouldDisplayPages" :class="{active: pager.current === i}">
          <a href="javascript:void(0)" @click="pageTo(i)">{{i}}</a>
      </li>
      <li :class="{disabled: pager.current === pager.total}"><a href="javascript:void(0)" @click="pageTo(pager.current + 1)">下一页</a></li>
      <li :class="{disabled: pager.current === pager.total}"><a href="javascript:void(0)" @click="pageTo(pager.total)">末页</a></li>
    </ul>
  </nav>
</template>
<script>
  const defaultPagerConfig = {total: 5, current:1, limit: 5}
  import { mapGetters } from 'vuex'
  export default {
      props: {
        id: {
          required: true
        },
        classList: {
          default() {
            return []
          }
        },
        displayPages: {
          default: 5,
          type: Number
        }
      },
      computed: {
        shouldDisplayPages(){
          let start
          let end
          let res = []
          var pager = this.pager
          if(pager.total <= this.displayPages) {
            start = 1
            end = pager.total
          } else {
            start = pager.current - Math.floor(this.displayPages/2)
            if(start < 1) {
              start = 1
            }
            end = start + this.displayPages - 1
            if(end > pager.total) {
              end = pager.total
              start = end - this.displayPages + 1
            }
          }

          for(var i = start; i <= end; i++){
            res.push(i)
          }
          return res
        },
        ...mapGetters(['pagers']),
        pager() {
          var pager = (this.pagers && this.pagers[this.id])
          if(!pager){
            pager = Object.assign(defaultPagerConfig)
            this.$store.dispatch('updatePager', {
              id: this.id,
              pager: pager
            })
          }
          return pager
        }
      },
      methods: {
        pageTo(pageNum) {
          var pager = Object.assign({}, this.pager)
          if(pageNum === pager.current || pageNum < 1 || pageNum > pager.total){
            return
          }
          pager.current = pageNum
          this.$store.dispatch('updatePager', {
            id: this.id,
            pager: pager
          })
          this.$emit('updatePager')
        }
      }
  }
</script>

<style>
.pagination-wrap{
  text-align: right;
}
</style>