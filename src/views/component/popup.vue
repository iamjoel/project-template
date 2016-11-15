<template>
  <div class="wrap">
    <button @click="showAlert=true">弹出 Alert框</button>
    <alert v-if="showAlert" width="250px" @hide="showAlert = false">
      自定义内容
    </alert>
    <button @click="showConfirm=true">弹出 Confirm框</button>
    <confirm v-if="showConfirm" @hide="showConfirm = false" @confirm="confirmed()">准备好了？</confirm>
    <button @click="showModal=true">弹出模态框</button>
    <modal v-if="showModal" @hide="showModal = false" @confirm="modalConfirm">我是模态框~</modal>
    </div>
</template>

<script>
  import Alert from 'component/Alert.vue'
  import Confirm from 'component/Confirm.vue'
  import Modal from 'component/Modal.vue'
  import toastr from 'toastr'


  export default {
    components: {
      Alert,
      Confirm,
      Modal
    },
    data() {
      return {
        showAlert: false,
        showConfirm: false,
        showModal: false
      }
    },
    methods: {
      confirmed() {
        toastr.info('confirm confirmed!')
        this.showConfirm = false
      },
      modalConfirm() {
        toastr.info('modal confirmed!')
        this.showModal = false
      }
    }

  }
</script>