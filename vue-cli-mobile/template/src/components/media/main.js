export default {
  props: {
    dirVer: { // 垂直方向的Media
      type: Boolean,
      default: false
    },
    src: {
      type: String,
      default: 'http://via.placeholder.com/50x50'
    },
    padding: {
      default: '.2rem'
    },
    imgRound: {
      type: Boolean,
      default: false
    },
    imgWidth: null,
    imgHeight: null,
    imgPadding: {
      default: '.2rem'
    },
    imgRight: {
      type: Boolean,
      default: false
    },
    noBorder: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      imgStyle: {}
    }  
  },
  mounted() {
    this.imgStyle = {}
    if(this.dirVer) {
      this.imgStyle['margin-bottom'] = this.imgPadding
      this.imgStyle.width = this.imgWidth || '100%'
      this.imgStyle.height = this.imgHeight || 'auto'
    } else {
      this.imgStyle[this.imgRight ? 'margin-left' : 'margin-right'] = this.imgPadding
      this.imgStyle.width = this.imgWidth || '.6rem'
      this.imgStyle.height = this.imgHeight || '.6rem'
    }
   
  }
}