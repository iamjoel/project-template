<template>
  <div class="img-badge">
    <img class="img-badge__img" :src="imgUrl" alt=""
      :style="{
        width: imgWidth,
        height: imgHeight,
      }">
    <div :class="[postionClassName]">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    postion: {
      type: String,
      default: 'top-left'
    },
    imgUrl: {
      default: 'http://via.placeholder.com/100x100'
    },
    imgWidth: {
      default: '100%'
    },
    imgHeight: {
      default: 'auto'
    },
  },
  data() {
    return {
      postionClassName: ''
    }
  },
  mounted() {
    this.postionClassName = {
      'top-left': 'pos-tl',
      'top-right': 'pos-tr',
      'bottom-left': 'pos-bl',
      'bottom-right': 'pos-br',
    }[this.postion]
  }
}
</script>

<style scoped>
.img-badge {
  position: relative;
}

.img-badge__img {
  display: block;
  max-width: 100%;
}
</style>