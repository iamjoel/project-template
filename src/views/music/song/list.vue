<template>
<div class="search">
  <div class="form">
    <div class="row">
      <label class="col-lg-4">
        <div class="col-lg-4">歌名</div>
        <div class="col-lg-8">
          <input class="form-control" type="text" v-model="searchObj.name">
        </div>
      </label>
      <label class="col-lg-4">
        <div class="col-lg-4">演唱者</div>
        <div class="col-lg-8">
          <input class="form-control" type="text" v-model="searchObj.name">
        </div>
      </label>
    </div>
  </div>
  <div class="row">
    <div class="col-md-1 col-md-offset-11">
      <button type="button" class="btn btn-primary search-btn pull-right">搜索</button>
    </div>
  </div>
</div>
</template>

<script>
  export default {
    data() {
      return {
        searchObj: {}
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
</style>