export default {
  data() {
    return {
      activeTypeIndex: 0,
      searchInput: '',
    }  
  },
  methods: {
    onSearch() {
      this.$showLoading()
      setTimeout(()=> {
        this.$hideLoading()
      }, 2000)
    }
  }
}