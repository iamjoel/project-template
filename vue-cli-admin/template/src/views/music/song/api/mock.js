import Mock from 'mockjs'
import {urls} from '@/setting'
var Random = Mock.Random

var currUrl = urls.song
var nextSongId = 1
var list = [{
  id: nextSongId++,
  name: '天黑黑',
  type: 'pop',
  describe: '由廖莹如、吴依铮填词，李偲菘谱曲，孙燕姿演唱的一首歌曲，收录于孙燕姿2000年发行的专辑《孙燕姿同名专辑》中。',
  createdAt: new Date('2000/9/1'),
  singer: {
    name: '孙燕姿',
    gender: 2
  },
}]
Mock.mock(new RegExp(currUrl.list), ({ url, body }) => {
  return {
    data: {
      list,
    },
    pager: {
      total: list.length
    }
  }
})

Mock.mock(new RegExp(currUrl.detail), ({ url, body }) => {
  return {
    data: makeItem(),
  }
})

Mock.mock(new RegExp(currUrl.del), ({ url, body }) => {
   return {
    "errcode": 0
  }
})

Mock.mock(new RegExp(currUrl.add), ({ url, body }) => {
   return {
    "errcode": 0
  }
})

Mock.mock(new RegExp(currUrl.edit), ({ url, body }) => {
   return {
    "errcode": 0
  }
})

function makeItem() {
  return {
    id: Math.floor(Math.random() * 10000),
    name: 'xxx',
    singer: {
      name:Random.cname()
    },
    singerId: '1',
    describe: Random.sentence(),
    imgs: '',
    createdAt: Date.now()
  }
}

