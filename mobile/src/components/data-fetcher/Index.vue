<template>
  <div class="data-fetcher">
    <slot />
  </div>
</template>

<script>
import {fetchModel} from '@/service/api'
export default {
  props: {
    config: Array
  },
  data() {
    return {

    }
  },
  mounted() {
    var len = this.config.length
    var loaded = 0
    var res = []

    this.config.forEach((name, i) => {
      fetchModel(c).then(({data})=> {
        loaded++;
        res[i] = data
        if(loaded === len) {
          this.$emit('loaded', res)
        }
      })
    })
  }
}
</script>

<style scoped></style>