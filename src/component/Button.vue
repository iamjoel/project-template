<template>
  <button :class="classList" :disabled="disabled" @click="click"><slot></slot></button>
</template>

<script>
  var buttonTypeArr = ['default', 'primary', 'success', 'warning', 'info', 'danger']
  var buttonSizes = {
    'large': 'lg',
    'small': 'sm'
  }
  export default {
    props: {
      type: {
        type: String,
        default: 'default'
      },
      size: {
        type: String,
        default: ''
      },
      disabled: Boolean
      // TODO Bootstrap 没有 幽灵按钮的 UI
    },
    computed: {
      classList(){
        var res = ['btn']
        if(buttonTypeArr.indexOf(this.type) !== -1) {
          res.push(`btn-${this.type}`)
        } else {
          console.warn(`invalid type:${this.type}`)
        }
        if(this.size) {
          if(buttonSizes[this.size]){
            res.push(`btn-${buttonSizes[this.size]}`)
          } else {
            console.warn(`invalid size:${this.size}`)
          }
        }
        return res
      }
    },
    methods: {
      click() {
        this.$emit('click')
      }
    }
  }
</script>