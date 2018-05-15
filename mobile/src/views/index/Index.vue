<template>
  <div class="main">
    <div class="swipe mb-10rem">
      <van-swipe :autoplay="3000" class="h-100per ta-c">
        <van-swipe-item v-for="i in 4" :key="i">
          <img class="img" :src="'http://via.placeholder.com/200x100?text=' + i"/>
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="ly ly-c nav">
      <a href="javascript:void(0)" @click="$router.push('/demo/form')" class="nav__item">
        <van-icon name="records" />
        <div class="mt-10 ta-c">表单</div>
      </a>
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
    height: 3rem;
  }
  .img {
    display: block;
    width: 100%;
    height: 100%;
  }
  .nav__item {
    width: 1rem;
    color: inherit;
  }
  .nav__item  i{
    display: block;
    font-size: 24px;
    text-align: center;
  }
</style>