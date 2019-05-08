<template>
  <div class="data-fetcher">
    <slot :data="data" />
  </div>
</template>

<script>
import { fetchModel } from '@/service/api'
export default {
  props: {
    config: {
      type: [Object, Array]
    }
  },
  data () {
    return {
      data: Array.isArray(this.config) ? fillEmptyObj(this.config.length) : {}
    }
  },
  mounted () {
    var isMulti = Array.isArray(this.config)
    var config = isMulti ? this.config : [this.config]

    var len = config.length
    var loaded = 0
    var res = []

    config.forEach((item, i) => {
      fetchModel(item.key, item.id).then(
        ({ data }) => {
          loaded++
          res[i] = data.data
          if (loaded === len) {
            this.data = isMulti ? res : res[0]
          }
        },
        e => {
          this.$emit('error', e)
        }
      )
    })
  }
}

function fillEmptyObj (len) {
  var res = []
  for (var i = 0; i < len; i++) {
    res.push({})
  }
  return res
}
</script>

<style scoped></style>
