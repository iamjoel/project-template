export default {
  data() {
    return {
      isShowDetailDialog: false,
      currData: []
    }  
  },
  methods: {
    showItems(row) {
      this.currData = row.value
      this.isShowDetailDialog = true
    }
  }
}