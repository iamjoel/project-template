<template>
  <div class="data-fetcher">
    <van-list v-model="isLoading" :finished="isFinished" @load="fetchList">
      <template v-for="(item, i) in list">
        <slot :data="item" :index="i" />
      </template>
    </van-list>
    <div v-if="!isLoading && list.length === 0" class="ta-c lh-lg mt-10rem">
      暂无数据
    </div>
  </div>
</template>

<script>
import { fetchList } from '@/service/api'
export default {
  props: {
    keyId: String,
    searchCondition: {
      type: Object,
      default: () => {
        return {}
      }
    },
    order: Array,
    pageLimit: {
      type: Number,
      default: 5
    },
    isInfinate: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      list: [],
      isLoading: false,
      isFinished: false,
      pager: {
        current: 0,
        total: 1
      }
    }
  },
  methods: {
    fetchList (isReSearch) {
      if (!isReSearch) {
        if (this.isFinished) {
          return
        }
        this.pager.current++
      } else {
        this.isFinished = false
        this.pager.current = 1
      }

      this.isLoading = true

      // 非无限加载的，只调用一次接口
      if (!this.isInfinate) {
        this.isFinished = true
      }

      fetchList(this.keyId, this.searchCondition, this.pager, this.order).then(
        ({ data }) => {
          this.list = isReSearch ? data.data : this.list.concat(data.data)
          this.pager.total = data.pager.total
          if (
            this.pager.current >= Math.ceil(data.pager.total / this.pageLimit)
          ) {
            this.isFinished = true
          }
          this.isLoading = false
        }
      )
    }
  },
  mounted () {
    this.pager.item = this.pageLimit
    this.fetchList()
  }
}
</script>

<style scoped></style>
