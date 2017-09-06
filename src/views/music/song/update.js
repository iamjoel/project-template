import SCEditItem from '@/components/edit-item'

import { fetchList, addModel, editModel, fetchModel } from '@/assets/utils/ajax-crud'

export default {
  components: {
    'j-edit-item': SCEditItem,
  },
  data () {
    return {
      id: this.$route.params.id,
      model: {
        name: null,
        describe: null,
        singer: null
      },
      rules: {
        name: [
          { required: true, message: '请输入歌曲名称', trigger: 'blur' },
        ],
        singer: [
          { required: true, message: '请选择歌手', trigger: 'blur' },
        ],
      },
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
  filters: {
    
  },
  mounted () {
    if (!this.isAdd) {
      fetchModel(this.id).then(({data})=>{
        if (!data.errcode) {
          this.model = Object.assign({}, this.model, data.msgbody.data)
          if(data.msgbody.user_role) {
            this.model.user_role = data.msgbody.user_role
          }
        }
      })
    }
  },
  methods: {
    save() {
      var method = this.isAdd ? addModel : editModel
      var vm = this
      return new Promise((resolve, reject) => {
        this.valid().then(function(){
          method(this.model).then(function({data}){
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
          }.bind(this))
        }.bind(vm)).catch(()=>{})
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
  }
}
