import Mock from 'mockjs'
import setting from 'setting'

var urls = setting.urls.song
var songList = [{
  id: 1,
  name: '北京,北京',
  singer: {
    name: '汪峰'
  },
  type: 'rock,folk',
  url: 'http://www.xiami.com/song/53864',
  detail: '北京,北京 的详细介绍'
}, {
  id: 2,
  name: '绿光',
  singer: {
    id: 1,
    name: '孙燕姿'
  },
  type: 'pop',
  detail: '绿光 的详细介绍'
}, ...makeMockListData(5)]


Mock.mock(urls.list, songList)
Mock.mock(new RegExp(`${urls.detail}\\?id=\\d+`), ({ url }) => {
  let id = /id=(\d+)/.exec(url)[1]
  return songList.filter((each) => each.id == id)[0] || {
    errMsg: 'not Found'
  }

})

function makeMockListData(len = 10) {
  var res = []
  for (var i = 0; i < len; i++) {
    res.push({
      id: Mock.mock('@integer(0)'),
      name: Mock.mock('@ctitle(1,7)'),
      singer: {
          name: Mock.mock('@cname()'),
      },
      detail: Mock.mock('@cparagraph')

    })
  }
  return res
}
