<template>
  <div class="main">
    <h2>默认Media</h2>
    <div>
      <media v-for="i in 3" :key="i" style="padding: .1rem">
        <h3 class="mb-10">标题</h3>
        <p>内容内容内容内容内容内容内容内容内容</p>
      </media>
    </div>
    
    <h2>垂直的Media</h2>
    <div class="ly ly-multi">
      <media v-for="i in 3" :key="Math.random()"
        style="padding: .1rem;width: 3rem;"
        dir-ver
      >
        <h3 class="mb-10">标题</h3>
        <p>内容内容内容内容内容内容内容内容内容</p>
      </media>
    </div>
    

    <h2>可配置项目的Media</h2>
    <media v-for="i in 3" :key="Math.random()"
      style="padding: .1rem"
      :img="{
        src: '/static/demo/2.jpeg',
        isRight: true,
        isCircle: true,
        height:'1rem',
        width: '1rem'
      }"
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