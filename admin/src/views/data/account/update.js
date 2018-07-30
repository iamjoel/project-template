import updateMixin from '@/mixin/update'
import modelScheme from './model'
import JRemoteSelect from '@/components/remote-select'
import deepClone from 'clone'

var model = {
  "name": null,
  "account": null,
  "role": 2, // 默认是客服
  "password": null
}

var rules = {
  "name": [
    { required: true, message: '请输入名称', trigger: 'blur' }
  ],
  "account": [
    { required: true, message: '请输入帐号名', trigger: 'blur' }
  ],
  "role": [
    {  required: true,type: 'number', message: '请选择角色', trigger: 'blur' }
  ],
  "password": [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ]
}

export default {
  mixins: [updateMixin],
  components: {
   'j-remote-select': JRemoteSelect,
  },
  data() {
    return {
      KEY: 'account',
      model,
      modelScheme,
      rules,
    }  
  },
  methods: {
    formatFetchData(model) {
      model = deepClone(model)

      // 下拉框赋值
      if(!this.isView) {

      } else {

      }

      return model
    },
    formatSaveData() {
      var model = deepClone(this.model)

      return model
    },


  },
  mounted() {
    
  }
}