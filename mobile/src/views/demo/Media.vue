<template>
  <div class="main">
    <h2>默认Media</h2>
    <div>
      <media v-for="i in 3" :key="i">
        <h3 class="mb-10">标题</h3>
        <p>内容内容内容内容内容内容内容内容内容</p>
      </media>
    </div>
    

    <h2>定制化的Media</h2>
    <media v-for="i in 3" :key="Math.random()"
      src="/static/demo/2.jpeg"
      img-right
      img-round
      img-height="1rem"
      img-width="1rem"
      img-padding=".4rem"
      no-border
    >
      <h3 class="mb-10">标题</h3>
      <p>内容内容内容内容内容内容内容内容内容</p>
    </media>
  </div>
</template>

<script>
import Media from '@/components/media'
export default {
  components: {
    Media
  },
  data() {
    return {

    }  
  },
  methods: {
    
  }
}
</script>

<style scoped>
h2 {
  font-size: 16px;
  margin: .2rem;
  padding-left: .2rem;
  height: .4rem;
  line-height: .4rem;
  border-left: 3px solid #fd9003;
}
h3 {
  font-weight: bold;
}
</style>