import updateMixin from '@/mixin/update'
import JRemoteSelect from '@/components/remote-select'
import deepClone from 'clone'

var model = {"name":null,"type":null,"singerId":null,"time":null,"img":null,"sort":null,"isOriginal":null,"describe":null}
var rules = {"name":[{ required: true, message: '请输入歌曲名称', trigger: 'blur' }],"type":[{ required: true, message: '请选择歌曲类型', trigger: 'blur' }],"singerId":[{ required: true, message: '请选择歌手', trigger: 'blur' }],"sort":[{ type: 'number',required: true, message: '请输入排序值', trigger: 'blur' }]}

export default {
  mixins: [updateMixin],
  components: {
   'j-remote-select': JRemoteSelect,
  },
  data() {
    return {
      KEY: 'song',
      model,
      rules,
    }  
  },
  methods: {
    formatFetchData(model) {
      model = deepClone(model)
      model.name = this.testFormat(model)
      // 下拉框赋值
      if(!this.isView) {
        
      if(model.singerId) {
        this.$refs.singerId.setVal(model.singerId)
      }
      
      }
      return model
    },
    formatSaveData() {
      var model = deepClone(this.model)
      model.name = this.testAfterFormat(model)
      return this.model
    },
    
  testFormat(model) {
    console.log(`before ${model.name}`); return model.name
  },

  testAfterFormat(model) {
    console.log(`after ${model.name}`); return model.name
  }
  },
  mounted() {
    
  }
}