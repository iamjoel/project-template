
<template>
<div class="main">
  <div class="ly ly-r mb-10">
    <el-button type="primary" @click="autoFill" v-if="isDev && isAdd">补全表单内容</el-button>
  </div>

  <el-form :inline="true" :model="model" :rules="rules" ref="form" label-position="right" >
    <el-row type="flex" justify="start" class="multi-line">
      <j-edit-item  label="歌手" prop="name" :is-view="isView" :view-value="model.name">
        <el-input v-model="model.name"></el-input>
      </j-edit-item>
    </el-row>
  </el-form>
  
  <el-row type="flex" justify="center" class="mb-20">
    <el-button @click="$router.go(-1)">返回</el-button>
    <el-button type="success" @click="save" v-if="!isView">保存</el-button>
  </el-row>
</div>
</template>

<script src="./update.js"></script>

<style scoped>

</style>