<template>
  <div class="main">
    <div class="swipe">
      <van-swipe :autoplay="3000" class="h-100per ta-c">
        <van-swipe-item>1</van-swipe-item>
        <van-swipe-item>2</van-swipe-item>
        <van-swipe-item>3</van-swipe-item>
        <van-swipe-item>4</van-swipe-item>
      </van-swipe>
    </div>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeTypeIndex: 0
    }  
  },
  methods: {
    
  }
}
</script>

<style scoped>
  .swipe {
    height: 2rem;
  }
</style>