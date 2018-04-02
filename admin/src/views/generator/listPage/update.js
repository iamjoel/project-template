import JEditItem from '@/components/edit-item'
import deepClone from 'clone'
export default {
  components: {
    'j-edit-item': JEditItem,
  },
  data() {
    return {
      activeTab: 'fn',
      model: {
        basic: {},
        table: [],
        operate: {},
        searchCondition: [],
        fn: [],
      },
      opList: [],
      opDict: {
        'add': '新增',
        'edit': '编辑',
        'detail': '详情',
        'delete': '删除',
      },
      opShowType: [{
        label: '显示',
        key: 'show'
      },{
        label: '隐藏',
        key: 'hide'
      }, {
        label: '某些角色显示',
        key: 'roles'
      }],
      searchConditionDataType: [{
        label: '字符串',
        key: 'string'
      },{
        label: '下拉',
        key: 'select'
      }],
      searchConditionDataSourceType: [{
        label: '字典',
        key: 'dict'
      },{
        label: '实体',
        key: 'entities'
      }],
      isShowEditArgsDialog: false,
      currFn: {}
    }
  },
  methods: {
    getShowType(data) {
      if(data === true) {
        return 'show'
      } else if (data === false) {
        return 'hide'
      } else {// 数组
        return 'roles'
      }
    },
    getDataResource(type) {
      return type === 'dict' 
        ? [...this.$store.state.dict]
        : [...this.$store.state.entities]
    },
    move(key, index, action) {
      var changeIndex = action === 'up' ? index - 1 : index + 1
      var data =  key === 'args' ? this.currFn.args : this.model[key]
      var res = data.map((item, currIndex) => {
        if(currIndex === index) {
          return data[changeIndex]
        } else if(currIndex === changeIndex) {
          return data[index]
        } else {
          return item
        }
      })

      key === 'args' ? (this.currFn.args = res) : (this.model[key] = res)

    },
    editArgs(currFn) {
      this.currFn = currFn
      this.isShowEditArgsDialog = true
    },
    save() {
      var model = deepClone(this.model)
      model.fn = model.fn.map(item => {
        return {
          ...item,
          args: item.args.map(arg => arg.name)
        }
      })
      // TODO 保存到服务器
      console.log(JSON.stringify(model))
    },
    generateExpend() {
      var model = this.model
      var vue = `
<template> 
  <div class="main">
    <j-search-condition @search="search">
     ${model.searchCondition.map(item => {
      var inner
      switch(item.dataType) {
        case 'select': 

          if(item.dataSource.type === 'dict') {
            inner = `
            <el-select v-model="searchConditions.${item.key}" placeholder="请选择" filterable clearable>
              <el-option
                v-for="item in $store.state.dict[${item.dataSource.key}]"
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
        >
          ${inner}
        </j-edit-item>
      `
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
        ${model.table.map(item => {
          return `
          <el-table-column
            prop="${item.key}"
            label="${item.label}"
            >
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
            <el-button type="success" size="small" @click="showDetail(scope.row)" v-if="isShow('view')">详情</el-button>
            <el-button type="info" size="small" @click="$router.push(editPagePath(scope.row.id))" v-if="isShow('edit')">编辑</el-button>
            <el-button type="danger" size="small" @click="remove(scope.row.id)" v-if="isShow('delete')">删除</el-button>
          </template>
        </el-table-column>
        
      </el-table>
    </j-grid-box>
  </div>
</template>

      `
      var js = `
      `
      console.log(vue)
    }

  },
  mounted() {
    const pagesConfig = this.$store.state.pagesConfig
    var model = deepClone(pagesConfig[this.$route.params.id].list)
    // 操作列表
    this.opList = Object.keys(model.operate).map(opKey => {
      const item = model.operate[opKey]
      const showType = this.getShowType(item.isShow)
      const showRoles = showType === 'roles' ? item.isShow : []
      return {
        label: this.opDict[opKey],
        showType,
        showRoles
      }
    })
    // 标准化table数据
    model.table = model.table.map(item => {
      return {
        ...item,
        formatFn: item.formatFn || null, 
        showFn: item.showFn || null, 
      }
    })
    // 标准化搜索条件数据
    model.searchCondition = model.searchCondition.map(item => {
      return {
        ...item,
        dataType: item.dataType || 'string',
        dataSource: item.dataSource || {
          type: '',
          key: ''
        },
      }
    })
    // 标准化函数数据
    model.fn = model.fn.map(item => {
      return {
        ...item,
        args: item.args.map(arg => {return {name: arg}})
      }
    })

    this.model = model
    this.generateExpend()
  }
}