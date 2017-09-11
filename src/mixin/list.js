import { fetchList, deleteModel } from '@/assets/utils/ajax-crud'
import JSearchCondition from '@/components/search-condition'
import JEditItem from '@/components/edit-item'
import JGridBox from '@/components/grid-box'

export default {
  components: {
    'j-search-condition': JSearchCondition,
    'j-edit-item': JEditItem,
    'j-grid-box': JGridBox
  },
  data() {
    return {
      tableData: [],
      pager: {
        current: 1,
        total: 1
      },
    }
  },
  computed: {
    addPagePath() {
      return `${this.PAGE_PATH_PREFIX}/update/-1`
    },
  },
  mounted() {
    if(!this.KEY) {
      console.error('请设置KEY')
      return
    } else if(!this.PAGE_PATH_PREFIX) {
      console.error('请设置PAGE_PATH_PREFIX')
      return
    }
    this.search()
  },
  methods: {
    fetch() {
      this.fetchList()
    },
    fetchList(searchConditions = this.searchConditions) {
      fetchList(this.KEY, searchConditions, this.pager)
        .then(({ data }) => {
          if(!data.errorCode) {
            data = data.msgbody
            this.pager.total = data.total
            this.tableData = data.data
          }
        })
    },
    handleCurrentChange(currentPage) {
      this.pager.current = currentPage
      this.fetch()
    },
    search() {
      this.pager.current = 1
      this.fetch()
    },
    remove(id) {
      this.$confirm('确认删除?',  {
        type: 'warning'
      }).then(() => {
        deleteModel(this.KEY, id).then(({data}) => {
          if(!data.errcode) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.search()
          }
        })
      }).catch(() => {})
    },
    editPagePath(id) {
      return `${this.PAGE_PATH_PREFIX}/update/${id}`
    },
    viewPagePath(id) {
      return `${this.PAGE_PATH_PREFIX}/view/${id}`
    },
    // 按钮的权限控制
    isShow (type) {
      return true
    },
    
  }
}
