<template>
  <div class="wrap">
    <button @click="showToast('success')">显示成功信息</button>
    <button @click="showToast('error')">显示错误信息</button>
    <button @click="showToast('info')">显示普通信息</button>
    <button @click="showToast('warning')">显示警告信息</button>
  </div>
</template>
<script>
  import toastr from 'toastr'
  export default {
    methods: {
      showToast(type) {
        toastr[type](`${type}信息：xxx`)
      }
    }
  }
</script>
<style scoped>
  button{
    display: block;
    margin-bottom: 10px;
  }
</style>