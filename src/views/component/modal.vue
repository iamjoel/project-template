<template>
<div class="main-container">
  <button @click="showAlert=true">弹出 Alert框</button>
  <alert v-if="showAlert" width="250px" @hide="showAlert = false">
    自定义内容
  </alert>
  <button @click="showConfirm=true">弹出 Confirm框</button>
  <confirm v-if="showConfirm" @hide="showConfirm = false" @confirm="confirmed()">准备好了？</confirm>
</div>

</template>

<script>
  import Alert from 'component/Alert.vue'
  import Confirm from 'component/Confirm.vue'

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
