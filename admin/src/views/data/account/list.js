import listMixin from '@/mixin/list'

export default {
  mixins: [listMixin],
  data () {
    return {
      KEY: 'account',
      searchConditions: {
        name: null,
      },
      model: {}
    }
  },
  methods: {
    
  }
}

