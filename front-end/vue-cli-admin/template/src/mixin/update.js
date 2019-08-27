import { fetchList, addModel, editModel, fetchModel } from '@/service/api'
import JEditItem from '@/components/edit-item'
import deepClone from 'clone'
import moment from 'moment'
import dict from '@/setting/base/dict'
// 缓存新增时的初始数据
var modelInitValue = {}
export default {
  components: {
    'j-edit-item': JEditItem
  },
  data () {
    return {
      KEY: null,
      id: this.$route.params.id
    }
  },
  computed: {
    isAdd () {
      return this.$route.params.id == -1
    },
    isView () {
      return this.$route.path.indexOf('/view/') !== -1
    }
  },
  methods: {
    formatFetchData (data) {
      return data
    },
    afterFectch () {
      // 做一些初始化组件的事情
    },
    formatSaveData () {
      return this.model
    },
    beforeSave () {
      return true
    },
    save () {
      var method = this.isAdd ? addModel : editModel
      return new Promise((resolve, reject) => {
        this.valid()
          .then(() => {
            var saveData = this.formatSaveData()
            var isSave = this.beforeSave()
            if (isSave === false) {
              return
            }
            console.log(JSON.stringify(saveData))
            method(this.KEY, saveData).then(({ data }) => {
              if (!data.errcode) {
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
          })
          .catch(error => {
            console.log(error)
          })
      })
    },
    valid () {
      return new Promise((resolve, reject) => {
        this.$refs.form.validate(isValid => {
          if (isValid) {
            resolve()
          } else {
            reject()
          }
        })
      })
    },
    // 图片上传成功
    handleUploadImageSuccess (key, value) {
      this.model[key] = value
    },
    // 多图上传，删除某张图片
    removeImg (data, index) {
      var imgList = this.model[data].split(',')
      imgList.splice(index, 1)
      this.model[data] = imgList.join(',')
    },
    // 自动补全表单内容
    autoFill () {
      this.modelScheme.forEach(item => {
        let key = item.key
        var value = null
        switch (item.dataType) {
          case 'string':
          default:
            value = `${key}-测试`
            break
          case 'number':
            value = Math.ceil(Math.random() * 50)
            break
          case 'date':
            value = moment().format('YYYY-MM-DD')
            break
          case 'img':
            value = 'http://via.placeholder.com/100x100'
            break
          case 'imgs':
            value =
              'http://via.placeholder.com/100x100,http://via.placeholder.com/150x100'
            break
          case 'select':
            if (item.dataSource.type === 'dict') {
              value = dict.filter(d => item.dataSource.key == d.key)[0].value[0]
                .key
            } else {
              fetchList(item.dataSource.key).then(({ data }) => {
                this.model[key] = data.data.list[0].id
              })
              return // 异步的，防止被重置
            }
            break
        }
        this.model[key] = value
      })
    }
  },
  mounted () {
    var pathArr = this.$route.path.split('/').filter(item => item !== '')
    if (!this.KEY) {
      // 用 KEY 来调用 Ajax
      this.KEY = pathArr[pathArr.length - 3]
    }
    if (!this.isAdd) {
      fetchModel(this.KEY, this.id).then(({ data }) => {
        this.model = this.formatFetchData(
          Object.assign({}, this.model, data.data)
        )
        this.afterFectch()
      })
    } else {
      // 解决 model 会拿上次的值
      var initModel = modelInitValue[this.KEY]

      if (initModel) {
        // 非第一进入，拿之前存的初始化值
        this.$nextTick(() => {
          this.model = this.$set(this, 'model', deepClone(initModel))
          var refs = Object.keys(this.$refs)
          refs.forEach(key => {
            var classList = this.$refs[key].$el.classList
            // 重置下下拉框的值
            if (classList && [...classList].includes('remote-select')) {
              this.$refs[key].reset()
            }
          })
        })
      } else {
        // 第一次进入，将初始化值存起来
        modelInitValue[this.KEY] = deepClone(this.model)
      }
    }
  }
}
