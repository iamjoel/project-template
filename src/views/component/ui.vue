<template>
  <div>
    <h3>显示提示信息</h3>
    <button @click="showToast('success')">success</button>
    <button @click="showToast('error')">error</button>
    <button @click="showToast('info')">info</button>
    <button @click="showToast('warning')">warning</button>
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