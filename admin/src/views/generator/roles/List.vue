<template>
  <div class="main">
    <el-table
      :data="$store.state.roles"
      border
      stripe>
      <el-table-column
        type="index"
        label="序列"
        align="center"
        width="80">
      </el-table-column>
      <el-table-column
        prop="label"
        label="角色名称"
        >
      </el-table-column>
      <el-table-column
        prop="key"
        label="角色值"
        >
      </el-table-column>
    </el-table>
  </div>
</template>

<script src="./list.js">

</script>

<style scoped></style>