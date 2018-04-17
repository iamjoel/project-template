<template>
  <div class="main">
    <div class="swipe">
      <van-swipe :autoplay="3000" class="h-100per ta-c">
        <van-swipe-item v-for="i in 4" :key="i">
          <img class="img" :src="'http://via.placeholder.com/200x100?text=' + i"/>
        </van-swipe-item>
      </van-swipe>
    </div>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeTypeIndex: 0,
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
  .img {
    display: block;
    width: 100%;
    height: 100%;
  }
</style>