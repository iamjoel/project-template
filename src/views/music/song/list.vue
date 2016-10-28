<template>
<div class="search">
  <div class="form">
    <div class="row">
      <search-condition name="歌名">
        <slot>
          <input class="form-control" type="text" v-model="searchObj.name">
        </slot>
      </search-condition>
      <search-condition name="演唱者">
        <slot>
          <input class="form-control" type="text" v-model="searchObj.singer">
        </slot>
      </search-condition>
      <search-condition name="风格">
        <slot>
            <select v-model="searchObj.type" style="width:100%">
              <option value="">不限</option>
              <option value="rock">摇滚</option>
              <option value="pop">流行</option>
              <option value="folk">民谣</option>
            </select>
        </slot>
      </search-condition>
    </div>
  </div>
  <div class="row">
    <div class="col-md-1 col-md-offset-11">
      <button type="button" class="btn btn-primary search-btn pull-right" @click="search()">搜索</button>
    </div>
  </div>

  <div class="result">
    <grid :data="list" :cols="cols"></grid>
    <!-- <pager :total="" :curr="" @pageTo=""></pager> -->
  </div>
</div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import SearchCondition from 'component/SearchCondition.vue'
  import Grid from 'component/Grid.vue'

  const COLS = [{
    name: 'name',
    label: '歌名',
    click(rowData, scope) {
      console.log(rowData.name, scope.$route)
      // scope.$route 做页面跳转之类的
    }
  },{
    name: 'singer',
    label: '歌手'
  },{
    name: 'url',
    label: '播放',
    html(url, rowData) {
      return url ? `<a target="_blank" href="${url}">播放</a>` : '无来源'
    }
  }]
  export default {
    data() {
      return {
        searchObj: {
          name: '',
          singer: '',
          type: ''
        },
        cols: COLS
      }
    },
    components: {
      SearchCondition,
      Grid
    },
    methods: {
      search() {
        this.$store.dispatch('fetchSongList', this.searchObj)
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