<template>
  <div class="main">
    <h2>获取单个数据</h2>
    <DataFetcher 
      :config="{key: 'care_service', id: '238af993-3b3d-486d-87a9-88af472ec168'}">
      <template slot-scope="scope">
        {{scope.data.name}}
      </template>
    </DataFetcher>
  </div>
</template>

<script>
import DataFetcher from '@/components/data-fetcher'
export default {
  components: {
    DataFetcher,
  },
  data() {
    return {
    }  
  },
  methods: {
  }
}
</script>

<style scoped></style>