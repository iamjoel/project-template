<template>
<transition name="modal">
  <div class="modal-mask" @click="$emit('hide')">
    <div class="modal-wrapper"  @click.stop="">
      <div class="modal" id="modal-id">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-hidden="true" @click="$emit('hide')">&times;</button>
              <h4 class="modal-title">{{title}}</h4>
            </div>
            <div class="modal-body">
              <slot></slot>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" @click="$emit('hide')">取消</button>
              <button type="button" class="btn btn-primary" @click="$emit('confirm')">确定</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</transition>
</template>

<script>

  export default {
   props: {
    title: {
      default: '模态框'
    }
   }
  }
</script>
<style>
.modal{
  display: block;
  .modal-dialog{
    margin-top: 20%;
  }
}
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
  font-size: 14px;
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