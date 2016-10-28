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
    <grid :data="list" :cols="cols" :operates="operates" @edit="edit" @x="x">
    </grid>
    <!-- <pager :total="" :curr="" @pageTo=""></pager> -->
  </div>
</div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import SearchCondition from 'component/SearchCondition.vue'
  import Grid from 'component/Grid.vue'

  // 结果类别
  const cols = [{
    name: 'name',
    label: '歌名'
  },{
    name: 'singer',
    label: '歌手',
    html(singer, rowData) {
      return singer ? `<a target="_blank" href="">${singer}</a>` : singer
    },
    click(rowData, scope) {
      console.log(rowData.name, scope.$route)
      scope.$route.router.go(`song/song-edit/1`)
      // scope.$route 做页面跳转之类的
    }
  },{
    name: 'url',
    label: '播放',
    html(url, rowData) {
      return url ? `<a target="_blank" href="${url}">播放</a>` : '无来源'
    }
  }]
  // 对数据的操作
  const operates = ['edit', 'delete', {
    html: `<button>自定义操作</button>`,
    event: 'x'
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
        // console.log(`${rowData.name} 被编辑`)
        // this.$route.router.go(`song/song-edit/1`)
        // this.$route.router.go(`song/song-edit/1`)
      },
      x(rowData) {
        console.log(`${rowData.name}： 自定义操作`)
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