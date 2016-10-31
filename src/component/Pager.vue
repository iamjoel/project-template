
<template>
  <nav class="pagination-wrap" :class="classList" v-if="total > 1">
    <ul class="pagination">
      <li :class="{disabled: current === 1}"><a href="javascript:void(0)" @click="pageTo(1)">首页</a></li>
      <li :class="{disabled: current === 1}"><a href="javascript:void(0)" @click="pageTo(current - 1)">上一页</a></li>

      <li v-for="i in shouldDisplayPages" :class="{active: current === i}">
          <a href="javascript:void(0)" @click="pageTo(i)">{{i}}</a>
      </li>
      <li :class="{disabled: current === total}"><a href="javascript:void(0)" @click="pageTo(current + 1)">下一页</a></li>
      <li :class="{disabled: current === total}"><a href="javascript:void(0)" @click="pageTo(total)">末页</a></li>
    </ul>
  </nav>
</template>
<script>
  export default {
      props: {
        classList: {
          default() {
            return []
          }
        },
        total: {
          required: true,
          type: Number
        },
        current: {
          required: true,
          type: Number
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
          if(this.total <= this.displayPages) {
            start = 1
            end = this.total
          } else {
            start = this.current - Math.floor(this.displayPages/2)
            if(start < 1) {
              start = 1
            }
            end = start + this.displayPages - 1
            if(end > this.total) {
              end = this.total
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
          if(pageNum === this.current || pageNum < 1 || pageNum > this.total){
            return
          }
          this.$emit('pageTo', pageNum)
        }
      }
  }
</script>

<style>
.pagination-wrap{
  text-align: right;
}
</style>