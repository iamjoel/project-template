<template>
  <div :id="id" class="ztree"></div>
</template>

<script>
  // http://www.treejs.cn/v3/api.php
  require('../vendor/ztree/jquery.ztree.all-3.5.min')

  export default{
    data() {
      return {
        id: Date.now()
      }
    },
    mounted() {
      var vm = this
      var setting = {
        check: {
          enable: true,
          chkboxType: { "Y": "s", "N": "ps" } // 选择级联的设置
        },
        view: {
          showIcon: false
        },
        data: {
          simpleData: {
            enable: true
          }
        },
        callback: {
          onClick: function (event, treeId, nodeData) {
            vm.$emit('click', ...arguments)
          },
          onCheck: function () {
            vm.$emit('check', ...arguments)
          }
        }
      }
      var data = [
        {id: 1, pId: false, name: '中国'},
        {id: 2, pId: 1, name: '江苏'},
        {id: 21, pId: 2, name: '苏州'},
        {id: 22, pId: 2, name: '南京'},
        {id: 3, pId: 1, name: '上海'},
      ]
      // debugger
      var tree = $.fn.zTree.init($(`#${this.id}`), setting, data)
      this.$emit('ready', tree)

    }
  }
</script>
<style src="../vendor/ztree/zTreeStyle.css"></style>
