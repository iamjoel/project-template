<template>
  <div class="main">
    <!-- 搜索 -->
    <van-search placeholder="请输入xxx" v-model="searchInput" @search="onSearch"/>
    <!-- 跑马灯通知 -->
    <van-notice-bar
      text="足协杯战线连续第2年上演广州德比战，上赛季半决赛上恒大以两回合5-3的总比分淘汰富力。"
      left-icon="chat"
    />
    <!-- 垂直轮播通知 -->
    <div class="ly notice">
      <i class="notice__icon"><img src="./images/notice.png" alt=""></i>
      <div class="notice__content">
        <van-swipe :autoplay="3000" :vertical="true" :show-indicators="false"  class="h-100per">
          <van-swipe-item v-for="item in 10" :key="item">
            用户<strong style="">138123456{{item}}</strong>进入聊天室
          </van-swipe-item>
        </van-swipe>
      </div>
    </div>
    <!-- 轮播 -->
    <div class="swipe mb-10rem">
      <van-swipe :autoplay="3000" class="h-100per ta-c">
        <van-swipe-item v-for="i in 5" :key="i">
          <img class="img" src="/static/demo/2.jpeg"/>
        </van-swipe-item>
      </van-swipe>
    </div>
    
    <h2>列表</h2>
    <div class="ly ly-multi nav">
      <a href="javascript:void(0)" @click="$router.push('/demo/list/infinate-load')" class="nav__item">
        <van-icon name="wap-nav" />
        <div class="mt-10 ta-c">无限加载</div>
      </a>
      <a href="javascript:void(0)" @click="$router.push('/demo/list/no-data')" class="nav__item">
        <van-icon name="wap-nav" />
        <div class="mt-10 ta-c">无数据</div>
      </a>
      <a href="javascript:void(0)" @click="$router.push('/demo/list/filter')" class="nav__item">
        <van-icon name="wap-nav" />
        <div class="mt-10 ta-c">搜索条件</div>
      </a>
      <a href="javascript:void(0)" @click="$router.push('/demo/pull-refresh')" class="nav__item">
        <van-icon name="upgrade" />
        <div class="mt-10 ta-c">下拉刷新</div>
      </a>
    </div>
    <h2>图片</h2>
    <div class="ly ly-multi nav">
      <a href="javascript:void(0)" @click="$router.push('/demo/lazyload')" class="nav__item">
        <van-icon name="photo" />
        <div class="mt-10 ta-c">懒加载</div>
      </a>
      <a href="javascript:void(0)" @click="$router.push('/demo/img-preview')" class="nav__item">
        <van-icon name="photo" />
        <div class="mt-10 ta-c">图片预览</div>
      </a>
    </div>
    <h2>其他</h2>
    <div class="ly ly-multi nav">
      <a href="javascript:void(0)" @click="$router.push('/demo/form')" class="nav__item">
        <van-icon name="records" />
        <div class="mt-10 ta-c">表单</div>
      </a>
      <a href="javascript:void(0)" @click="$router.push('/demo/tree-select')" class="nav__item">
        <van-icon name="records" />
        <div class="mt-10 ta-c">分类选择</div>
      </a>
    </div>
    
    
  </div>
</template>

<script src="./main.js"></script>

<style scoped src="./style.css"></style>