<template>
  <div class="main item-page">
    <van-tabs v-model="active">
      <van-tab  title="新品">
        <van-list
            v-model="newItem.isLoading"
            :finished="newItem.isFinished"
            @load="onLoad('newItem')"
          >
          <div class="ly ly-multi ly-j item-wrap">
              <div v-for="(item,i) in newItem.list" :key="i" class="item">
                <img v-lazy="'http://via.placeholder.com/200x100'" alt="" class="item__img" />
                <div class="mt-10rem">新品\{{i}}</div>
                <div class="item__price">￥23</div>
              </div>
          </div>
        </van-list>
      </van-tab>
      <van-tab  title="热销">
        <van-list
            v-model="hotItem.isLoading"
            :finished="hotItem.isFinished"
            @load="onLoad('hotItem')"
          >
          <div class="ly ly-multi ly-j item-wrap">
            <div v-for="(item,i) in hotItem.list" :key="i" class="item">
              <img v-lazy="'http://via.placeholder.com/200x100'" alt="" class="item__img" />
              <div class="mt-10rem">热销\{{i}}</div>
              <div class="item__price">￥23</div>
            </div>
          </div>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import stickybits from 'stickybits'
export default {
  data() {
    return {
      active: 0,
      newItem: {
        list: new Array(10),
        isLoading: false,
        isFinished: false
      },
      hotItem: {
        list: new Array(10),
        isLoading: false,
        isFinished: false
      },
    }
  },
  methods: {
    onLoad(type) {
      var list = this[type].list
      setTimeout(() => {
        for (let i = 0; i < 6; i++) {
          list.push('');
        }
        this[type].isLoading = false;

        if (list.length >= 40) {
          this[type].isFinished = true;
        }
      }, 500);
    }
  },

  mounted() {
    stickybits('.van-tabs__wrap')
  }
  
}
</script>

<style scoped>
  .item-wrap {
    padding: 0 .2rem;
  }
  .item {
    margin-top: .2rem;
    width: 2.9rem;
  }
  .item__img {
    display: block;
    width: 100%;
    height: 3rem;
  }
  .item__price {
    margin-top: .1rem;
    color: #f44;
    font-family: arial;
  }
</style>
<style>
  /*修复用了 stickybits 导致的副作用*/
  .item-page .van-tabs--line {
    padding-top: 0;
  }
</style>