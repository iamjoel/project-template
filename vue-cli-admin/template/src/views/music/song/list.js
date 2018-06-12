import listMixin from '@/mixin/list'
import JRemoteSelect from '@/components/remote-select'

var searchConditions = {
  name: '',
  type: ''
}

var operateConfig = {
  "add": {
    "isShow": true
  },
  "edit": {
    "isShow": true
  },
  "detail": {
    "isShow": true
  },
  "delete": {
    "isShow": true
  }
}

export default {
  mixins: [listMixin],
  components: {
   'j-remote-select': JRemoteSelect,
  },
  data() {
    return {
      KEY: 'song',
      searchConditions,
    }  
  },
  methods: {
    isShow(type) {
      var isShow = operateConfig[type].isShow
      if(Array.isArray(isShow)) {
        return isShow.indexOf(this.$store.state.role) !== -1
      } else {
        return isShow
      }
    },
    formatType(row) {
      return this.getDictName('musicType', row.type)
    },
    doSth(row) {
      return row.singer.name + row.name
    }
  },
  mounted() {
    
  }
}