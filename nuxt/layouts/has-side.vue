<template>
  <div class="container ly ly-j">
    <div class="main">
      <nuxt/>
    </div>
    <div class="right">
      右侧内容
    </div>
  </div>
</template>

<style>
.container {
  width: 80%;
  margin: 0 auto;
}
.main {
  margin-left: 10px;
  flex-grow: 1;
}
.right {
  width: 200px;
}
</style>

