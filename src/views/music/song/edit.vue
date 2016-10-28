<template>
  <form action="">
    <label for="">
      姓名
      <input type="text">
    </label>
  </form>
</template>

<script>
  export default {
    created() {
      debugger
      this.$route.param.id
    }
  }
</script>