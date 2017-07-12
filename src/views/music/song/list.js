import Vue from 'vue'
import SCSearchCondition from '@/components/search-condition'
import SCEditItem from '@/components/edit-item'
import { fetchList, deleteModel } from './api'
import listMixin from '@/mixin/list'

export default {
  components: {
    'sc-search-condition': SCSearchCondition,
    'sc-edit-item': SCEditItem
  },
  mixins: [listMixin],
  data () {
    return {
      searchConditions: {
        name: '',
        staff_id: ''
      },
      tableData: [],
      pager: {
        current: 1,
        total: 1
      },
    }
  },
  methods: {
    handleCurrentChange(currentPage) {
      this.pager.current = currentPage
      this.fetch()
    },
    search() {
      this.pager.current = 1
      this.fetch()
    },
    fetch() {
      fetchList(this.searchConditions, this.pager).then(function({ data }) {
        if(!data.errcode) {
          data = data.msgbody
          this.pager.total = data.total
          this.tableData = data.data
        }
      }.bind(this))
    },
    remove(id) {
      this.$confirm('确认删除?',  {
        type: 'warning'
      }).then(() => {
        deleteModel(id).then(function ({data}) {
          if(!data.errcode) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.search()
          }
        }.bind(this))
      }).catch(() => {})
    },
  },
  mounted() {
    this.search()
  }
}
