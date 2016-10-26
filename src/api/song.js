import {filterList} from 'utils'
var songList = [{
  id: 1,
  name: '北京,北京',
  singer: '汪峰'
},{
  id: 2,
  name: '绿光',
  singer: '孙燕姿'
}]
export const fetchList = (searchObj) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      var res = filterList(songList, searchObj)
      resolve(res)
    }, 100)
  })
}