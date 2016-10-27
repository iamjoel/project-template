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
          <!-- <ul id="menu" class="nav navbar-nav navbar-right">
            <li><a href="javascript:void(0);" @click="$changeLan('Ch')">中文</a></li>
            <li><a href="javascript:void(0);" @click="$changeLan('En')">English</a></li>
          </ul> -->
        </div>
      </div>
    </nav>
</template>
<script>
</script>

<style scoped>
.navbar{
  position: relative;
  z-index: 2;
  border-radius: 0;
  margin-bottom: 0;
  box-shadow: 0 1px 0 hsla(0,0%,86%,.3);
}
</style>