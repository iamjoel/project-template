import noData from '@/components/no-data'
import stickybits from 'stickybits'
export default {
  components: {
    noData
  },
  data() {
    return {
      active: 0,
      isNodata: false,
      newItem: {
        list: new Array(10),
        isLoading: false,
        isFinished: false
      },
      hotItem: {
        list: new Array(10),
        isLoading: false,
        isFinished: false
      },
    }
  },
  methods: {
    search(type) {
      var list = this[type].list
      if(this.isNodata) {
        this[type].list = []
        this[type].isLoading = false
      } else {
         setTimeout(() => {
          for (let i = 0; i < 6; i++) {
            list.push('');
          }
          this[type].isLoading = false;

          if (list.length >= 40) {
            this[type].isFinished = true;
          }
        }, 500);
      }
     
    },
    searchAll() {
      this.search('newItem')
      this.search('hotItem')
    }
  },

  mounted() {
    stickybits('.van-tabs__wrap')
  }
  
}