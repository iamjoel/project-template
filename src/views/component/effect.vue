<template>
  <div class="wrap">
    <h2>收起展开效果</h2>
    <expanding> 
      <div v-show="isExpand" class="block"></div>
    </expanding>
    <button @click="toggle">收起/展开</button>
    
  </div>

</template>
<script>
  import Expanding from 'component/Expanding.vue'

  export default {
    components: {
      Expanding
    },
    data(){
      return {
        tree: {},
        selectedTreeNode: [],
        isExpand: false
      }
    },
    methods: {
      toggle() {
        this.isExpand = !this.isExpand
      }
    }
  }
</script>
<style scoped>
  .block{
    height:200px;
    width:200px;
    background:#f60;
  }
</style>