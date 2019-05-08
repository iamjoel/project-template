import axios from 'axios'
import { urls } from '@/settings'

export default {
  methods: {
    valid () {
      return true
    },
    formatSaveData () {
      return this.model
    },
    save () {
      if (!this.valid()) {
        return
      }
      var saveData = this.formatSaveData()
      axios.post(urls[this.key], saveData).then(({ data }) => {
        this.$toast('操作成功')
        this.afterSave()
      })
    },
    afterSave () {
      this.$router.push('/')
    }
  },
  mounted () {
    if (!this.key) {
      console.error('key needed')
    }
  }
}
