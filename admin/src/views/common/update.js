import updateMixin from '@/mixin/update'
import JRemoteSelect from '@/components/remote-select'
import deepClone from 'clone'
// #/common/music/song/update/-1
export default {
  mixins: [updateMixin],
  components: {
   'j-remote-select': JRemoteSelect,
  },
  data() {
    return {
      KEY: 'song',
      config: this.$store.state.pagesConfig[this.$route.params.configName].detail,
      model: {},
      rules: {}
    }  
  },
  methods: {
    // 代理所有函数
    proxy(fnName, args) {
      var fn = this.config.fn.filter(item => item.name === fnName)[0]
      if(fn) {
        return (new Function([...fn.args], fn.body)).apply(this, args)
      }
    },
    formatFetchData(model) {
      var config = this.config
      model = deepClone(model)
      config.cols.forEach(col => {
        if(col.formatFn) {
          model[col.key] = this.proxy(col.formatFn, [model])
        }

        if(!this.isView && col.dataType === 'select' && col.dataSource.type === 'entity') {
          debugger
          if(model[col.key]) {
            debugger
            this.$refs[col.key].setVal(model[col.key])
          }
        }
      })
      
      return model
    },
    formatSaveData() {
      var config = this.config
      var model = deepClone(this.model)
      config.cols.forEach(col => {
        if(col.saveFormatFn) {
          model[col.key] = this.proxy(col.saveFormatFn, [model])
        }
      })
      return this.model
    },
    
  
  },
  mounted() {
    var config = this.config
    var model = {}
    var rules = {}

    config.cols.forEach(col => {
      model[col.key] = null

      if(col.validRules && col.validRules.length > 0) {
        rules[col.key] = col.validRules.map(rule => {
          if(rule.name === 'required') {
            return `{ ${ col.dataType === 'number' ? `type: 'number',`: ''}required: true, message: '${rule.errMsg}', trigger: 'blur' }`
          }
          return false
        }).filter(item => item)
      }
    })
    // debugger

    this.$set(this, 'model', model)
    this.$set(this, 'rules', rules)
    this.key = 'song'//this.config.urlKey
  }
}