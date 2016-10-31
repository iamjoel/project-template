<!-- Compile dynamic template and bind vue event listeners https://github.com/vuejs/vue/issues/3863 -->
<!--
代加特性
加checkbox。全选
 -->
<template>
  <table class="table-grid table table-hover table-striped table-bordered table-center table-hover">
    <thead>
      <tr>
        <th>序号</th>
        <th v-for="col in cols">{{col.label}}</th>
        <th v-if="operates.length>0">操作</th>
      </tr>
    </thead>
    <tbody>
        <tr v-for="(item, index) in data">
          <td>{{index + 1}}</td>
          <td v-for="col in cols" @click="clickItem(col, item)">
            <span v-if="col.html" v-html="compile(col.html(item[col.name], item))"></span>
            <template v-if="!col.html">
              {{item[col.name]}}
            </template>

          </td>
          <td v-if="operates.length>0" class="operate-col">
            <button v-if="hasEdit" @click="$emit('edit', item)">编辑</button>
            <button v-if="hasDelete" @click="$emit('delete', item)">删除</button>
            <span v-for="op in userDefineOperates" v-html="op.html(item)" @click="$emit(op.event, item)">
            </span>
          </td>
        </tr>
      </tbody>
  </table>
</template>

<script>
  import Vue from 'vue'
  export default {
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
    computed: {
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
    methods: {
      compile(html) {
        // html = Vue.compile(html).render()
        return html
      },
      clickItem(col, item) {
        if(typeof col.click === 'function') {
          col.click(item, this)
        }
      }
    }

  }
</script>

<style>
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
</style>