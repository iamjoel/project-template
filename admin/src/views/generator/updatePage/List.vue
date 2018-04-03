<template>
  <div class="main">
    <el-table
      :data="pages"
      border
      stripe>
      <el-table-column
        type="index"
        label="序列"
        align="center"
        width="80">
      </el-table-column>
      <el-table-column
        prop="basic.label"
        label="实体"
        >
      </el-table-column>
      <el-table-column
        prop="key"
        label="操作"
        >
        <template slot-scope="scope">
          <el-button type="success" size="small" @click="$router.push('/generator/updatePage/update/' + scope.row.id)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script src="./list.js">

</script>

<style scoped></style>