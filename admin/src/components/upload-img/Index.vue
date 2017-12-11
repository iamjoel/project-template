<template>
  <div class="main">
    <div class="imgs">
      <img class="img" :src="src | img" v-for="src in imgId">
    </div>
    <div class="upload-btn-wrap">
      <el-button>选择图片</el-button>
      <input type="file" class="file-upload" :id="id" @change="uploadPic" accept="image/png, image/jpeg, image/gif">
    </div>
  </div>
</template>

<script>
var id = 1
import {urls} from '@/setting'
import $ from 'jquery'
export default {
  props: {
    value: null, // v-model
    isSingle: {// 是否只能上传一张
      default: true,
      type: Boolean
    }
  },
  data() {
    return {
      imgId: [],
      id
    }
  },
  methods: {
    uploadPic() {
      var vm = this
      var $file = $('#' + this.id)
      var formData = new FormData();
      formData.append('file', $file[0].files.item(0));
      $.ajax({
          url: urls.addPic,
          data: formData,
          processData: false,
          contentType: false,
          type: 'post',
          success: function(data) {
            if(!data.errorCode) {
              if(vm.isSingle) {
                vm.imgId = [data.data]
              } else {
                vm.imgId.push(data.data)
              }
              vm.$emit('input', vm.getImgId()) // 让 v-model 生效
            }
          }
      });

    },
    getImgId() {
      return this.imgId.join(',')
    },
    setImgId(value) {
      if(value) {
        if(this.isSingle) {
          this.imgId = [value]
        } else {
          if(typeof value === 'string') {
            this.imgId = value.split(',')
          } else {
            this.imgId = [...value]
          }
        }
      }
    }
  },
  mounted() {
    this.id = 'file-upload-' + id++
    this.setImgId(this.value)
  },

}
</script>

<style scoped>
.imgs{
  display: inline-block;
  margin-right: 5px;
}
.imgs img {
  width: 30px;
  margin-right: 5px;
}
.upload-btn-wrap{
  display: inline-block;
  position: relative;
}
.file-upload{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: .01
}
</style>