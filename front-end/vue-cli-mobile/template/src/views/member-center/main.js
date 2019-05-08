export default {
  methods: {
    uploadAvatar () {
      var formData = new FormData()
      var file = this.$refs.avtar.files.item(0)
      if (!file) {
        return
      }
      formData.append('name', file)
      // 图片预览
      var reader = new FileReader()
      reader.onloadend = () => {
        this.previewUrl = reader.result
      }
      reader.readAsDataURL(file)

      this.$http({
        url: urls.uploadImg,
        method: 'post',
        data: formData,
        config: { headers: { 'Content-Type': 'multipart/form-data' } }
      }).then(
        ({ data }) => {
          if (data.Success) {
            this.$store.commit('xxx', {
              ...this.$store.state.user,
              Face: data.State
            })
            var user = this.$store.state.user
            this.$http
              .post('xxx', {
                Uid: user.Uid,
                NickName: user.NickName,
                Face: data.State,
                Telephone: user.Telephone,
                Sex: user.Sex
              })
              .then(
                ({ data }) => {
                  if (data.Success) {
                  }
                },
                () => {
                  this.$toast('头像上传失败!')
                }
              )
          } else {
            this.$toast('头像上传失败!')
          }
        },
        () => {
          this.$toast('头像上传失败!')
        }
      )
    }
  }
}
