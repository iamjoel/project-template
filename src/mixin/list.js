export default {
  methods: {
    isShowView (limitkey, auditStatus) {
      return true // 测试
      // return ((limit & LIMIT_KEY.QUERY) !== 0)
    },
    isShowEdit (limitkey, auditStatus) {
      return true
    },
    isShowAduit (limitkey, auditStatus) {
      return true
    },
    isShowAduitAgain (limitkey, auditStatus, isLastPerson) {
      return true
    },
    isShowDelete (limitkey, auditStatus) {
      return true
    }
  }
}
