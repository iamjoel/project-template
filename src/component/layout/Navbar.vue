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
            <li><a href="./login.html">登出</a></li>
            <li><a href="javascript:void(0);" @click="toggleLan">语言/language: {{showLanName}}</a></li>
          </ul>
        </div>
      </div>
    </nav>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  methods: {
    toggleLan() {
      var nextLan = this.currLan === 'ch' ? 'en' : 'ch'
      this.$store.dispatch('updateCurrLan', nextLan)
    }
  },
  computed: {
    ...mapGetters(['currLan']),
    showLanName(){
      return this.currLan === 'ch' ? 'English' : '中文'
    }
  }
}
</script>

<style scoped>
.navbar{
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 2;
  border-radius: 0;
  margin-bottom: 0;
  box-shadow: 0 1px 0 hsla(0,0%,86%,.3);
}
</style>