<template>
  <div class="main">
    <van-tree-select
      :items="items"
      :main-active-index="mainActiveIndex"
      :active-id="activeId"
      @navclick="onNavClick"
      @itemclick="onItemClick"
    />
  </div>
</template>

<script>
var items = [
  {
    text: '所有城市',
    // 该导航下所有的可选项
    children: [
      {
        text: '北京',
        id: 1002
      },
      {
        text: '上海',
        id: 1001
      }
    ]
  },
  {
    text: '浙江',
    // 该导航下所有的可选项
    children: [
      {
        text: '温州',
        id: 2002
      },
      {
        text: '杭州',
        id: 2001
      }
    ]
  },
  {
    text: '江苏',
    // 该导航下所有的可选项
    children: [
      {
        text: '苏州',
        id: 3002
      },
      {
        text: '南京',
        id: 3001
      }
    ]
  }
]
export default {
  data() {
    return {
      items: items,
      // 左侧高亮元素的index
      mainActiveIndex: 0,
      // 被选中元素的id
      activeId: 1001
    };
  },
  methods: {
    onNavClick(index) {
      this.mainActiveIndex = index;
    },
    onItemClick(data) {
      this.activeId = data.id;
    }
  }
}
</script>

<style scoped></style>