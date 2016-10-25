<template>
<div class="test">aaa <span class="inner">bbb</span></div>
</template>
<style>
$orange: #f60;
/* postcss 的mixin 都是用的这个插件 https://github.com/postcss/postcss-mixins */
/*
不支持 $height: $width
*/
@define-mixin size $width:200px, $height:200px {
  width: $width;
  height: $height;
}

.test{
  @mixin size;
  background-color: #ddd;
  color: $orange;
  .inner{
    display: block;
    $h1: 100px;
    line-height: $h1/2;/*不支持...*/
    @mixin size 100px 100px;
    color: blue;
  }
}

/* 插值 */

</style>