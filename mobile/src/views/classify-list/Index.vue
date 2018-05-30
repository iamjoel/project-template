<template>
  <div class="main item-page">
    <van-tabs v-model="active">
      <van-tab  title="新品">
        <van-list
            v-model="newItem.isLoading"
            :finished="newItem.isFinished"
            @load="search('newItem')"
          >
          <div class="ly ly-multi ly-j item-wrap">
              <div v-for="(item,i) in newItem.list" :key="i" class="item">
                <img v-lazy="'http://via.placeholder.com/200x100'" alt="" class="item__img" />
                <div class="mt-10rem">新品{{i}}</div>
                <div class="item__price">￥23</div>
              </div>
          </div>
        </van-list>
      </van-tab>
      <van-tab  title="热销">
        <van-list
            v-model="hotItem.isLoading"
            :finished="hotItem.isFinished"
            @load="search('hotItem')"
          >
          <div class="ly ly-multi ly-j item-wrap">
            <div v-for="(item,i) in hotItem.list" :key="i" class="item">
              <img v-lazy="'http://via.placeholder.com/200x100'" alt="" class="item__img" />
              <div class="mt-10rem">热销{{i}}</div>
              <div class="item__price">￥23</div>
            </div>
          </div>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script src="./main.js"></script>

<style scoped src="./style.css"></style>
<style>
  /*修复用了 stickybits 导致的副作用*/
  .item-page .van-tabs--line {
    padding-top: 0;
  }
</style>