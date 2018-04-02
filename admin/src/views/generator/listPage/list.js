export default {
  data() {
    return {
      pages: []
    }
  },
  methods: {
    
  },
  mounted() {
    const pagesConfig = this.$store.state.pagesConfig
    this.pages = Object.keys(pagesConfig).map(key => {
      return {
        id: key,
        ...pagesConfig[key].list
      }
    })
  }
}