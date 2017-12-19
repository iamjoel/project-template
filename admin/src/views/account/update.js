import updateMixin from '@/mixin/update'

require('./api/mock.js')

export default {
  mixins: [updateMixin],
  data () {
    return {
      model: {
        name: null,
        password: null,
      },
      rules: {
        name: [
          { required: true, message: '请输入帐号名', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ],
      },
    }
  },
}
