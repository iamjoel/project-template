<template>
<div class="search">
  <div class="form">
    <div class="row">
      <search-condition name="歌名">
        <input class="form-control" type="text" v-model.lazy.trim="searchCondition.name">
      </search-condition>
      <search-condition name="演唱者">
        <input class="form-control" type="text" v-model.lazy.trim="searchCondition.singer">
      </search-condition>
      <search-condition name="风格">
        <select2 :options="musicTypes" @change="musicTypeChange">
        </select2>
      </search-condition>
    </div>
  </div>
  <div class="row">
    <div class="col-md-1 col-md-offset-11">
      <button type="button" class="btn btn-primary search-btn pull-right" @click="search(true)">搜索</button>
    </div>
  </div>

  <div class="result">
    <super-grid :gridConfig="gridConfig" :list="list" @clickItem="clickItem" @edit="edit" @delete="deleteIt" @search="search" @play="play" ref="grid"></super-grid>
  </div>
  <modal v-if="showSingerModal" title="歌手简介" @hide="showSingerModal = false" @confirm="showSingerModal = false" >
    {{singerInfo.discribe}}
  </modal>


</div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import SearchCondition from 'component/SearchCondition.vue'
  import SuperGrid from 'component/SuperGrid.vue'
  import Modal from 'component/Modal.vue'
  import Select2 from 'component/Select2.vue'
  import router from 'router'
  import {fetchList} from 'api/song'
  import toastr from 'toastr'

  // 结果类别
  const cols = [{
    name: 'name',
    label: '歌名',
    order: {
      name:'name',
    }
  },{
    name: 'singer',
    label: '歌手',
    order: {
      name:'singer',
      type:'asc',// desc
      default: true
    },
    html(singer, rowData) {
      return singer.discribe ? `<a target="_blank" href="javascript:void(0)">${singer.name}</a>` : singer.name
    }
  }, {
    name: 'type',
    label: '风格',
    html(type, rowData) {
      return type
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
        list: [],
        showSingerModal: false,
        singerInfo: {},
        musicTypes: [
          {id: '', text: '不限'},
          {id: 'rock', text: '摇滚'},
          {id: 'pop', text: '流行'},
          {id: 'folk', text: '民谣'},
        ]
      }
    },
    components: {
      SearchCondition,
      SuperGrid,
      Modal,
      Select2
    },
    methods: {
      musicTypeChange(type) {
        this.searchCondition.type = type
      },
      search(isResetPager) {
        var grid = this.$refs.grid
        var searchCondition = this.searchCondition
        var pager = Object.assign({}, grid.getPagerInfo())
        if(isResetPager){
          pager.current = 1
        }

        var order = grid.getOrder()
        // debugger
        var queryObj = {searchCondition, pager, order}
        console.log(`查询歌曲列表中...条件：${JSON.stringify(queryObj)}`)
        fetchList(queryObj).then(function (data) {
          this.list = data.data
          grid.setPagerInfo(data.pager)
        }.bind(this))
      },
      clickItem({name, data}) {
        if(name === 'col-singer'){
           if(data.singer.discribe) {
            this.showSingerModal = true
            this.singerInfo = data.singer
          }
        }
      },
      edit(rowData) {
        router.push({name: 'song-edit', params: { id: rowData.id }})
      },
      deleteIt(rowData) {
        // Just for Test
        this.list = this.list.filter(item=> item.id !== rowData.id)
        toastr.success('删除成功')
      },
      play({url}) {
        url && (location.href = url)
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