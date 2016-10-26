<template>
<div class="main-container">
  <button @click="showAlert=true">弹出 Alert框</button>
  <alert v-if="showAlert" width="250px" @close="showAlert = false">
    <!-- <span slot="header">自定义头部</span> -->
    <div slot="body">自定义内容</div>
  </alert>
  <button @click="showConfirm=true">弹出 Confirm框</button>
  <confirm v-if="showConfirm" @close="showConfirm = false" @confirm="confirmed()">
    <div slot="body">准备好了？</div>
  </confirm>
</div>

</template>

<script>
  var Alert = require('component/Alert.vue')
  var Confirm = require('component/Confirm.vue')

  export default {
    components: {
      Alert,
      Confirm
    },
    data () {
      return {
        showAlert: false,
        showConfirm: false
      }
    },
    methods: {
      confirmed() {
        console.log('confirmed!')
        this.showConfirm = false
      }
    }
  }
</script>
<style>
  
</style>