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
  import Alert from 'component/Alert.vue'

  export default {
    components: {
      Alert
    }
  }
</script>
<style>
.confirm{
  &__btns{
    font-size: 0;
  }
  &__confirm-btn,
  &__cancel-btn{
    display: inline-block;
    font-size: 14px;
    padding: 0 30px;
    height: 30px;
    border:none;
    text-align: center;
  }
  &__confirm-btn{
    margin-left: 10px;
    background-color: #fd9809;
    color: #fff;
  }
  &__cancel-btn{
    background-color: #e8ecf0;
    color: #333;
  }
}

</style>