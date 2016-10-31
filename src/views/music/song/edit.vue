<template>
<div class="detail">
  <div class="row">
    <label class="col-lg-12 detail__item">
        <div class="col-lg-3">歌名</div>
        <div class="col-lg-9">
            <input type="text" class="form-control" v-model="detail.name">
        </div>
    </label>
    <label class="col-lg-12 detail__item">
        <div class="col-lg-3">详情</div>
        <div class="col-lg-9">
            <textarea class="form-control" v-model="detail.detail"></textarea>
        </div>
    </label>
  </div>
  
</div>
</template>

<script>
  import {fetchDetail} from 'api/song'
  export default {
    data() {
      return {
        detail: {}
      }
    },
    created() {
      fetchDetail(this.$route.params.id).then((data)=>{
          this.detail = data
      })
    }
  }
</script>

<style scoped>
  .detail__item{
    margin: 10px 0;
  }
</style>

