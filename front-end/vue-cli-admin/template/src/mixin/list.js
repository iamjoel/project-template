import { fetchList, deleteModel } from '@/service/api'
import JSearchCondition from '@/components/search-condition'
import JEditItem from '@/components/edit-item'
import JGridBox from '@/components/grid-box'

var operateConfig = {
  add: {
    isShow: true
  },
  edit: {
    isShow: true
  },
  detail: {
    isShow: true
  },
  delete: {
    isShow: true
  }
}
export default {
  components: {
    JSearchCondition,
    JEditItem,
    JGridBox
  },
  data () {
    return {
      KEY: null,
      PAGE_PATH_PREFIX: null,
      operateConfig,
      tableData: [],
      pager: {
        current: 1,
        total: 1
      },
      model: {}, // 详情的model
      isShowDetailDialog: false,
      params: false
    }
  },
  computed: {
    addPagePath () {
      return `${this.PAGE_PATH_PREFIX}/update/-1`
    }
  },
  mounted () {
    this.mixinInit()
  },
  methods: {
    mixinInit () {
      var pathArr = this.$route.path.split('/').filter(item => item !== '')
      if (pathArr[0] === 'common') {
        pathArr.shift()
      }
      if (!this.KEY) {
        // 用 KEY 来调用 Ajax
        // 形如 ['account', 'list'], ['music', 'song', 'list']
        this.KEY = pathArr[pathArr.length - 2]
      }
      if (!this.PAGE_PATH_PREFIX) {
        // 用 PAGE_PATH_PREFIX 来跳转详情编辑新增页
        if (pathArr.length === 2) {
          // 形如 ['account', 'list']
          this.PAGE_PATH_PREFIX = '/' + pathArr[0]
        } else {
          // 形如 ['music', 'song', 'list']
          this.PAGE_PATH_PREFIX = '/' + pathArr[0] + '/' + pathArr[1]
        }
      }

      this.search()
    },
    fetch (searchConditions = this.searchConditions) {
      fetchList(this.KEY, searchConditions, this.pager).then(({ data }) => {
        if (!data.errorCode) {
          this.pager.total = data.pager.total
          this.tableData = data.data
        }
      })
    },
    handleCurrentChange (currentPage) {
      this.pager.current = currentPage
      this.fetch()
    },
    search () {
      this.pager.current = 1
      this.fetch()
    },
    remove (id) {
      this.$confirm('确认删除?', {
        type: 'warning'
      })
        .then(() => {
          deleteModel(this.KEY, id).then(({ data }) => {
            if (!data.errcode) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.search()
            }
          })
        })
        .catch(() => {})
    },
    editPagePath (id) {
      return `${this.PAGE_PATH_PREFIX}/update/${id}`
    },
    viewPagePath (id) {
      return `${this.PAGE_PATH_PREFIX}/view/${id}`
    },
    /*
     * 按钮的权限控制
     * 用权限值(细力度)或角色(粗力度)来做。
     */
    isShowAction (type) {
      var isShow = this.operateConfig[type].isShow
      if (Array.isArray(isShow)) {
        return isShow.indexOf(this.$store.state.role) !== -1
      } else {
        return isShow
      }
    },
    // 服务器端存权限的 二进制 做法
    // isShowAction (type) {
    //   var limit = this.$store.state.limit[this.limitKey]
    //   return (limit && limit[type]) || true // 测试
    // },
    showDetail (detail) {
      this.model = detail
      this.isShowDetailDialog = true
    }
  }
}
