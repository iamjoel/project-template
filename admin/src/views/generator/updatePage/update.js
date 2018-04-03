import JEditItem from '@/components/edit-item'
import deepClone from 'clone'
import generatorListCode from './utils/generatorListCode'
export default {
  components: {
    'j-edit-item': JEditItem,
  },
  data() {
    return {
      activeTab: 'basic',
      model: {
        basic: {},
        cols: [],
        fn: [],
      },
      opList: [],
      
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
      generatorListCode(this.model)
    },


  },
  mounted() {
    const pagesConfig = this.$store.state.pagesConfig
    var model = deepClone(pagesConfig[this.$route.params.id].detail)
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
    // this.generateExpend()
  }
}