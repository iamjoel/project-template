<template>
<div class="search">
  <div class="form">
    <div class="row">
      <search-condition name="歌名">
        <input class="form-control" type="text" v-model="searchCondition.name">
      </search-condition>
      <search-condition name="演唱者">
        <input class="form-control" type="text" v-model="searchCondition.singer">
      </search-condition>
      <search-condition name="风格">
        <select v-model="searchCondition.type" style="width:100%">
          <option value="">不限</option>
          <option value="rock">摇滚</option>
          <option value="pop">流行</option>
          <option value="folk">民谣</option>
        </select>
      </search-condition>
    </div>
  </div>
  <div class="row">
    <div class="col-md-1 col-md-offset-11">
      <button type="button" class="btn btn-primary search-btn pull-right" @click="search()">搜索</button>
    </div>
  </div>

  <div class="result">
    <super-grid :searchCondition="searchCondition" :gridConfig="gridConfig" :list="list" :pager= "pager" @edit="edit" @search="search"></super-grid>
  </div>


</div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import SearchCondition from 'component/SearchCondition.vue'
  import Grid from 'component/Grid.vue'
  import Pager from 'component/Pager.vue'
  import SuperGrid from 'component/SuperGrid.vue'
  import router from 'router'
  import {fetchList} from 'api/song'

  // 结果类别
  const cols = [{
    name: 'name',
    label: '歌名'
  },{
    name: 'singer',
    label: '歌手',
    html(singer, rowData) {
      return singer.id ? `<a target="_blank" href="javascript:void(0)">${singer.name}</a>` : singer.name
    },
    click(rowData) {
      if(rowData.singer.id) {

      }
    }
  }]
  // 对数据的操作
  const operates = ['edit', 'delete', {
    html(rowData) {
      return rowData.url ? `<button>播放</button>` : ''
    },
    event: 'play'
  }]
  export default {
    data() {
      return {
        searchCondition: {
          name: '',
          singer: '',
          type: ''
        },
        pager:{
          current: 1,
          total: 10,
          limit: 5
        },
        gridConfig: {
          cols, operates
        },
        list: []
      }
    },
    components: {
      SearchCondition,
      SuperGrid
    },
    methods: {
      search(condition) {
        fetchList(condition).then(function (data) {
          this.list = data.data
          this.pager = data.pager
        }.bind(this))
      },
      edit(rowData) {
        router.push({name: 'song-edit', params: { id: rowData.id }})
      },
      play({url}) {
        url && (location.href = url)
      },
      pageTo(pageNum){
        this.pager.current = pageNum
      }
    }
  }
</script>

<style scoped>
  .search{
    label{
      text-align: right;
      line-height: 32px;
    }
    &-btn{

    }
  }

  .result{
    margin-top: 10px;
  }
</style>