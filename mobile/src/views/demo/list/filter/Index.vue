<template>
  <div class="main">
    <h2>选项从底部显示</h2>
    <div>
      <!-- 筛选类型 Tab -->
      <div class="filter-tab ly ly-j">
        <a href="javascript:void(0);" v-for="item in filterOpts" :key="item.name" class="filter-tab__item" @click="showFilter(item.key)">
          {{(filterValue[item.key] && filterValue[item.key].label) || item.name}}
          <img class="filter-tab__icon" src="./images/down.png" alt="">
        </a>
      </div>

      <!-- 选择项目 -->
      <van-popup v-model="isShowFilter" position="bottom">
        <a href="javascript:void(0);" class="filter-item" v-for="item in columns" :class="item.className" @click="selectedFilter(item)">
          {{item.label}}
        </a>
      </van-popup>
    </div>

    <h2>选项在Tab下显示</h2>
    <div>
      <!-- 筛选类型 Tab -->
      <div class="filter-tab ly ly-j">
        <a href="javascript:void(0);" v-for="item in filterOpts" :key="item.name" class="filter-tab__item" @click="showFilter2(item.key)">
          {{(filterValue[item.key] && filterValue[item.key].label) || item.name}}
          <img class="filter-tab__icon" src="./images/down.png" alt="">
        </a>
        
      </div>
      <!-- 选择项目 -->
      <Expanding v-show="isShowFilter2">
        <div>
          <a href="javascript:void(0);" class="filter-item" v-for="item in columns" :class="item.className" @click="selectedFilter(item)">
          {{item.label}}
          </a>
        </div>
        
      </Expanding>
      <div v-show="isShowFilter2">
        
      </div>
    </div>
    
  </div>
</template>

<script src="./main.js">

</script>

<style scoped src="./style.css"></style>