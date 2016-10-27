import Mock from 'mockjs'
import setting from 'setting'

var urls = setting.urls.song

Mock.mock(urls.fetchList , [{
  id: 1,
  name: '北京,北京',
  singer: '汪峰',
  type: 'rock,folk'
},{
  id: 2,
  name: '绿光',
  singer: '孙燕姿',
  type: 'pop'
}])