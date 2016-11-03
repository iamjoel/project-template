const SERVER_PREFIX = 'http://127.0.0.1:3003/api'
export default {
  urls: {
    song: {
      list: `${SERVER_PREFIX}/song/fetchList`,
      detail: `${SERVER_PREFIX}/song/fetchDetail`
    }
  },
  language: {
    default: 'ch' // 默认语言
  },
  errorCode: {
    7: '数据库错误',
    8: '未查到结果',
    101: '更新失败',
    102: '删除失败',
  }
}
