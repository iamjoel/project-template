<template>
  <div class="main pos-r map-page">
    <a href="javascript:void(0)" class="return-btn"
      @click="$router.go(-1)">
      <van-icon name="arrow-left" />
    </a>
    <div id="map-container" class="pos-r">
    </div>
    <div class="nav ly ly-j ly-m" v-if="$route.params.name">
      <div class="nav__des">
        <div class="nav__name t-ddd">{{$route.params.name}}</div>
        <div class="nav__address t-ddd">{{$route.params.address}}</div>
      </div>
      <a :href="getMapJumpUrl()" title="导航" class="nav__btn"></a>
    </div>
  </div>
</template>

<script>
var mapUrl = 'http://api.map.baidu.com/marker?location={loc}&title={name}&content={address}&output=html'
export default {
  data() {
    return {

    }  
  },
  methods: {
    getMapJumpUrl() {
       var mapJumpUrl = mapUrl
        .replace('{loc}', [this.$route.params.lat, this.$route.params.lng].join(','))
        .replace('{name}', encodeURIComponent(this.$route.params.name))
        .replace('{address}', encodeURIComponent(this.$route.params.address))
      console.log(mapJumpUrl)
      return mapJumpUrl
    }
  },
  mounted() {
    var map = new BMap.Map("map-container")
    // map/120.614/31.3661
    var point = new BMap.Point(this.$route.params.lng, this.$route.params.lat)
    map.centerAndZoom(point, 15)
    var marker = new BMap.Marker(point)
    map.addOverlay(marker)

    this.getMapJumpUrl()
  }
}
</script>

<style>
  .map-page .van-icon-arrow-left {
    font-size: 18px;
    font-weight: bold;
    color: #fff;
  }
  

</style>
<style scoped>
  .return-btn {
    position: absolute;
    left: .2rem;
    top: .2rem;
    z-index: 100;
    padding: .1rem;
    background-color: #ddd;
  }

  #map-container {
    height: 100vh;
  }

  .nav {
    position: fixed;
    z-index: 100;
    bottom: 0;
    left: 0;
    box-sizing: border-box;
    width: 100%;
    padding:.2rem .4rem;
    background-color: #fff;
  }
  .nav__name, .nav__address {
    box-sizing: border-box;
    width: 4.5rem;
  }
  .nav__name {
    margin-bottom: .05rem;
    line-height: .4rem;
    padding-left: .3rem;
    background: url(./images/map-icon.png) 0 center no-repeat;
    background-size: .26rem .34rem;
    font-size: 14px;
    font-weight: 700;
    color: #ff6432;
    height: .4rem;
  }
  .nav__address {
    font-size: 12px;
    line-height: 1.2;
    color: #000;
  }
  .nav__btn {
    width: 1rem;
    height: 1rem;
    background: url(./images/nav-btn.png) no-repeat;
    background-size: 100% 100%;
  }

</style>