<template>
  <div class="sc-search-condition">
    <el-card>
      <el-form :inline="true" ref="form" label-position="right">
        <!-- 请求条件 -->
        <el-row type="flex" class="sc-search-condition__inputs">
          <slot></slot>
          <!-- 更多条件 -->
          <expanding v-if="isExpend">
            <div class="sc-search-condition__more">
              <slot name="more"> </slot>
            </div>
          </expanding>
        </el-row>
        <!-- 操作 -->
        <el-row type="flex" justify="end" class="sc-search-condition__ops">
          <el-button type="primary" @click="$emit('search')" icon="search"
            >搜索</el-button
          >
          <el-button
            type="text"
            v-if="hasExpend"
            @click="isExpend = !isExpend"
            class="sc-search-condition__toggle-btn"
            :class="{ 'is-expend': isExpend }"
            >\{{ isExpend ? '收起' : '展开'
            }}<i class="el-icon-arrow-down el-icon--right"></i
          ></el-button>
          <slot name="more-op"></slot>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import Expanding from '../effect/Expanding'
export default {
  components: {
    Expanding
  },
  props: {
    hasExpend: {
      default: false
    }
  },
  data () {
    return {
      isExpend: false
    }
  }
}
</script>
<style>
.sc-search-condition {
  margin-bottom: 10px;
}
.sc-search-condition__inputs {
  flex-wrap: wrap;
}
.sc-search-condition__ops {
  margin-top: 10px;
}
.sc-search-condition__ops > * {
  margin-left: 10px;
}
.sc-search-condition__more {
  width: 100%;
}
.sc-search-condition__toggle-btn i {
  transition: 0.5s transform;
}
.is-expend i {
  transform: rotate(180deg);
}
</style>
