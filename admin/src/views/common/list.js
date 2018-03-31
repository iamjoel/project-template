import {pageConfigs,isMock} from '@/setting'
import listMixin from '@/mixin/list'

if(isMock) {
  require('../music/song/api/mock.js')
}
// #/common/song/list
export default {
  mixins: [listMixin],
  data() {
    return {
      KEY: null,
      config: pageConfigs[this.$route.params.configName].list,
      searchConditions: {}
    }  
  },
  methods: {
    // 代理所有函数
    proxy(fnName, args) {
      var fn = this.config.fn.filter(item => item.name === fnName)[0]
      if(fn) {
        return fn.fn.apply(this, args)
      }
    }
  },
  mounted() {
    this.config.searchCondition.forEach(item => {
      this.searchConditions[item.key] = ''
    })
    this.key = this.config.urlKey
    // debugger
  }
}