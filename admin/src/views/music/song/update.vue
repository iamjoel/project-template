<template>
<div class="main">
  <el-form :inline="true" :model="model" :rules="rules" ref="form" label-position="right" >
    <el-row type="flex" justify="start" class="multi-line">
      
        <j-edit-item  label="名称" prop="name" :is-view="isView" :view-value="model.name">
        
          <el-input v-model="model.name"></el-input>
        </j-edit-item>
        

        <j-edit-item  label="歌曲类型" prop="type" :is-view="isView" :view-value="model.type">
        
            <el-select v-model="model.type" placeholder="请选择" filterable clearable>
              <el-option
                v-for="item in $store.getters.dictObj.musicType"
                :key="item.key"
                :label="item.label"
                :value="item.key">
              </el-option>
            </el-select>
        </j-edit-item>
        

        <j-edit-item  label="歌手" prop="singerId" :is-view="isView" :view-value="model.singerId">
        
            <j-remote-select ref="singerId" v-model="model.singerId" url-key="singer" :autoFetch="true">
            </j-remote-select>
            
        </j-edit-item>
        

        <j-edit-item  label="创作时间" prop="time" :is-view="isView" :view-value="model.time">
        
          <el-date-picker
            v-model="model.time"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </j-edit-item>
        

        <j-edit-item  label="图片" prop="img" :is-view="isView" :view-value="model.img">
        <div>单图 图片上传</div>
        </j-edit-item>
        

        <j-edit-item  label="排序值" prop="sort" :is-view="isView" :view-value="model.sort">
        
          <el-input-number v-model.number="model.sort" :controls="false"></el-input-number>
        </j-edit-item>
        

        <j-edit-item  label="是否原创歌曲" prop="isOriginal" :is-view="isView" :view-value="model.isOriginal">
        
            <el-switch
            v-model="model.isOriginal"
            on-text="是"
            off-text="否"
            on-value="1"
            off-value="0">
          </el-switch>
          
        </j-edit-item>
        

        <j-edit-item fill label="描述" prop="describe" :is-view="isView" :view-value="model.describe">
        
          <el-input v-model="model.describe" type="textarea" :rows="3"></el-input>
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
