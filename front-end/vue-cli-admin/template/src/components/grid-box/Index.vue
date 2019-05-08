<template>
  <div class="grid-box">
    <el-card class="box-card">
      <div slot="header" class="clearfix" v-if="isShowAddBtn">
        <span class="box-title">\{{ title }}</span>
        <el-button
          type="success"
          icon="plus"
          style="float:right"
          @click="$router.push(addUrl)"
          >新增</el-button
        >
      </div>
      <!-- 主题内容 -->
      <slot></slot>
      <!-- 分页 -->
      <div class="pager">
        <el-row type="flex" justify="end">
          <el-pagination
            @current-change="pagerChange"
            :current-page="pager.current"
            :page-size="10"
            layout="total, prev, pager, next, jumper"
            :total="pager.total"
            class="right"
          >
          </el-pagination>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  props: {
    isShowAddBtn: Boolean,
    addUrl: String,
    pager: Object,
    title: String
  },
  methods: {
    pagerChange (currentPage) {
      this.$emit('pageChange', currentPage)
    }
  },
  mounted () {}
}
</script>

<style scoped>
.grid-box {
  margin-top: 20px;
}
.box-title {
  display: inline-block;
  min-height: 30px;
}
.pager {
  margin-top: 20px;
}
</style>
