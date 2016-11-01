<template>
<transition name="modal">
  <div class="modal-mask" @click="$emit('hide')">
    <div class="modal-wrapper">
      <div class="modal-container" :style="{width: width}" @click.stop="">
        <div class="modal-header">
          <h3>
            <slot name="header">温馨提示</slot>
          </h3>
        </div>
        <div class="modal-body">
          <slot></slot>
        </div>
        <div class="modal-footer">
          <slot name="footer">
            <button class="modal-default-button" @click="$emit('hide')">
              确定
            </button>
          </slot>
        </div>
      </div>
    </div>
  </div>
</transition>

</template>

<script>
  export default {
    props: {
      width: {
        default: '250px'
      }
    }
  }
</script>

<style>
.modal-mask {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  font-size: 14px;
}

.modal-container {
  position: relative;
  z-index: 1000;
  width: 200px;
  margin: 0px auto;
  padding: 0 10px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .5s ease;
}

.modal-header h3 {
  margin: 0;
  height: 24px;
  line-height: 24px;
  font-size: 18px;
  color: #fd9809;
}

.modal-body {
  margin: .5rem 0;
}

.modal-default-button {
  display: block;
  margin: 0 auto;
  padding: 0 30px;
  height: 30px;
  border: none;
  background-color: #fd9809;
  color: #fff;
  text-align: center;
 }

.modal-enter,
.modal-leave {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

</style>