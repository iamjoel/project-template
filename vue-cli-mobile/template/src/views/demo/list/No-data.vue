<template>
  <div class="main">
    <no-data v-show="!isLoading && list.length === 0">
      暂无数据
    </no-data>
    <no-data v-show="!isLoading && list.length === 0">
      暂无收藏去 <van-button size="mini" @click="$router.push('/classify-list')">挑一些</van-button> 吧

    </no-data>
  </div>
</template>

<script>
import noData from '@/components/no-data'

export default {
  components: {
    noData
  },
  data() {
    return {
      isLoading: false,
      list: []
    }  
  },
  methods: {
    
  }
}
</script>

<style scoped></style>