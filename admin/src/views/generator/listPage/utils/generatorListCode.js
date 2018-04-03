export default function(config) {
  var js = generatorJS(config)
  var vue = generatorVue(config)
  console.log(vue, js)
}

function generatorJS(config) {
  var js = `
import listMixin from '@/mixin/list'
import JRemoteSelect from '@/components/remote-select'

var searchConditions = ${generateSearchCondition(config.searchCondition)}
var operateConfig = ${JSON.stringify(config.operate)}

export default {
  mixins: [listMixin],
  components: {
   'j-remote-select': JRemoteSelect,
  },
  data() {
    return {
      KEY: null,
      searchConditions,
    }  
  },
  methods: {
    isShow(type) {
      var isShow = operateConfig[type].isShow
      if(Array.isArray(isShow)) {
        return isShow.indexOf(this.$store.state.role) !== -1
      } else {
        return isShow
      }
    },
  ${generateVueMethods(config.fn)}
  },
  mounted() {
    this.key = '${config.basic.entity}'
  }
}`
  return js
}

function generatorVue(config) {
        var vue = `
<template> 
  <div class="main">
    <j-search-condition @search="search">
     ${config.searchCondition.map(item => {
      var inner
      switch(item.dataType) {
        case 'select': 

          if(item.dataSource.type === 'dict') {
            inner = `
            <el-select v-model="searchConditions.${item.key}" placeholder="请选择" filterable clearable>
              <el-option
                v-for="item in $store.getters.dictObj.${item.dataSource.key}"
                :key="item.key"
                :label="item.label"
                :value="item.key">
              </el-option>
            </el-select>`
          } else {
            inner = `
            <j-remote-select v-model="searchConditions.${item.key}" url-key="${item.dataSource.key}" :autoFetch="true">
            </j-remote-select>`
          }
          break;
        case 'string':
        default:
        inner = `
          <el-input v-model="searchConditions.${item.key}"></el-input>
        `
      }
      return `
        <j-edit-item
        label="${item.label}"
        >${inner}
        </j-edit-item>`
     }).join('\n')}
    </j-search-condition>

    <j-grid-box :is-show-add-btn="isShow('add')" :add-url="addPagePath" :pager="pager" @pageChange="handleCurrentChange">
      <el-table
        :data="tableData"
        border
        stripe>
        <el-table-column
          type="index"
          label="序列"
          align="center"
          width="80">
        </el-table-column>
        ${config.table.map(item => {
          var inner = item.formatFn ? `
            <template slot-scope="scope">
              {{${item.formatFn}(scope.row)}}
            </template>
          ` : ''
          return `
          <el-table-column
            prop="${item.key}"
            label="${item.label}"
            >
            ${inner}
          </el-table-column>
          `
        }).join('\n')}
        <el-table-column
          prop="op"
          label="操作"
          width="350"
          fixed="right"
          >
          <template slot-scope="scope">
            <el-button type="success" size="small" @click="showDetail(scope.row)" v-if="isShow('detail')">详情</el-button>
            <el-button type="info" size="small" @click="$router.push(editPagePath(scope.row.id))" v-if="isShow('edit')">编辑</el-button>
            <el-button type="danger" size="small" @click="remove(scope.row.id)" v-if="isShow('delete')">删除</el-button>
          </template>
        </el-table-column>
        
      </el-table>
    </j-grid-box>
  </div>
</template>
<script src="./list.js"></script>
<style scoped>
</style>
      `
  return vue

}

function generateSearchCondition(searchCondition) {
  return `
  {
    ${searchCondition.map(item => {
      return `${item.key}: ''`
    }).join(',\n')}
  }`
  searchCondition.forEach(item => {
    res
  })
  return res
}

function generateVueMethods(fns) {
  return fns.map(fn => {
    var args = fn.args.length > 0 ? fn.args.map(item => item.name).join(', ') : ''
    return `
  ${fn.name}(${args}) {
    ${fn.body}
  }`
  }).join(',\n')
}
