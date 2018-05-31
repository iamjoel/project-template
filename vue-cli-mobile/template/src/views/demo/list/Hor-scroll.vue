<template>
  <div class="main">
    <h1>横向滚动</h1>
    <div class="ly list">
      <img 
        v-for="i in 8"
        :key="i"
        class="item" 
        src="http://via.placeholder.com/200x100" alt=""/>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }  
  },
  methods: {
    
  }
}
</script>

<style scoped>
h1 {
  margin: .1rem 0;
}
.list {
  overflow-x: scroll;
}
.item {
  margin-right: .2rem;
}
</style>