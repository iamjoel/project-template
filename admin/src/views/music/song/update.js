
import updateMixin from '@/mixin/update'
import JRemoteSelect from '@/components/remote-select'
import deepClone from 'clone'

var model = {"moreInfo":{"singer":{"name":null}},"name":null,"type":null,"singerId":null,"date":null,"img":null,"imgs":"","sort":null}
var rules = {"name":[{ required: true, message: '请输入名称', trigger: 'blur' }],"type":[{ required: true, message: '请选择歌曲类型', trigger: 'blur' }],"singerId":[{ required: true, message: '请选择歌手', trigger: 'blur' }],"sort":[{ type: 'number',required: true, message: '请输入排序值', trigger: 'blur' }]}

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
      
      // 下拉框赋值
      if(!this.isView) {
        
      if(model.singerId) {
        this.$refs.singerId.setVal(model.singerId)
      }
      
      } else {
        var dictModelCols = [{"key":"type","dictKey":"musicType"}] || []
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
    
    
  imgLoaded(data) {
      this.handleUploadImageSuccess('img', data.data)
  }
      ,

  imgsLoaded(data) {
      var imgs = this.model.imgs.split(',').filter(img => img)
      imgs.push(data.data)
      this.model.imgs = imgs.join(',')
  },

  },
  mounted() {
    
  }
}