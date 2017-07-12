<template>
<div class="main">
  <!-- 员工列表 -->
  <sc-search-condition @search="search">
    <sc-edit-item
    label="歌曲名称">
      <el-input v-model="searchConditions.name"></el-input>
    </sc-edit-item>
    <sc-edit-item
    label="歌手">
      <el-input v-model="searchConditions.singer"></el-input>
    </sc-edit-item>
  </sc-search-condition>

  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span style="line-height: 30px;">帐号列表</span>
      <el-button type="success" icon="plus" style="float:right" @click="$router.push('/hr/account/update/-1')">新增</el-button>
    </div>

    <el-table
      :data="tableData"
      border
      stripe>
      <el-table-column
        type="index"
        label="序列"
        align="center"
        width="80">
      </el-table-column>
      <el-table-column
        prop="name"
        label="歌曲名称"
        >
      </el-table-column>
      <el-table-column
        prop="singer"
        label="歌手"
        >
      </el-table-column>
      <el-table-column
        prop="op"
        label="操作"
        width="350"
        >
        <template scope="scope">
          <el-button type="info" size="small" @click="$router.push('/music/song/update/' + scope.row.id)" v-if="isShowEdit('user')">编辑</el-button>
          <el-button type="danger" size="small" @click="remove(scope.row.id)" v-if="isShowDelete('user')">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-row type="flex" justify="end">
      <el-pagination
          @current-change="handleCurrentChange"
          :current-page="pager.current"
          :page-size="10"
          layout="total, prev, pager, next, jumper"
          :total="pager.total"
          class="right">
        </el-pagination>
    </el-row>
  </el-card>

</div>
</template>

<script src="./list.js">

</script>

<style>

</style>
