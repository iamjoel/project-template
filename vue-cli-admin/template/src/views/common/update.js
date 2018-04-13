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
      KEY: this.$route.params.configName,
      config: deepClone(this.$store.state.updatePagesConfig.filter(item => item.basic.entity === this.$route.params.configName)[0]),
      model: {},
      rules: {},
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
      var rules = {} // 验证规则

      config.cols.forEach(col => {
        // 对单个字段的 format
        if(col.formatFn) {
          model[col.key] = this.proxy(col.formatFn, [model, col.key])
        }

        if(!this.isView && col.dataType === 'select' && col.dataSource.type === 'entity') {
          if(model[col.key] != undefined) {
            this.$refs[col.key][0].setVal(model[col.key])
          }
        }


        if(col.validRules && col.validRules.length > 0) {
          rules[col.key] = col.validRules.map(rule => {
            if(rule.name === 'required') {
              var res = {
                required: true, 
                message: rule.errMsg,
                trigger: 'blur'
              }
              if(col.dataType === 'number') {
                res.type = 'number'
              }
              return res
            }
            return false
          }).filter(item => item)

        }


      })
      // 添加验证规则，会触发验证。所以要等数据好了再添加。
      this.$set(this, 'rules', rules)

      return model
    },
    formatSaveData() {
      var config = this.config
      var model = deepClone(this.model)
      config.cols.forEach(col => {
        if(col.saveFormatFn) {
          model[col.key] = this.proxy(col.saveFormatFn, [model, col.key])
        }
      })
      return this.model
    },
    
  
  },
  mounted() {
    var config = this.config
    var model = {}

    config.cols.forEach(col => {
      model[col.key] = null
    })

    config.fn = config.fn || []
    config.fn = config.fn.concat(this.$store.state.utilFns) // 加入内置函数
    this.$set(this, 'model', model)
    
  }
}