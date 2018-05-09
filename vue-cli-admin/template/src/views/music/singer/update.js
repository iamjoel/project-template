
import updateMixin from '@/mixin/update'
import JRemoteSelect from '@/components/remote-select'
import deepClone from 'clone'

var model = {"moreInfo":{},"name":null}
var rules = {"name":[{ required: true, message: '请输入歌手名称', trigger: 'blur' }]}

export default {
  mixins: [updateMixin],
  components: {
   'j-remote-select': JRemoteSelect,
  },
  data() {
    return {
      KEY: 'singer',
      model,
      rules,
    }  
  },
  methods: {
    formatFetchData(model) {
      model = deepClone(model)
      
      // 下拉框赋值
      if(!this.isView) {
        
      } else {
        var dictModelCols = [] || []
        dictModelCols.length > 0 && dictModelCols.forEach(col => {
          model[col.key] = this.getDictName(col.dictKey, model[col.key])
        })
      }
      return model
    },
    formatSaveData() {
      var model = deepClone(this.model)
      
      delete model.moreInfo // 表关联的数据
      return model
    },
    
    
  },
  mounted() {
    
  }
}