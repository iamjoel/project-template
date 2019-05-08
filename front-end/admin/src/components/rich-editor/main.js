import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'], // toggled buttons
  ['blockquote', 'code-block'],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
  [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
  [{ direction: 'rtl' }], // text direction

  [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],
  ['link', 'image', 'video'],
  ['clean'] // remove formatting button
]

var id = 0

import { IMGS_PREFIX } from '@/setting'

export default {
  props: {
    value: null
  },
  components: {
    quillEditor
  },
  data () {
    id++
    var editId = id
    return {
      editId,
      content: '',
      editorOption: {
        placeholder: '',
        theme: 'snow', // or 'bubble'
        modules: {
          toolbar: {
            container: toolbarOptions, // 工具栏
            handlers: {
              image: function (value) {
                if (value) {
                  document
                    .querySelector(`.editor-${editId} .image-uploader input`)
                    .click()
                } else {
                  this.quill.format('image', false)
                }
              }
            }
          }
        }
      }
    }
  },
  watch: {
    value () {
      if (this.value) {
        this.content = this.value
      }
    }
  },
  methods: {
    onEditorBlur (quill) {
      // console.log('editor blur!', quill)
    },
    onEditorFocus (quill) {
      // console.log('editor focus!', quill)
    },
    onEditorReady (quill) {
      // console.log('editor ready!', quill)
    },
    onEditorChange ({ quill, html, text }) {
      this.content = html
      this.$emit('input', html)
    },
    imgLoaded (data) {
      var img = `${IMGS_PREFIX}/${data.data}`
      let quill = this.$refs.myQuillEditor.quill
      // 获取光标所在位置
      let length = quill.getSelection().index
      // 插入图片  res.info为服务器返回的图片地址
      quill.insertEmbed(length, 'image', img)
      // 调整光标到最后
      quill.setSelection(length + 1)
    },
    setValue (value) {
      this.content = value
    }
  }
}
