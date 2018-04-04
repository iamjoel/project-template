import JEditItem from '@/components/edit-item'
import deepClone from 'clone'
import generatorListCode from './utils/generatorListCode'

export default {
  components: {
    'j-edit-item': JEditItem,
  },
  data() {
    return {
      activeTab: 'cols',
      model: {
        basic: {},
        cols: [],
        fn: [],
      },
      colItemTemplate: {
        label: '',
        key: '',
        dataType: 'string',
        dataSource: {
          type: 'entity',
          key: ''
        },
        imgConfig: {
          max: 5,
          tip: '建议尺寸 750 * 300'
        },
        validRules: [],
        formatFn: null,
        saveFormatFn: null,
      },
      colsDataType: [{
        key: 'string',
        label: '字符串'
      },{
        key: 'number',
        label: '数字'
      },{
        key: 'select',
        label: '下拉'
      },{
        key: 'date',
        label: '日期'
      },{
        key: 'img',
        label: '单图'
      },{
        key: 'imgs',
        label: '多图'
      }],
      isShowEditArgsDialog: false,
      isShowDataSourceDialog: false,
      dataSourceType: [{
        label: '字典',
        key: 'dict'
      },{
        label: '实体',
        key: 'entities'
      }],
      isShowImgDialog: false,
      validRuleType: [{
        key: 'required',
        label: '非空验证'
      }],
      isShowRuleDialog: false,
      currFn: {},
      currRow: {
        dataSource: {
          type: '',
          key: ''
        },
        imgConfig: {
          max: 5,
          tip: '建议尺寸 750 * 300'
        }
      }
    }
  },
  methods: {
    showDialog(row, key){
      this.currRow = row
      this[`isShow${key}Dialog`] = true
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
      model.cols = model.cols.map(item => {
        if(item.dataType !== 'select') {
          delete item.dataSource
        }
        if(item.dataType !== 'img' || item.dataType !== 'imgs') {
          delete item.imgConfig
        }
        return item
      })
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
      generatorListCode(this.model)
    },
    generatorErrmsg(item) {
      var action
      switch(item.dataType) {
        case 'select':
          action = '选择'
          break;
        case 'img':
        case 'imgs':
          return '请上传图片'
          break;
        case 'string':
        default: 
          action = '输入'
      }
      return `请${action}${item.label}`
    }
  },
  mounted() {
    const pagesConfig = this.$store.state.pagesConfig
    var model = deepClone(pagesConfig[this.$route.params.id].detail)
    model.cols = model.cols.map(col => {
      return {
        ...deepClone(this.colItemTemplate),
        ...col
      }
    })
    model.basic = model.basic || {}
    model.fn = model.fn || []
    // 标准化函数数据
    model.fn = model.fn.map(item => {
      return {
        ...item,
        args: item.args.map(arg => {return {name: arg}})
      }
    })

    this.model = model
    this.save()
    // this.generateExpend()
  }
}