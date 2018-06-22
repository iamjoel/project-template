<template>
  <div class="main">
    <h2>获取单个数据</h2>
    <DataFetcher 
      :config="{key: 'care_service', id: '238af993-3b3d-486d-87a9-88af472ec168'}">
      <template slot-scope="scope">
        接口1数据：\{{scope.data.name}}
      </template>
    </DataFetcher>

    <h2>获取多个数据</h2>
    <DataFetcher 
      :config="[
        {key: 'care_service', id: '238af993-3b3d-486d-87a9-88af472ec168'},
        {key: 'single_service', id: '1'},
      ]">
      <template slot-scope="scope">
        接口1数据：\{{scope.data[0].name}} <br>
        接口2数据：\{{scope.data[1].name}}
      </template>
    </DataFetcher>

    <h2>无限加载列表</h2>
    <van-cell-group>
      <ListFetcher key-id="skill">
        <template slot-scope="scope" v-if="scope.data">
          <van-cell :value="scope.data.name" />
        </template>
      </ListFetcher>
    </van-cell-group>

    <h2>非无限加载列表</h2>
    <van-cell-group>
      <ListFetcher key-id="skill" :is-infinate="false" :page-limit="2" :order="['name', 'desc']">
        <template slot-scope="scope" v-if="scope.data">
          <van-cell :value="scope.data.name" />
        </template>
      </ListFetcher>
    </van-cell-group>
  </div>
</template>

<script>
import DataFetcher from '@/components/data-fetcher'
import ListFetcher from '@/components/list-fetcher'
export default {
  components: {
    DataFetcher,
    ListFetcher
  },
  data() {
    return {
    }  
  },
  methods: {
  }
}
</script>

<style scoped>
h2 {
  font-size: 16px;
  font-weight: bold;
  line-height: 2;
}
</style>