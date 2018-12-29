export default {
  data() {
    return {
      activeTypeIndex: 0,
      searchInput: '',
    }  
  },
  mounted() {
  },
  methods: {
    onSearch() {
      this.$showLoading()
      setTimeout(()=> {
        this.$hideLoading()
      }, 2000)
    }
  },
}