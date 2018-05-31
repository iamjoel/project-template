<template>
  <div class="main">
    <img class="img" src="/static/demo/1.jpeg" alt="" @click="preview">
  </div>
</template>

<script>
import { ImagePreview } from 'vant'
export default {
  data() {
    return {
      list: [
        '/static/demo/1.jpeg',
        '/static/demo/2.jpeg',
      ]
    }  
  },
  methods: {
    preview() {
      ImagePreview(this.list)
    }
  }
}
</script>

<style scoped>
  .img {
    max-width: 100%;
  }
</style>