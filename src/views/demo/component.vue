<template>
<div class="main-container">
  <h2>弹出框</h2>
  <button class="modal-trigger-btn" @click="showModal=true">模态框</button>
  <modal v-if="showModal" width="250px" @close="showModal = false">
    <!-- <span slot="header">自定义头部</span> -->
    <div slot="body">自定义内容</div>
  </modal>
  <!-- <button class="modal-trigger-btn" @click="showAlert=true">Alert框</button>
  <alert :show.sync="showAlert">
    <div slot="msg">发卡成功</div>
  </alert>
  <button class="modal-trigger-btn" @click="showConfirm=true">确认框</button>
  <div class="confirm-msg" v-show="confirmResult">已确认</div>
  <confirm :show.sync="showConfirm" :confirmed.sync="confirmResult" confirmCallabd="">
    <div slot="msg">会员卡注销不可恢复，是否继续
      <div>
  </confirm> -->
</div>

</template>

<script>
  var Modal = require('component/Modal.vue');
  // require('component/alert');
  // require('component/confirm');
  export default {
    components: {
      Modal
    },
    data () {
      return {
        showModal:false,
        showAlert: false,
        showConfirm: false,
        confirmResult: false
      }
    },
    watch: {
      confirmResult (val, oldVal) {
        if(val === true){
          console.log('confirmed');
        }
      }
    }
  }
</script>
<style>
  
</style>