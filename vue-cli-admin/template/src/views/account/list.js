import listMixin from '@/mixin/list'
import {isMock} from '@/setting'
console.log(isMock)
if(isMock) {
  require('./api/mock.js')
}

export default {
  mixins: [listMixin],
  data () {
    return {
      searchConditions: {
        name: null,
      },
      model: {}
    }
  },
  methods: {
    
  }
}

