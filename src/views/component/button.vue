<template>
  <div class="wrap">
    <h3>颜色</h3>
    <ui-button>默认按钮</ui-button>
    <ui-button type="success">Success</ui-button>
    <ui-button type="danger">Danger</ui-button>
    <h3>尺寸</h3>
    <ui-button type="success" size="large">large</ui-button>
    <ui-button type="success" size="small">small</ui-button>
    <h3>禁用</h3>
    <ui-button type="success" disabled>large</ui-button>
    <h3>点击事件</h3>
    <ui-button @click="clickBtn">点我</ui-button>
  </div>
</template>

<script>
  import Button from 'component/Button.vue'
  import toastr from 'toastr'

  export default {
    components: {
      uiButton: Button
    },
    methods: {
      clickBtn() {
        toastr.info(`Button clicked`)
      }
    }
  }
</script>

