import { fetchList, addModel, editModel, fetchModel } from '@/service/api'
import JEditItem from '@/components/edit-item'

export default {
  components: {
    'j-edit-item': JEditItem,
  },
  data() {
    return {
      KEY: null,
      id: this.$route.params.id,
    }
  },
  computed: {
    isAdd () {
      return this.$route.params.id == -1
    },
    isView () {
      return this.$route.path.indexOf('view') > 0
    },
  },
  methods: {
    formatFetchData(data) {
      return data
    },
    afterFectch() { // 做一些初始化组件的事情
    },
    formatSaveData() {
      return this.model
    },
    beforeSave() {
      return true
    },
    save() {
      var method = this.isAdd ? addModel : editModel
      return new Promise((resolve, reject) => {
        this.valid().then(() =>{
          var saveData = this.formatSaveData()
          var isSave = this.beforeSave()
          if(isSave === false) {
            return
          }
          method(this.KEY, saveData).then(({data}) => {
            if(!data.errcode) {
                this.$message({
                  showClose: true,
                  message: '保存成功',
                  type: 'success'
                })
                this.$router.go(-1)
            } else {
              reject()
            }
          })
        }).catch(error=>{
          console.log(error)
        })
      })
    },
    valid() {
      return new Promise((resolve, reject) => {
        this.$refs.form.validate((isValid) => {
          if (isValid) {
            resolve()
          } else {
            reject()
          }
        })
      })
    }
  },
  mounted () {
    var pathArr = this.$route.path.split('/').filter(item => item !== '')
    if(!this.KEY) { // 用 KEY 来调用 Ajax
      this.KEY = pathArr[pathArr.length - 3]
    }
    if (!this.isAdd) {
      fetchModel(this.KEY, this.id).then(({data})=>{
        if (!data.errcode) {
          this.model = this.formatFetchData(Object.assign({}, this.model, data.data))
          this.afterFectch()
        }
      })
    }
  },
}