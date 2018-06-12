import listMixin from '@/mixin/list'
import JRemoteSelect from '@/components/remote-select'

var searchConditions = {
  name: ''
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
      KEY: 'singer',
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
    toRandomnum() {
      return Math.ceil(Math.random() * 100)
    }
  },
  mounted() {
    
  }
}