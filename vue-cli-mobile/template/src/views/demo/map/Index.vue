<template>
  <div class="main pos-r map-page">
    <a href="javascript:void(0)" class="return-btn"
      @click="$router.go(-1)">
      <van-icon name="arrow-left" />
    </a>
    <div id="map-container" class="pos-r">
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }  
  },
  methods: {
    
  },
  mounted() {
    var map = new BMap.Map("map-container")
    // map/120.614/31.3661
    var point = new BMap.Point(this.$route.params.lng, this.$route.params.lat)
    map.centerAndZoom(point, 15)
    var marker = new BMap.Marker(point)
    map.addOverlay(marker)
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
</style>