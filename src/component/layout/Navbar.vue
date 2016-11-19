<template>
  <nav class="navbar navbar-default" role="navigation">
      <div class="container-fluid">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
            <span class="sr-only">切换导航</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">{{ $t('title') }}</a>
        </div>
        <div class="collapse navbar-collapse navbar-ex1-collapse">
          <ul id="menu" class="nav navbar-nav navbar-right">
            <li><a @click="loginout" href="javascript:void(0);">{{$t('loginout')}}</a></li>
            <li class="lan-wrap"><a href="javascript:void(0);" @click="showChooseLan = true">{{showLanName}}<span class="caret"></span></a>
              <expanding>
                <ul class="dropdown-menu" v-show="showChooseLan">
                  <li><a href="javascript:;" @click="updateLan('ch')">中文</a></li>
                  <li><a href="javascript:;" @click="updateLan('en')">English</a></li>
                </ul>
              </expanding>
            </li>
          </ul>
        </div>
      </div>
    </nav>
</template>
<script>
import Expanding from 'component/Expanding.vue'
import { mapGetters } from 'vuex'
import store from 'store'

export default {
  data() {
    return {
      showChooseLan: false
    }
  },
  components: {
    Expanding
  },
  methods: {
    updateLan(lan) {
      this.$store.dispatch('updateCurrLan', lan)
      this.showChooseLan = false
    },
    loginout() {
      store.remove('sessionid')
      location.href = './login.html'
    }
  },
  computed: {
    ...mapGetters(['currLan']),
    showLanName(){
      return this.currLan === 'ch' ? '中文' : 'English'
    }
  },
  locales: {
    ch: {loginout: '登出'},
    en: {loginout: 'Login out'},
  }
}
</script>

<style scoped lang="sass">
.navbar{
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 2;
  border-radius: 0;
  margin-bottom: 0;
  box-shadow: 0 1px 0 hsla(0,0%,86%,.3);
}
.dropdown-menu{
  display: block;
}
</style>