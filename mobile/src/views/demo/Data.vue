<template>
  <div class="main">
    <h2>获取单个数据</h2>
    <DataFetcher 
      :config="{key: 'care_service', id: '238af993-3b3d-486d-87a9-88af472ec168'}">
      <template slot-scope="scope">
        接口1数据：{{scope.data.name}}
      </template>
    </DataFetcher>

    <h2>获取多个数据</h2>
    <DataFetcher 
      :config="[
        {key: 'care_service', id: '238af993-3b3d-486d-87a9-88af472ec168'},
        {key: 'single_service', id: '1'},
      ]">
      <template slot-scope="scope">
        接口1数据：{{scope.data[0].name}} <br>
        接口2数据：{{scope.data[1].name}}
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