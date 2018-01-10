<template>
<div class="main">
  <j-search-condition @search="search">
    <j-edit-item
    label="歌曲名称">
      <el-input v-model="searchConditions.name"></el-input>
    </j-edit-item>
    <j-edit-item
    label="歌手">
      <el-input v-model="searchConditions.singer"></el-input>
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
        label="歌曲名称"
        >
      </el-table-column>
      <el-table-column
        prop="singer.name"
        label="歌手"
        >
      </el-table-column>
      <el-table-column
        prop="singer"
        label="创作时间"
        >
        <template slot-scope="scope">
            {{scope.row.singer.createdAt | time}}
        </template>
      </el-table-column>
      <el-table-column
        prop="op"
        label="操作"
        width="350"
        fixed="right"
        >
        <template slot-scope="scope">
          <el-button type="success" size="small" @click="$router.push(viewPagePath(scope.row.id))" v-if="isShow('view')">详情(跳页面)</el-button>
          <el-button type="success" size="small" @click="showDetail(scope.row)" v-if="isShow('view')">详情(弹出框)</el-button>
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

