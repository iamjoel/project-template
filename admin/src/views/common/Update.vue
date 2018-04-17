
<template>
<div class="main">
  <!-- {{config.cols.map(item=>item.key)}} -->
  <el-form :inline="true" :model="model" :rules="rules" ref="form" label-position="right">
    <el-row type="flex" justify="start" class="multi-line">

      <j-edit-item  :label="col.label" :prop="col.key" :is-view="isView" :view-value="model[col.key]" v-for="(col, index) in config.cols" :key="index">
        <el-input v-model="model[col.key]" v-if="!col.dataType || col.dataType === 'string'"></el-input>

        <el-input v-model="model[col.key]" type="textarea" :rows="3" v-if="col.dataType === 'strings'"></el-input>

        <el-input-number v-model.number="model[col.key]" v-if="col.dataType === 'number'" :controls="false"></el-input-number>


        <el-select v-if="col.dataType === 'select' && col.dataSource.type === 'dict'" v-model="model[col.key]" placeholder="请选择" filterable clearable>
              <el-option
                v-for="item in $store.getters.dictObj[col.dataSource.key]"
                :key="item.key"
                :label="item.label"
                :value="item.key">
              </el-option>
            </el-select>

        <j-remote-select v-if="col.dataType ===  'select' && col.dataSource.type === 'entity'" :ref="col.key" v-model="model[col.key]" :url-key="col.dataSource.key" :autoFetch="true">
            </j-remote-select>

        <el-date-picker
          v-if="col.dataType ===  'date'"
          v-model="model[col.key]"
          type="date"
          placeholder="选择日期"
        >
        </el-date-picker>

        <div v-if="col.dataType === 'img'">单图 图片上传</div>
        <div v-if="col.dataType === 'imgs'">多图 图片上传</div>

        <el-switch v-if="col.dataType === 'bool'"
          v-model="model[col.key]"
          on-text="是"
          off-text="否"
          on-value="1"
          off-value="0">
        </el-switch>
      </j-edit-item>
    </el-row>
  </el-form>
  
  <el-row type="flex" justify="center">
    <el-button @click="$router.go(-1)">返回</el-button>
    <el-button type="success" @click="save" v-if="!isView">保存</el-button>
  </el-row>
</div>
</template>

<script src="./update.js"></script>
<style scoped>

</style> 
