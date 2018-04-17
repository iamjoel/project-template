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
      KEY: this.$route.params.configName,
      isUpdatePageCommon: false,
      config: {},
      searchConditions: {}
    }  
  },
  watch: {
    '$route.path': function() {
      this.KEY = this.$route.params.configName
      this.init()
      this.mixinInit()
      this.PAGE_PATH_PREFIX = this.calculatePathPrefix()
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
    },
    init() {
      var searchConditions = {}
      var config = this.$store.state.listPagesConfig.filter(item => {
        return item.basic.entity === this.$route.params.configName
      })[0]
      this.$set(this, 'config', config)

      this.config.searchCondition.forEach(item => {
        searchConditions[item.key] = ''
      })
      this.$set(this, 'searchConditions', searchConditions)
      this.PAGE_PATH_PREFIX = `${this.config.basic.isUpdatePageCommon ? '/common' : ''}${this.PAGE_PATH_PREFIX}`
    },
    calculatePathPrefix() {
      var pathArr = this.$route.path.split('/').filter(item => item !== '')
      var res
      if(pathArr[0] === 'common') {
        pathArr.shift()
      }
      if(pathArr.length === 2) { // 形如 ['account', 'list']
        res = '/' + pathArr[0]
      } else {// 形如 ['music', 'song', 'list']
        res = '/' + pathArr[0] + '/' + pathArr[1]
      }
      res = `${this.config.basic.isUpdatePageCommon ? '/common' : ''}${res}`
      return res
    }
  },
  mounted() {
    this.init()
  }
}