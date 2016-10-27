const SERVER_PREFIX = '127.0.0.1:3003/api/'
export default {
  urls: {
    song: {
      fetchList: `${SERVER_PREFIX}fetchList`
    }
  },
  language: {
    default: 'Ch', // 默认语言
    others: ['En'] // 其他语言
  },
}
