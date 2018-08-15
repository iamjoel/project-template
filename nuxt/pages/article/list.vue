<template>
  <div class="main">
    <div class="ta-c">列表页</div>
    <div class="list">
      <a href="javascript:void(0);"
        class="item"
        v-for="i in list" :key="i"
        @click="$router.push('/article/detail/' + i)">
        文章{{i}}
      </a>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      list: 0
    }
  },
  asyncData (context) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          list: 6
        })
      }, 500)
    })
  },
  methods: {
    
  }
}
</script>

<style>
  .item {
    display: block;
    margin-bottom: 10px;
  }
</style>