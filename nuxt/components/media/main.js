const imgDefaultConfig = {
  src: 'http://via.placeholder.com/50x50',
  width: '',
  height: '',
  isCircle: false,
  isRight: false
}
export default {
  props: {
    dirVer: { // 垂直方向的Media
      type: Boolean,
      default: false
    },
    img: {
      type: Object,
      default: () => imgDefaultConfig
    },
    spaceBetween: {
      default: '.2rem'
    }
  },
  data() {
    return {
      imgStyle: {}
    }  
  },
  mounted() {
    this.imgStyle = {}
    var imgConfig = Object.assign({}, imgDefaultConfig, this.img)
    if(this.dirVer) {
      this.imgStyle['margin-bottom'] = this.spaceBetween
      this.imgStyle.width = imgConfig.width || '100%'
      this.imgStyle.height = imgConfig.height || 'auto'
    } else {
      this.imgStyle[imgConfig.isRight ? 'margin-left' : 'margin-right'] = this.spaceBetween
      this.imgStyle.width = imgConfig.width || '.6rem'
      this.imgStyle.height = imgConfig.height || '.6rem'
    }
   
  }
}