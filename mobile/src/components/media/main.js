export default {
  props: {
    src: {
      type: String,
      default: 'http://via.placeholder.com/50x50'
    },
    imgRound: {
      type: Boolean,
      default: false
    },
    imgWidth: {
      default: '.6rem'
    },
    imgHeight: {
      default: '.6rem'
    },
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
    this.imgStyle = {
      width: this.imgWidth,
      height: this.imgHeight,
      [this.imgRight ? 'margin-left' : 'margin-right']: this.imgPadding
    }
   
  }
}