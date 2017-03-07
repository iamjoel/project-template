 <!-- 参考这种写法
 http://element.eleme.io/#/zh-CN/component/table -->
<template>
  
</template>

<script>
  
</script>

<style lang="sass">
  .table-center th, .table-center td {
      text-align: center;
  }
  .table thead {
      height: 38px;
      color: #3e3e3e;
      font: bold 13px Microsoft Yahei;
      background: linear-gradient(to bottom,#f2f2f2,#e5e5e5);
  }
  .table-grid th:first-child{
    width: 60px;
  }
  .operate-col{
    padding-left: 20px !important;
    padding-right: 20px !important;
    text-align: left !important;
  }
  %caret{
    display: inline-block;
    width: 0;
    height: 0;
    margin-left: 2px;
    vertical-align: middle;
    border-top: 4px dashed;
    border-right: 4px solid transparent;
    border-left: 4px solid transparent;
  }
  .order-asc,.order-desc,.order-default{
    cursor: pointer;
  }
  .order-asc .order-icon{
    @extend %caret;
    position: relative;
    top: -4px;
    transform: rotate(180deg);
  }
  .order-desc .order-icon{
    @extend %caret;
  }
  .order-default .order-icon{
    position: relative;
    display: inline-block;
    width: 8px;

    &:before, &:after{
      content: '';
      position: absolute;
      left: 0;
      @extend %caret;
      border-top-color: #999;
    }
    &:before{
      top: -9px;
      transform: rotate(180deg);
    }
    &:after{
      top: -2px;
    }
  }
</style>