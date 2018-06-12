<template>
  <div class="main">
    欢迎
     <!-- 图片上传组件辅助-->
    <el-upload class="image-uploader" name="file"
             :action="addPicUrl" :show-file-list="false"
             :on-success="imgLoaded">
      <!-- <img v-if="model.img" :src="model.img | img" class="image-show">
        <i v-else class="el-icon-plus image-uploader-icon"></i> -->
    </el-upload>
    <quill-editor v-model="content"
        ref="myQuillEditor"
        :options="editorOption"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @ready="onEditorReady($event)">


  </quill-editor>
  <div>\{{content}}</div>

  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],

  [{'header': 1}, {'header': 2}],               // custom button values
  [{'list': 'ordered'}, {'list': 'bullet'}],
  [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
  [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
  [{'direction': 'rtl'}],                         // text direction

  [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
  [{'header': [1, 2, 3, 4, 5, 6, false]}],

  [{'color': []}, {'background': []}],          // dropdown with defaults from theme
  [{'font': []}],
  [{'align': []}],
  ['link', 'image', 'video'],
  ['clean']                                         // remove formatting button
]


export default {
  components: {
    quillEditor
  },
  data() {
    return {
      content: '',
      editorOption: {
          placeholder: '',
          theme: 'snow',  // or 'bubble'
          modules: {
              toolbar: {
                  container: toolbarOptions,  // 工具栏
                  handlers: {
                      'image': function (value) {
                          if (value) {

                            document.querySelector('.image-uploader input').click()
                          } else {
                              this.quill.format('image', false);
                          }
                      }
                  }
              }
          }
      }
    }  
  },
  methods: {
    onEditorBlur(quill) {
      // console.log('editor blur!', quill)
    },
    onEditorFocus(quill) {
      // console.log('editor focus!', quill)
    },
    onEditorReady(quill) {
      // console.log('editor ready!', quill)
    },
    onEditorChange({ quill, html, text }) {
      // console.log('editor change!', quill, html, text)
      this.content = html
    },
    imgLoaded(data) {
      var img = 'www.baidu.com'
      let quill = this.$refs.myQuillEditor.quill
      // 获取光标所在位置
      let length = quill.getSelection().index;
      // 插入图片  res.info为服务器返回的图片地址
      quill.insertEmbed(length, 'image', img)
      // 调整光标到最后
      quill.setSelection(length + 1)

      // this.quillUpdateImg = false
      // debugger
      // this.handleUploadImageSuccess('img', data.data)
    }
  }
}
</script>

<style scoped></style>