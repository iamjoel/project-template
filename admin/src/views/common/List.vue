<template>
  <div class="main">
    <j-search-condition @search="search" v-if="config.searchCondition && config.searchCondition.length > 0">
      <j-edit-item
      :label="item.label" v-for="item in config.searchCondition" :key="item.key">
        <div v-if="item.dataType === 'select'">
          <div v-if="item.dataSource.type === 'dict'">
            <el-select v-model="searchConditions[item.key]" placeholder="请选择" filterable clearable>
              <el-option
                v-for="item in $store.getters.dictObj[item.dataSource.key]"
                :key="item.key"
                :label="item.label"
                :value="item.key">
              </el-option>
            </el-select>
          </div>
          <div v-else>
             <j-remote-select v-model="searchConditions[item.key]" :url-key="item.dataSource.key" :autoFetch="true">
            </j-remote-select>
          </div>
        </div>
        <div v-else>
          <el-input v-model="searchConditions[item.key]"></el-input>
        </div>
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
        :prop="item.key"
        :label="item.label"
        v-for="(item, index) in config.cols"
        :key="index"
        >
        <template slot-scope="scope">
          {{item.formatFn ? proxy(item.formatFn, [scope.row]) : getValue(scope.row, item.key)}}
        </template>
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

<style scoped></style>