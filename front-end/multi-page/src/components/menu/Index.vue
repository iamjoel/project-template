<template>
  <div class="header">
    <div class="ly ly-j">
      <div>Logo</div>
      <ul class="ly">
        <li v-for="item in linkConfig" :key="item.key">
          <a 
            class="nav" :href="item.url"
            :class="{
              'nav--curr': curr === item.key
            }"
          >
            {{item.name}}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
var linkConfig = [{
  key: 'home',
  name: '首页',
  url: 'index.html'
},{
  key: 'news',
  name: '新闻中心',
  url: 'news.html'
},{
  key: 'about',
  name: '关于我们',
  url: 'about.html'
},]
export default {
  props: {
    curr: String
  },
  data() {
    return {
      linkConfig
    }
  },
  methods: {
    
  }
}
</script>

<style scoped>
.header {
  margin: 0 auto 20px;
  width: 1140px;
  height: 80px;
  line-height: 80px;
  padding: 0 10px;
  color: #409eff;
  border-bottom: 1px solid #dcdfe6;
}

.nav {
  padding-left: 20px;
  text-decoration: none;
  color: inherit;
  opacity: .5;
}

.nav:hover,
.nav--curr {
  opacity: 1;
}

</style>