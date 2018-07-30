<template>
<div class="main">
  <j-search-condition @search="search">
    <j-edit-item
    label="帐号">
      <el-input v-model="searchConditions.name"></el-input>
    </j-edit-item>
  </j-search-condition>

  
  <j-grid-box :is-show-add-btn="isShow('add')" :add-url="addPagePath" :pager="pager" @pageChange="handleCurrentChange">
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
        label="帐号"
        >
      </el-table-column>
      <el-table-column
        prop="op"
        label="操作"
        width="180"
        fixed="right"
        >
        <template slot-scope="scope">
          <el-button type="info" size="small" @click="$router.push(editPagePath(scope.row.id))" v-if="isShow('edit')">编辑</el-button>
          <el-button type="danger" size="small" @click="remove(scope.row.id)" v-if="isShow('delete')">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </j-grid-box>

  <el-dialog title="详情" :visible.sync="isShowDetailDialog">
      <div class="detail-item-wrap">
        <div class="detail-item">
          <div class="detail-item__label">歌曲名称</div>
          <div class="detail-item__val">{{model.name}}</div>
        </div>
        <div class="detail-item">
          <div class="detail-item__label">歌手</div>
          <div class="detail-item__val">{{model.singer && model.singer.name}}</div>
        </div>
        <div class="detail-item">
          <div class="detail-item__label">简介</div>
          <div class="detail-item__val">{{model.describe}}</div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowDetailDialog=false">关 闭</el-button>
      </span>
    </el-dialog>

</div>
</template>

<script src="./list.js"></script>

