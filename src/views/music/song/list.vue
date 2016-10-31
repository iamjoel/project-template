<template>
<div class="search">
  <div class="form">
    <div class="row">
      <search-condition name="歌名">
        <input class="form-control" type="text" v-model="searchObj.name">
      </search-condition>
      <search-condition name="演唱者">
        <input class="form-control" type="text" v-model="searchObj.singer">
      </search-condition>
      <search-condition name="风格">
        <select v-model="searchObj.type" style="width:100%">
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
    <grid :data="list" :cols="cols" :operates="operates" @edit="edit" @play="play">
    </grid>
    <!-- <pager :total="" :curr="" @pageTo=""></pager> -->
  </div>
</div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import SearchCondition from 'component/SearchCondition.vue'
  import Grid from 'component/Grid.vue'
  import router from 'router'

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
        searchObj: {
          name: '',
          singer: '',
          type: ''
        },
        cols,
        operates
      }
    },
    components: {
      SearchCondition,
      Grid
    },
    methods: {
      search() {
        this.$store.dispatch('fetchSongList', this.searchObj)
      },
      edit(rowData) {
        router.push({name: 'song-edit', params: { id: rowData.id }})
      },
      play({url}) {
        url && (location.href = url)
      }
    },
    computed: mapGetters({
      list: 'songList'
    }),
    created() {
      this.search()
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