<template>
  <div class="placeholder">
    <slot>
      占位
    </slot>
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
  .placeholder {
    height: 1rem;
    line-height: 1rem;
    text-align: center;
    background-color: #ddd;
    color: #fff;
    text-shadow: 1px 1px 1px #000;
    border: none;
  }
</style>