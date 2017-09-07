import updateMixin from '@/mixin/update'

require('./api/mock.js')

export default {
  mixins: [updateMixin],
  data () {
    return {
      KEY: 'song',
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
}
