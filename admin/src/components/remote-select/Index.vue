<template>
  <div class="main">
    <el-select v-model="inputVal" placeholder="请选择" filterable remote :remote-method="fetch" @change="$emit('change')" clearable>
      <el-option
        v-for="item in list"
        :key="item.id"
        :label="item.name"
        :value="item.id"

        >
      </el-option>
    </el-select>
  </div>
</template>

<script>
import { fetchList } from '@/service/api'

export default {
  props: {
    urlKey: String,
    otherQuery: null,// 调列表接口的其他查询参数
    autoFetch: Boolean,
    value: String // v-model
  },
  data() {
    return {
      list: [],
      inputVal: null
    }  
  },
  watch: {
    inputVal() {
      this.$emit('input', this.inputVal + '') // 让 v-model 生效
    }
  },
  methods: {
    fetch(name) {
      // debugger
    //   this.list = [{
    //     uuid: '1',
    //     name: 'test'
    //   }]
      var otherQuery
      if(typeof this.otherQuery === 'function') {
        otherQuery = this.otherQuery()
      } else {
        otherQuery = this.otherQuery
      }
      fetchList(this.urlKey, {name: name, ...otherQuery}, {
        current: 1,
        limit: 20
      }, null).then(res => {
        this.list = res.data.data.list.map(item => {
          return {
            id: item.id || item.key,
            name: item.name || item.label
          }
        })
      })
    },
    setVal(value) {
      this.inputVal = value
    }
  },
  mounted() {
    this.inputVal = this.value
    if(this.autoFetch) {
      this.fetch()
    }
  }
}
</script>

<style></style>