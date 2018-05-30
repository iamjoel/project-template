import stickybits from 'stickybits'
export default {
  
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
      setTimeout(() => {
        for (let i = 0; i < 6; i++) {
          list.push('');
        }
        this[type].isLoading = false;

        if (list.length >= 40) {
          this[type].isFinished = true;
        }
      }, 500);
     
    },
  },

  mounted() {
    stickybits('.van-tabs__wrap')
  }
  
}