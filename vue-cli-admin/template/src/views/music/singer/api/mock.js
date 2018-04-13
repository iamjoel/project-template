import Mock from 'mockjs'
import {urls} from '@/setting'
var Random = Mock.Random

var currUrl = urls.singer
var nextSongId = 1
var list = [{
  id: nextSongId++ + '',
  name: '孙燕姿',
},{
  id: nextSongId++ + '',
  name: '王菲',
},{
  id: nextSongId++ + '',
  name: '任贤齐',
},{
  id: nextSongId++ + '',
  name: '小刚',
},]
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
    name: Random.cname(),
  }
}

