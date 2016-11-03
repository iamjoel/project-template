<template>
  <div>
    <h3>弹出框</h3>
    <button @click="showAlert=true">弹出 Alert框</button>
    <alert v-if="showAlert" width="250px" @hide="showAlert = false">
      自定义内容
    </alert>
    <button @click="showConfirm=true">弹出 Confirm框</button>
    <confirm v-if="showConfirm" @hide="showConfirm = false" @confirm="confirmed()">准备好了？</confirm>
    <button @click="showModal=true">弹出模态框</button>
    <modal v-if="showModal" @hide="showModal = false" @confirm="modalConfirm">我是模态框~</modal>
    <h3>显示提示信息</h3>
    <button @click="showToast('success')">success</button>
    <button @click="showToast('error')">error</button>
    <button @click="showToast('info')">info</button>
    <button @click="showToast('warning')">warning</button>

    <h3>下拉框</h3>
    <label>
      单选框<br>
      <select2 @change="updateFruit" :options="allFruits" :value="'pine'" width="200px"></select2>
    </label>
    <div>选中值：{{fruit}}</div>
    <label>
      多选框<br>
      <select2 @change="updateFruits" :options="allFruits" :multiple="true" width="200px"></select2>
    </label>
    <div>选中值：{{fruits}}</div>
    <button @click="addFruit">增加下拉框选项</button>
  </div>

</template>
<script>
  import Alert from 'component/Alert.vue'
  import Confirm from 'component/Confirm.vue'
  import Modal from 'component/Modal.vue'
  import toastr from 'toastr'
  import Select2 from 'component/Select2.vue'

  var i = 0
  export default {
    data(){
      return {
        showAlert: false,
        showConfirm: false,
        showModal: false,
        fruit: 'apple',
        fruits: '',
        allFruits: [
          { id: 'apple', text: '苹果'},
          { id: 'pine', text: '梨'},
          { id: 'water melon', text: '西瓜'},
          { id: 'pineapple', text: '菠萝'},
        ],
      }
    },
    methods: {
      confirmed() {
        console.log('confirmed!')
        this.showConfirm = false
      },
      modalConfirm() {
        console.log('modal confirmed!')
        this.showModal = false
      },
      showToast(type) {
        toastr[type](`${type}信息：xxx`)
      },
      updateFruit(value) {
        this.fruit = value
      },
      updateFruits(value) {
        this.fruits = value
      },
      addFruit(){
        i++
        this.allFruits.push({
          id: 'fruit' + i,
          text: '新增水果' + i
        })
      }
    },
    components: {
      Alert,
      Confirm,
      Modal,
      Select2
    },
  }
</script>
