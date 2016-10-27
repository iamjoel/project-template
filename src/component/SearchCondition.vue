<template>
  <label :class="widthClass">
      <div class="col-lg-4">{{name}}</div>
      <div class="col-lg-8">
        <slot></slot>
      </div>
    </label>
</template>

<script>
  export default {
    props: {
      name: {
        required: true
      },
      width: {
        default: 4
      }
    },
    computed: {
      widthClass() {
        return `col-lg-${this.width}`
      }
    }
  }
</script>