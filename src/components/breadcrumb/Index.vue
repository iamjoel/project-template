<template>
  <el-breadcrumb separator="/" style="padding: 20px 0;">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item v-if="menuName">{{menuName}}</el-breadcrumb-item>
    <el-breadcrumb-item v-if="subMenuName">{{subMenuName}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script src="./main.js"></script>
