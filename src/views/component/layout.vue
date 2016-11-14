<template>
<div>
  <h2>默认</h2>
  <div class="ly">
    <div class="ly__item">A</div>
    <div class="ly__item">B</div>
    <div class="ly__item">C</div>
  </div>
  <h2>水平居中对齐</h2>
  <div class="ly ly--center">
    <div class="ly__item">A</div>
    <div class="ly__item">B</div>
    <div class="ly__item">C</div>
  </div>
  <h2>靠右对齐</h2>
  <div class="ly ly--right">
    <div class="ly__item">A</div>
    <div class="ly__item">B</div>
    <div class="ly__item">C</div>
  </div>
  <h2>两端对齐</h2>
  <div class="ly ly--justify">
    <div class="ly__item">A</div>
    <div class="ly__item">B</div>
    <div class="ly__item">C</div>
  </div>
  <h2>充满剩余部分</h2>
  <div class="ly ly--fill">
    <div class="ly__item">A</div>
    <div class="ly__item">B</div>
    <div class="ly__item ly__item--fill">C</div>
  </div>
  <div class="ly ly--fill">
    <div class="ly__item">A</div>
    <div class="ly__item ly__item--fill">B</div>
    <div class="ly__item">C</div>
  </div>
  <div class="ly ly--fill">
    <div class="ly__item ly__item--fill">A</div>
    <div class="ly__item">B</div>
    <div class="ly__item">C</div>
  </div>

  <h2>垂直居中</h2>
  <div class="ly ly--middle" style="height: 200px;background: #ddd;">
    <div class="ly__item">A</div>
    <div class="ly__item">B</div>
    <div class="ly__item">C</div>
  </div>

  <h2>完全居中</h2>
  <div class="ly ly--center ly--middle" style="height: 200px;background: #ddd;">
    <div class="ly__item">A</div>
    <div class="ly__item">B</div>
    <div class="ly__item">C</div>
  </div>
</div>
</template>
<style>
  .ly{
      margin-bottom: 10px;
  }
  
  .ly__item{
    min-width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: #fff;
    border: 2px solid #1abc9c;
    background-color: #f60;
  }
</style>