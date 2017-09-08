import { fetchList, addModel, editModel, fetchModel } from '@/assets/utils/ajax-crud'
import JEditItem from '@/components/edit-item'

export default {
  components: {
    'j-edit-item': JEditItem,
  },
  data() {
    return {
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
    formatSaveData() {
      return this.model
    },
    save() {
      var method = this.isAdd ? addModel : editModel
      return new Promise((resolve, reject) => {
        this.valid().then(function(){
          method(this.KEY, this.model).then(({data}) => {
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
    if (!this.isAdd) {
      fetchModel(this.KEY, this.id).then(({data})=>{
        if (!data.errcode) {
          console.log(data)
          // debugger
          this.model = Object.assign({}, this.model, data.msgbody.data)
        }
      })
    }
  },
}