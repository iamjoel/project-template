<template>
  <div class="main">
    <!-- 轮播 -->
    <div class="swipe mb-10rem">
      <van-swipe :autoplay="3000" class="h-100per ta-c">
        <van-swipe-item v-for="i in 5" :key="i">
          <img class="img" src="/static/demo/2.jpeg"/>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script src="./main.js"></script>

<style scoped src="./style.css"></style>