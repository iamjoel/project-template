<template>
  <div class="main">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
     <van-cell-group>
      <van-cell :title="item" v-for="item in list" :key="item" />
    </van-cell-group>
    </van-pull-refresh>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      isLoading: false,
    }  
  },
  methods: {
    onRefresh() {
      var res = []
      for(var i = 0; i < 5; i++) {
        res.push(this.getRandomNum() + '')
      }
      setTimeout(() => {
        this.isLoading = false
        this.list = res
      }, 1000)
    },
    getRandomNum() {
      return Math.ceil(Math.random() * 1000)
    },
  },
  mounted() {
    this.onRefresh()
  }
}
</script>

<style scoped></style>