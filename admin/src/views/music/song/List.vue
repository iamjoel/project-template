
<template> 
  <div class="main">
    <j-search-condition @search="search">
      <j-edit-item label="歌名">
        <el-input v-model="searchConditions.name" />
      </j-edit-item>

      <j-edit-item label="歌曲类型">
        <el-select v-model="searchConditions.type" placeholder="请选择" filterable clearable>
          <el-option
              v-for="item in $store.getters.dictObj.musicType"
              :key="item.key"
              :label="item.label"
              :value="item.key">
          </el-option>
        </el-select>
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
          prop="type"
          label="类型"
        >
          <template slot-scope="scope">
            {{formatType(scope.row)}}
          </template>
        </el-table-column>

        <el-table-column
          prop="op"
          label="操作"
          width="350"
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