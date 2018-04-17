
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
        

        <j-edit-item  label="歌手" prop="singerId" :is-view="isView" :view-value="model.moreInfo.singer.name">
        
            <j-remote-select ref="singerId" v-model="model.singerId" url-key="singer" :autoFetch="true">
            </j-remote-select>
            
        </j-edit-item>
        

        <j-edit-item  label="创作时间" prop="date" :is-view="isView" :view-value="model.date">
        
          <el-date-picker
            v-model="model.date"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </j-edit-item>
        

        <j-edit-item fill label="图片" prop="img" :is-view="false" :view-value="model.img">
        
          <div class="img-upload" style="text-align:left" v-if="!isView">
            <el-upload class="image-uploader" name="file"
                     :action="addPicUrl" :show-file-list="false"
                     :on-success="imgLoaded">
              <img v-if="model.img" :src="model.img | img" class="image-show">
                <i v-else class="el-icon-plus image-uploader-icon"></i>
            </el-upload>
            <div class="form-tip">建议尺寸 750 * 300</div>
          </div>
          <div class="img-upload" v-else>
            <img :src="model.img | img" class="image-show">
          </div>
          
        </j-edit-item>
        

        <j-edit-item fill label="多图测试" prop="imgs" :is-view="false" :view-value="model.imgs">
        
          <div class="imgs-upload" style="text-align:left" v-if="!isView">
            <div class="ly ly-multi image-uploader" >
              <div v-if="model.imgs" :key="img" v-for="(img, index) in model.imgs.split(',')" class="mb-10 mr-10 pos-r">
                <img :src="img | img" class="image-show" >
                <i class="el-icon-close" @click="removeImg('imgs', index)"></i>
              </div>
            </div>
            <div>
              <el-upload 
                v-if="model.imgs.split(',').length < 5"
                class="image-uploader" name="file"
                 :action="addPicUrl" :show-file-list="false"
                 :on-success="imgsLoaded"
                 >
                  <i class="el-icon-plus image-uploader-icon"></i>
               </el-upload>
              <div class="form-tip">建议尺寸 750 * 300</div>
            </div>
          </div>
            
          <div class="img-upload" style="text-align:left" v-else>
            <img v-if="model.imgs" :src="img | img" class="image-show mr-10 mb-10" v-for="(img, index) in model.imgs.split(',')">
          </div>
        </j-edit-item>
        

        <j-edit-item  label="排序值" prop="sort" :is-view="isView" :view-value="model.sort">
        
          <el-input-number v-model.number="model.sort" :controls="false"></el-input-number>
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

.img-upload .image-uploader .image-uploader-icon,
.img-upload .image-uploader .image-show {
    min-width: 200px;
    height: 200px;
    line-height: 200px;
}

.imgs-upload .image-uploader .image-uploader-icon,
.imgs-upload .image-uploader .image-show {
    min-width: 150px;
    height: 150px;
    line-height: 150px;
}
</style>