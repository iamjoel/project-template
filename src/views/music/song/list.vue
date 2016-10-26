<template>
<div class="search">
  <div class="form">
    <div class="row">
      <search-item name="歌名">
        <slot>
          <input class="form-control" type="text" v-model="searchObj.name">
        </slot>
      </search-item>
      <search-item name="演唱者">
        <slot>
          <input class="form-control" type="text" v-model="searchObj.singer">
        </slot>
      </search-item>      
    </div>
  </div>
  <div class="row">
    <div class="col-md-1 col-md-offset-11">
      <button type="button" class="btn btn-primary search-btn pull-right" @click="search()">搜索</button>
    </div>
  </div>

  <div class="result">
    <table class="table table-hover table-striped">
  <thead>
    <tr>
      <th>歌名</th>
      <th>歌手</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="item in list">
      <td>{{item.name}}</td>
      <td>{{item.singer}}</td>
    </tr>
  </tbody>
</table>
  </div>
</div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import SearchItem from 'component/SearchItem.vue'
  export default {
    data() {
      return {
        searchObj: {
          name: '',
          singer: ''
        }
      }
    },
    components: {
      SearchItem
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
</style>