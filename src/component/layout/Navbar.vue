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
          <a class="navbar-brand" href="#">Joy</a>
        </div>
        <div class="collapse navbar-collapse navbar-ex1-collapse">
          <ul id="menu" class="nav navbar-nav navbar-right">
            
            <!-- <li><a href="javascript:void(0);" @click="changeLan">{{lanText}}</a></li> -->
          </ul>
        </div>
      </div>
    </nav>
</template>
<script>
// var languageHelper = require('language-helper')
// var defaultLan = require('setting').language.default
// export default {
//   data () {
//     return {
//       currLanguage: defaultLan
//     }
//   },
//   computed: {
//     lanText () {
//       return this.currLanguage === 'Ch' ? '中文' : 'English'
//     }
//   },
//   methods: {
//     lan (key) {
//       var currLanguage = this.currLanguage
//       return currLanguage === defaultLan ?
//         key : (languageHelper.get(currLanguage)[key] || key)
//     },
//     changeLan () {
//       if(this.currLanguage === 'Ch'){
//         this.currLanguage = 'En'
//       } else {
//         this.currLanguage = 'Ch'
//       }
//     }
//   }
// }
</script>

<style>
.navbar{
  border-radius: 0;
}
</style>