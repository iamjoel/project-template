<template>
  <div class="main">
    <van-search placeholder="请输入xxx" v-model="searchInput" @search="onSearch"/>
    <van-notice-bar
      text="足协杯战线连续第2年上演广州德比战，上赛季半决赛上恒大以两回合5-3的总比分淘汰富力。"
      left-icon="chat"
    />
    <div class="swipe mb-10rem">
      <van-swipe :autoplay="3000" class="h-100per ta-c">
        <van-swipe-item v-for="i in 4" :key="i">
          <img class="img" :src="'http://via.placeholder.com/200x100?text=' + i"/>
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="ly ly-c ly-multi nav">
      <a href="javascript:void(0)" @click="$router.push('/demo/form')" class="nav__item">
        <van-icon name="records" />
        <div class="mt-10 ta-c">表单</div>
      </a>
      <a href="javascript:void(0)" @click="$router.push('/demo/list')" class="nav__item">
        <van-icon name="wap-nav" />
        <div class="mt-10 ta-c">无限加载</div>
      </a>
      
      <a href="javascript:void(0)" @click="$router.push('/demo/pull-refresh')" class="nav__item">
        <van-icon name="upgrade" />
        <div class="mt-10 ta-c">下拉刷新</div>
      </a>
      <a href="javascript:void(0)" @click="$router.push('/demo/tree-select')" class="nav__item">
        <van-icon name="records" />
        <div class="mt-10 ta-c">分类选择</div>
      </a>

      <a href="javascript:void(0)" @click="$router.push('/demo/lazyload')" class="nav__item">
        <van-icon name="photo" />
        <div class="mt-10 ta-c">懒加载</div>
      </a>
      <a href="javascript:void(0)" @click="$router.push('/demo/img-preview')" class="nav__item">
        <van-icon name="photo" />
        <div class="mt-10 ta-c">图片预览</div>
      </a>
    </div>
    
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeTypeIndex: 0,
      searchInput: '',
    }  
  },
  methods: {
    onSearch() {
      this.$showLoading()
      setTimeout(()=> {
        this.$hideLoading()
      }, 2000)
    }
  }
}
</script>

<style scoped>
  .swipe {
    height: 3rem;
  }
  .img {
    display: block;
    width: 100%;
    height: 100%;
  }
  .nav__item {
    margin-right: .1rem;
    margin-bottom: .2rem;
    width: 1.5rem;
    color: inherit;
  }
  .nav__item  i{
    display: block;
    font-size: 24px;
    text-align: center;
  }
</style>