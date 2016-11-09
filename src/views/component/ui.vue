<template>
  <div class="wrap">
    <h3>按钮</h3>
    <h4>颜色</h4>
    <ui-button>默认按钮</ui-button>
    <ui-button type="success">Success</ui-button>
    <ui-button type="danger">Danger</ui-button>
    <h4>尺寸</h4>
    <ui-button type="success" size="large">large</ui-button>
    <ui-button type="success" size="small">small</ui-button>
    <h4>禁用</h4>
    <ui-button type="success" disabled>large</ui-button>
  
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

    <h3>日历选择框</h3>
    <datepicker @change="updateDate" :value="date" :option="{timepicker:false, format: 'Y/m/d'}"></datepicker><br>
    选中日期：{{date}}
    <h3>时间选择框</h3>
    <datepicker @change="updateTime" :value="time"></datepicker><br>
    选中时间：{{time}}

    <h2>树形控件</h2>
    <tree @click="treeClick" @check="treeUpdate" @ready="treeInit"></tree>
    选中节点：{{selectedTreeNode}}
    <h2>收起展开效果</h2>
    <expanding> 
      <div v-show="isExpand" class="block"></div>
    </expanding>{{isExpand}}
    <button @click="toggle">收起/展开</button>
    
  </div>

</template>
<script>
  import Button from 'component/Button.vue'
  import Alert from 'component/Alert.vue'
  import Confirm from 'component/Confirm.vue'
  import Modal from 'component/Modal.vue'
  import toastr from 'toastr'
  import Select2 from 'component/Select2.vue'
  import Datepicker from 'component/Datepicker.vue'
  import moment from 'moment'
  import Tree from 'component/Tree.vue'
  import Expanding from 'component/Expanding.vue'

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
        date: '2008-8-8',
        time: '2016-8-8 15:30:31',
        tree: {},
        selectedTreeNode: [],
        isExpand: false
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
      },
      updateDate(val){
        this.date = moment(val).format('YYYY-MM-DD')
      },
      updateTime(val){
        this.time = moment(val).format('YYYY-MM-DD hh:mm:ss')
      },
      treeInit(tree){
        this.tree = tree
      },
      treeUpdate() {
        this.selectedTreeNode = this.tree.getCheckedNodes().map(each => each.name)
      },
      treeClick() {
        console.log(`treeClick ${arguments}`)
      },
      toggle() {
        this.isExpand = !this.isExpand
      }
    },
    components: {
      uiButton: Button,
      Alert,
      Confirm,
      Modal,
      Select2,
      Datepicker,
      Tree,
      Expanding
    },
  }
</script>
<style scoped>
  .wrap {
    padding-bottom: 100px;
  }
  .block{
    height:200px;
    width:200px;
    background:#f60;
  }
</style>