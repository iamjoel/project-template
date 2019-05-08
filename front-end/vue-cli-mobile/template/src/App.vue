<template>
  <div id="app">
    <div class="main">
      <router-view></router-view>
    </div>
    <van-tabbar v-model="activeTypeIndex" v-show="$store.state.isShowFooter">
      <van-tabbar-item icon="wap-home" url="#/">首页 </van-tabbar-item>
      <van-tabbar-item icon="wap-nav" @click="$toast('分类页')"
        >分类</van-tabbar-item
      >
      <van-tabbar-item icon="gift" @click="$toast('购物车')"
        >购物车</van-tabbar-item
      >
      <van-tabbar-item icon="contact" url="#/member-center"
        >我的</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
import { urls } from '@/setting'
import * as types from '@/store/mutation-types'

export default {
  name: 'app',
  data () {
    return {}
  },
  computed: {
    activeTypeIndex: {
      get () {
        return this.$store.state.activeTypeIndex
      },
      set (val) {
        this.$store.dispatch('changeActiveType', parseInt(val, 0))
      }
    },
    header () {
      var res = { ...this.$route.meta } || {}
      res.isShow = !!res.title
      return res
    }
  },
  watch: {
    // 控制底部Tab的高亮，和消隐
    ['$route.path'] () {
      this.pathChange()
    }
  },
  mounted () {
    this.pathChange()
  },
  methods: {
    pathChange () {
      var meta = this.$route.meta || {}

      document.title = meta.title || ''

      if (meta.isShowFooter === undefined) {
        meta.isShowFooter = true
      }
      this.$store.dispatch('changeFooterVisible', meta.isShowFooter)

      if (meta.isShowFooter) {
        document.body.classList.remove('no-foot-tabbar')
      } else {
        document.body.classList.add('no-foot-tabbar')
      }

      if (meta.activeTypeIndex !== undefined) {
        this.$store.dispatch(
          'changeActiveType',
          parseInt(meta.activeTypeIndex, 10)
        )
      }
    },
    fetchUserInfo (openid) {
      return this.$http.get(`${urls.wechat.userInfo}/${openid}`)
    },
    fetchOpenId (code) {
      if (!code) {
        // 本地没有 code
        return new Promise((resolve, reject) => {
          reject()
        })
      } else {
        return new Promise((resolve, reject) => {
          this.$http.get(urls.wechat.getOpenid + '/' + code).then(
            ({ data }) => {
              resolve(data.data)
            },
            () => {
              reject()
            }
          )
        })
      }
    }
  },
  created () {
    return
    this.$showLoading()
    var queryObject = getQueryObject()
    var code = queryObject.code
    if (code) {
      // 微信是 redirectUrl 上不支持 hash。
      if (queryObject.state && queryObject.state != 'STATE') {
        this.$router.push(queryObject.state)
      }
      this.fetchOpenId(code).then(data => {
        // 把用户信息也返回了
        vm.$store.commit(types.OPENID, data.openid)
        vm.$store.commit(types.USER_INFO, data)
        vm.$hideLoading()
      })
    } else {
      // 测试环境
      var openid = 'ozNc2xHa3VosLO9zsnsg31axOa2o' // 测试
      vm.$store.commit(types.OPENID, openid)
      vm.fetchUserInfo(openid)
    }
  }
}

function getQueryObject (url) {
  url = url == null ? window.location.href : url
  var search = url.substring(url.lastIndexOf('?') + 1)
  var obj = {}
  var reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, function (rs, $1, $2) {
    var name = decodeURIComponent($1)
    var val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}
</script>
<style src="@/assets/vendor/reset.css"></style>
<style src="css-utils-collection"></style>
<style src="@/assets/common.css"></style>
<style scoped>
.main {
  padding-bottom: 40px;
}
</style>
