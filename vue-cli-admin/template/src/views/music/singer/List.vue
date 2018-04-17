
<template> 
  <div class="main">
    <j-search-condition @search="search">
     
        <j-edit-item
        label="名称"
        >
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
            label="名称1"
            >
            
          </el-table-column>
          
        <el-table-column
          prop="op"
          label="操作"
          width="350"
          fixed="right"
          >
          <template slot-scope="scope">
            <el-button type="success" size="small" @click="$router.push(viewPagePath(scope.row.id))" v-if="isShow('detail')">详情</el-button>
            <el-button type="info" size="small" @click="$router.push(editPagePath(scope.row.id))" v-if="isShow('edit')">编辑</el-button>
            <el-button type="danger" size="small" @click="remove(scope.row.id)" v-if="isShow('delete')">删除</el-button>
          </template>
        </el-table-column>
        
      </el-table>
    </j-grid-box>
  </div>
</template>
<script src="./list.js"></script>
<style scoped>
</style>
      