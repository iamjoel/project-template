<template>
  <div id="app">
    <van-nav-bar
      v-if="header.isShow"
      :title="header.title"
      leftText="返回"
      leftArrow
      @clickLeft="$router.go(-1)"
    />
    <router-view></router-view>
    <van-tabbar v-model="activeTypeIndex" v-show="$store.state.isShowFooter">
      <van-tabbar-item icon="wap-home" url="#/">首页
      </van-tabbar-item>
      <van-tabbar-item icon="wap-nav" url="#/classify-list">分类</van-tabbar-item>
      <van-tabbar-item icon="gift" url="#/cart">购物车</van-tabbar-item>
      <van-tabbar-item icon="contact" url="#/member-center">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>

export default {
  name: 'app',
  data() {
    return {
    }
  },
  computed: {
    activeTypeIndex: {
      get() {
        return this.$store.state.activeTypeIndex
      },
      set(val) {
        this.$store.dispatch('changeActiveType', parseInt(val, 0))
      }
    },
    header() {
      var res = {...this.$route.meta} || {}
      res.isShow = !!res.title
      return res
    }
  },
  watch: {
    // 控制底部Tab的高亮，和消隐
    ['$route.path']() {
      this.pathChange()
    }
  },
  mounted() {
    this.pathChange()
  },
  methods: {
    pathChange() {
      var meta = this.$route.meta || {}
      if(meta.isShowFooter === undefined) {
        meta.isShowFooter = true
      }
      this.$store.dispatch('changeFooterVisible', meta.isShowFooter)

      if(meta.activeTypeIndex !== undefined) {
        this.$store.dispatch('changeActiveType', parseInt(meta.activeTypeIndex, 10))
      }
      // console.log(JSON.stringify(meta))
    }
  }
};
</script>
<style src="@/assets/vendor/reset.css"></style>
<style src="css-utils-collection"></style>
<style src="@/assets/common.css"></style>

