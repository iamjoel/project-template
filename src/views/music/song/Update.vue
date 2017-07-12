<template>
<div class="main">
  <el-form :inline="true" :model="model" :rules="rules" ref="form" label-position="right" >
    <el-row type="flex" justify="start" class="multi-line">
      <j-edit-item
        label="歌曲名称" prop="name">
        <el-input v-model="model.name"></el-input>
      </j-edit-item>
      <j-edit-item
        label="歌手" prop="singer">
        <el-input v-model="model.singer"></el-input>
      </j-edit-item>
    </el-row>
  </el-form>
  
  <el-row type="flex" justify="center">
    <el-button @click="$router.go(-1)">返回</el-button>
    <el-button type="success" @click="save">保存</el-button>
  </el-row>
</div>
</template>

<script src="./update.js"></script>

<style>

</style>
