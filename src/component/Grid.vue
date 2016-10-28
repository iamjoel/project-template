<!-- Compile dynamic template and bind vue event listeners https://github.com/vuejs/vue/issues/3863 -->
<template>
  <table class="table-grid table table-hover table-striped table-bordered table-center table-hover">
    <thead>
      <tr>
        <th>序号</th>
        <th v-for="col in cols">{{col.label}}</th>
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
      }
    },
    created() {

    },
    methods: {
      compile(html) {
        // html = Vue.compile(html).render()
        // debugger
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
</style>