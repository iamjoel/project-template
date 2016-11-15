<template>
  <div class="wrap">
    <tree @click="treeClick" @check="treeUpdate" @ready="treeInit"></tree>
    选中节点：{{selectedTreeNode}}
  </div>
</template>

<script>
  import Tree from 'component/Tree.vue'
  import toastr from 'toastr'

  export default{
    data(){
      return {
        tree: {},
        selectedTreeNode: []
      }
    },
    methods: {
      treeInit(tree){
        this.tree = tree
      },
      treeUpdate() {
        this.selectedTreeNode = this.tree.getCheckedNodes().map(each => each.name)
      },
      treeClick(event, undefined, node) {
        toastr.info(`treeClick ${node.name}`)
      }
    },
    components: {
      Tree
    }
  }
</script>