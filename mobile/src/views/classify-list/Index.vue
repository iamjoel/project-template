<template>
  <div class="main">
    <van-tabs v-model="active">
      <van-tab  title="新品">
        <div class="ly ly-multi ly-j item-wrap">
          <div v-for="i in 9" :key="i" class="item">
            <img src="http://via.placeholder.com/200x100" alt="" class="img" />
            新品{{i}}
          </div>
          
        </div>
      </van-tab>
      <van-tab  title="热销">
        xx2
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>

export default {
  data() {
    return {
      active: 0
    }
  },
  methods: {
    
  }
}
</script>

<style scoped>
  .item-wrap {
    padding: 0 3.3%;
  }
  .item {
    width: 40%;
  }
  .img {
    max-width: 100%;
  }
</style>