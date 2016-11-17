
<template>
  <nav class="pagination-wrap" :class="classList" v-if="pager.total > 0">
    <ul class="pagination">
      <li :class="{disabled: pager.current === 1}"><a href="javascript:void(0)" @click="pageTo(1)">{{$t('first')}}</a></li>
      <li :class="{disabled: pager.current === 1}"><a href="javascript:void(0)" @click="pageTo(pager.current - 1)">{{$t('prev')}}</a></li>

      <li v-for="i in shouldDisplayPages" :class="{active: pager.current === i}">
          <a href="javascript:void(0)" @click="pageTo(i)">{{i}}</a>
      </li>
      <li :class="{disabled: pager.current === pager.total}"><a href="javascript:void(0)" @click="pageTo(pager.current + 1)">{{$t('next')}}</a></li>
      <li :class="{disabled: pager.current === pager.total}"><a href="javascript:void(0)" @click="pageTo(pager.total)">{{$t('last')}}</a></li>
    </ul>
  </nav>
</template>
<script>
  const defaultPagerConfig = {total: 5, current:1, limit: 5}
  export default {
      props: {
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
      data() {
        return {
          pager: Object.assign(defaultPagerConfig)
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
        }
      },
      methods: {
        pageTo(pageNum) {
          var pager = this.pager
          if(pageNum === pager.current || pageNum < 1 || pageNum > pager.total){
            return
          }
          pager.current = pageNum
          this.$emit('updatePager')
        },
        getPagerInfo() {
          return this.pager
        },
        setPagerInfo(pager){
          if(!pager.limit) {
            delete pager.limit
          }
          this.pager = Object.assign({}, defaultPagerConfig, pager)
        }
      },
      locales: {
        ch:{first: '首 页', prev: '上一页', last: '末 页', next:'下一页'},
        en:{first: 'First', prev: 'Prev', last: 'Last', next:'Next'}
      }
  }
</script>

<style>
.pagination-wrap{
  text-align: right;
}
</style>