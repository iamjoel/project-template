<template>
  <div class="main">
    <img v-for="img in imageList" v-lazy="img" class="img">
  </div>
</template>

<script>

export default {
  data() {
    return {
      imageList: [
        'https://img.yzcdn.cn/public_files/2017/09/05/c0dab461920687911536621b345a0bc9.jpg',
        'https://img.yzcdn.cn/public_files/2017/09/05/c0dab461920687911536621b345a0bc9.jpg',
        'https://img.yzcdn.cn/public_files/2017/09/05/c0dab461920687911536621b345a0bc9.jpg',
        'https://img.yzcdn.cn/public_files/2017/09/05/c0dab461920687911536621b345a0bc9.jpg'
      ]
    }  
  },
  methods: {
    
  }
}
</script>

<style scoped>
.img {
  margin-bottom: 10px;
  max-width: 100%;
}
</style>