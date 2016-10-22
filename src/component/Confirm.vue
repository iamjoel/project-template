<template>
<!-- 为了用 alert 的动画，必须copy <transition name="modal">
，有些撮啊 -->
  <transition name="modal">
    <alert>
      <h3 slot="header">温馨提示</h3>
      <div slot="body">
        <slot name="body"></slot>
      </div>
      <div slot="footer">
        <div class="confirm__btns">
          <button class="confirm__cancel-btn" @click="$emit('close')">取消</button>
          <button class="confirm__confirm-btn" @click="$emit('confirm')">确定</button>
        </div>
      </div>
    </alert>
  </transition>
</template>
  

<script>
  var Alert = require('component/Alert.vue')

  export default {
    components: {
      Alert
    }
  }
</script>
<style>
.confirm__confirm-btn,
.confirm__cancel-btn{
  display: inline-block;
  font-size: 14px;
  padding: 0 30px;
  height: 30px;
  border:none;
  text-align: center;
  border-radius: .05rem;
}
.confirm__confirm-btn{
  background-color: #fd9809;
  color: #fff;
}
.confirm__cancel-btn{
  margin-right: .22rem;
  background-color: #e8ecf0;
  color: #333;
}
</style>