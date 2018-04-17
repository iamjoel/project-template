<template>
  <div id="app">
    <van-nav-bar
      v-if="header.isShow"
      :title="header.title"
      leftText="返回"
      leftArrow
      @click-left="$router.go(-1)"
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
import {urls} from '@/setting'
import * as types from '@/store/mutation-types'
import {Indicator} from 'mint-ui'

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
    },
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
    },
    fetchUserInfo(openid) {
      return this.$http.get(`${urls.userInfo}/${openid}`)
    },
    fetchOpenId(code) {
      if(!code) { // 本地没有 code
        return new Promise((resolve, reject) => {
          reject()
        })
      } else {
        return new Promise((resolve, reject) => {
          this.$http.get(urls.getOpenid + '/' + code).then(({data})=> {
            resolve(data.data)
          }, ()=> {
            reject()
          })
        })
      }
    }
  },
  created() {
    var vm = this
    
    var code = getQueryObject().code
    if(code) {
      Indicator.open('加载中...')
    }
    // var code = '001Y2c2Z0soQB22HNx4Z0pzc2Z0Y2c2V'
    this.fetchOpenId(code).then(openid => {

      vm.$store.commit(types.OPENID, openid)
      vm.fetchUserInfo(openid).then(({data}) => {
        data = data.data
        vm.$store.commit(types.USER_INFO, data)
        Indicator.close()
      }, ()=> {
        Indicator.close()
      })
    }, )
  }
};

function getQueryObject(url) {
    url = url == null ? window.location.href : url;
    var search = url.substring(url.lastIndexOf("?") + 1);
    var obj = {};
    var reg = /([^?&=]+)=([^?&=]*)/g;
    search.replace(reg, function (rs, $1, $2) {
        var name = decodeURIComponent($1);
        var val = decodeURIComponent($2);
        val = String(val);
        obj[name] = val;
        return rs;
    });
    return obj;
}
</script>
<style src="@/assets/vendor/reset.css"></style>
<style src="css-utils-collection"></style>
<style src="@/assets/common.css"></style>

