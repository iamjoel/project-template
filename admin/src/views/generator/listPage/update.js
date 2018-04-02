import JEditItem from '@/components/edit-item'
import deepClone from 'clone'
export default {
  components: {
    'j-edit-item': JEditItem,
  },
  data() {
    return {
      activeTab: 'basic',
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

    this.model = model
  }
}