<!-- Compile dynamic template and bind vue event listeners https://github.com/vuejs/vue/issues/3863 -->
<!--
代加特性
加checkbox。全选
 -->
<template>
  <table class="table-grid table table-hover table-striped table-bordered table-center table-hover">
    <thead>
      <tr>
        <th>{{$t('index')}}</th>
        <th v-for="col in formatedCols" @click="order(col)" :class="getOrderClass(col)">
          {{toLabelName(col.label)}}
          <span class="order-icon" ></span>
        </th>
        <th v-if="operates.length>0">{{$t('operate')}}</th>
      </tr>
    </thead>
    <tbody>
        <tr v-for="(item, index) in data">
          <td>{{index + 1}}</td>
          <td v-for="col in formatedCols" @click="clickItem(col, item)">
            <span v-if="col.html" v-html="compile(col.html(item[col.name], item))"></span>
            <template v-if="!col.html">
              {{item[col.name]}}
            </template>
          </td>
          <td v-if="operates.length>0" class="operate-col">
            <button v-if="hasEdit" @click="$emit('edit', item)">编辑</button>
            <button v-if="hasDelete" @click="$emit('delete', item)">删除</button>
            <span v-for="op in userDefineOperates" v-html="op.html(item)" @click="$emit('otherOpers', {name: op.event, data: item})">
            </span>
          </td>
        </tr>
      </tbody>
  </table>
</template>

<script>
  import Vue from 'vue'
  import { mapGetters } from 'vuex'

  export default {
    name: 'Grid',
    props: {
      data: {
        type: Array
      },
      cols: {
        type: Array,
        require: true
      },
      operates: {
        default: []
      }
    },
    data() {
      return {
        currentOrder: false,
        formatedCols: []
      }
    },
    watch: {
      currentOrder(curr, prev) {
        if(prev !== false) {// false 为第一次变化，不处理
          this.$emit('updateOrder')
        }
      }
    },
    computed: {
      ...mapGetters(['currLan']),
      hasEdit() {
        return this.operates.filter(item => item === 'edit').length > 0
      },
      hasDelete() {
        return this.operates.filter(item => item === 'delete').length > 0
      },
      userDefineOperates() {
        var ops =  this.operates.filter(item => typeof item === 'object' && item.html)
        ops = ops.map(item => {
          if(typeof item.html === 'string') {
            var html = item.html
            item.html = () => html
          }
          return item
        })
        return ops
      }
    },
    created() {
      var firstOrder = false
      this.formatedCols = [...this.cols].map((item) => {
        var each = Object.assign({}, item)
        if(each.order && !each.order.type) {
          each.order.type = ''
        }
        return each
      })

      var currentOrder;
      var defaultOrder = this.formatedCols.filter((each) => each.order && each.order.default)[0]
      if(defaultOrder) {
        currentOrder = defaultOrder
      } else {
        currentOrder = this.formatedCols.filter((each) => each.order)[0]
      }
      if(currentOrder) {
        currentOrder = currentOrder.order
        this.currentOrder = currentOrder
      }
    },
    methods: {
      compile(html) {
        // html = Vue.compile(html).render()
        return html
      },
      clickItem(col, item) {
        this.$emit('clickItem', {
          name: 'col-' + col.name,
          data: item
        })
      },
      getOrderClass(col) {
        var res
        if(col.order) {
          res = 'order-default'
          if(col.order.name === this.currentOrder.name) {
            if(['asc', 'desc'].indexOf(this.currentOrder.type) !== -1) {
              res = 'order-' + this.currentOrder.type
            }
          }
        }
        return res
      },
      order(col) {
        var scope = this
        var currentOrder
        if(col.order) {
          if(col.order.name !== this.currentOrder.name) {
            currentOrder = col.order
          } else {
            currentOrder = Object.assign({}, this.currentOrder)
          }
          // 重置为default
          this.formatedCols = this.formatedCols.map((each) => {
            if(each.order && each.order.name !== scope.currentOrder.name) {
              each.order.type = ''
            }
            return each
          })
          var type = currentOrder.type
          // asc：升序；desc：降序
          if(type === '' || type === undefined) {
            type = 'asc'
          } else if(type === 'asc') {
            type = 'desc'
          } else if(type === 'desc') {
            type = ''
          }
          currentOrder.type = type
          this.currentOrder = currentOrder
        }
      },
      getOrder() {
        return this.currentOrder
      },
      toLabelName(label) {
        if(typeof label === 'object') {
          return label[this.currLan]
        } else {
          return label
        }
      }
    },
    locales: {
      ch:{index: '序号', operate: '操作'},
      en:{index: 'Index', operate: 'Operate'}
    }

  }
</script>

<style lang="sass">
  .table-center th, .table-center td {
      text-align: center;
  }
  .table thead {
      height: 38px;
      color: #3e3e3e;
      font: bold 13px Microsoft Yahei;
      background: linear-gradient(to bottom,#f2f2f2,#e5e5e5);
  }
  .table-grid th:first-child{
    width: 60px;
  }
  .operate-col{
    padding-left: 20px !important;
    padding-right: 20px !important;
    text-align: left !important;
  }
  %caret{
    display: inline-block;
    width: 0;
    height: 0;
    margin-left: 2px;
    vertical-align: middle;
    border-top: 4px dashed;
    border-right: 4px solid transparent;
    border-left: 4px solid transparent;
  }
  .order-asc,.order-desc,.order-default{
    cursor: pointer;
  }
  .order-asc .order-icon{
    @extend %caret;
    position: relative;
    top: -4px;
    transform: rotate(180deg);
  }
  .order-desc .order-icon{
    @extend %caret;
  }
  .order-default .order-icon{
    position: relative;
    display: inline-block;
    width: 8px;

    &:before, &:after{
      content: '';
      position: absolute;
      left: 0;
      @extend %caret;
      border-top-color: #999;
    }
    &:before{
      top: -9px;
      transform: rotate(180deg);
    }
    &:after{
      top: -2px;
    }
  }
</style>