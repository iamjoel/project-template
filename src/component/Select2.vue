<template>
  <select :style="{width: width}" >
    <slot></slot>
  </select>
</template>

<script>
  // 在 app.js 已经注入全局的 jQuery了
  require('select2')
  export default {
    props: {
      options: {
        type: Array
      },
      value: {},
      width: {
        default: '100%'
      },
      multiple: {
        default: false,
        type: Boolean
      },
    },
    template: '#select2-template',
    mounted: function () {
      var vm = this
      var $select = $(this.$el)

      $select
        .prop('multiple', this.multiple)
        .select2({ data: this.options})
        .on('change', function () {
          var value = $select.val()
          if(value === '不限') {
            value = ''
          }
          vm.$emit('change', value)
          // vm.$emit('input', this.value) 用 v-model 发现有问题。会被重置
        })

        $select.val(this.value).trigger('change.select2')
    },
    watch: {
      value: function (value) {
        $(this.$el).val(value).trigger('change.select2')
      },
      options: function (options) {
        $(this.$el).select2({ data: options })
      }
    },
    destroyed: function () {
      $(this.$el).off().select2('destroy')
    }
  }
</script>
<style src="select2/dist/css/select2.min.css"></style>
<style>
</style>