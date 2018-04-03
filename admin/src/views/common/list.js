import listMixin from '@/mixin/list'
import JRemoteSelect from '@/components/remote-select'

// #/common/music/song/list
export default {
  mixins: [listMixin],
  components: {
   'j-remote-select': JRemoteSelect,
  },
  data() {
    return {
      KEY: null,
      config: this.$store.state.pagesConfig[this.$route.params.configName].list,
      searchConditions: {}
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
    getValue(item, key) {
      var res = item
      var keyArr = key.split('.')
      keyArr.forEach(keyItem => {
        if(res) {
          res = res[keyItem]
        }
      })
      return res
    }
  },
  mounted() {
    var searchConditions = {}
    this.config.searchCondition.forEach(item => {
      searchConditions[item.key] = ''
    })
    this.$set(this, 'searchConditions', searchConditions)
    this.key = this.config.urlKey
  }
}