<template>
  <div class="editor" :class="['editor-' + editId]">
    <!-- 图片上传组件辅助-->
    <el-upload
      class="image-uploader"
      name="file"
      :action="addPicUrl"
      :show-file-list="false"
      :on-success="imgLoaded"
    >
      <!-- <img v-if="model.img" :src="model.img | img" class="image-show">
        <i v-else class="el-icon-plus image-uploader-icon"></i> -->
    </el-upload>
    <quill-editor
      v-model="content"
      ref="myQuillEditor"
      :options="editorOption"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @ready="onEditorReady($event)"
      @change="onEditorChange"
    >
    </quill-editor>
  </div>
</template>

<script src="./main.js"></script>

<style scoped></style>
