import Mock from 'mockjs'
import setting from 'setting'
import { filterList } from 'utils'

var urls = setting.urls.song
var songList = [{
  id: 1,
  name: '北京,北京',
  singer: {
    name: '汪峰',
    discribe: `汪峰，男，祖籍江苏常州[1-2]  ，1971年6月29日出生于北京。中国大陆摇滚歌手、音乐创作人、作词人、作曲人，鲍家街43号乐队发起人。
汪峰自幼在中央音乐学院附小、附中学习小提琴，大学考入中央音乐学院小提琴中提琴专业，大学期间在专业音乐学习和训练之余就开始进行摇滚乐创作并组建乐队。完成本科学业后，进入中央芭蕾舞团任副首席小提琴师，后辞职后转型为职业歌手。`
  },
  type: 'rock,folk',
  url: 'http://www.xiami.com/song/53864',
  detail: '《北京，北京》是汪峰演唱的一首歌曲，歌曲由汪峰作词作曲，是2012年热播电视剧《北京爱情故事》的插曲，歌曲收录在汪峰2007年的专辑《勇敢的心》中，于2007年6月23日发行。'
}, {
  id: 2,
  name: '绿光',
  singer: {
    id: 1,
    name: '孙燕姿',
    discribe:`孙燕姿（Stefanie Sun），1978年7月23日出生于新加坡，华语流行女歌手。
2000年签约华纳唱片公司；同年6月9日发行首张专辑《孙燕姿同名专辑》在台湾地区出道，并以专辑中的歌曲《天黑黑》成名，获得第12届金曲奖最佳新人奖[1]  ；12月发行的第二张专辑《我要的幸福》入围第12届台湾金曲奖最佳女演唱人奖。
2003年初成立个人音乐公司“Make Music”；同年8月发行第七张专辑《The Moment》，其中包括电影《向左走，向右走》的插曲《遇见》。
2004年携专辑《Stefanie》复出乐坛，并凭此专辑在2005年获得第16届台湾金曲奖[2]  最佳国语女演唱人奖。2005年5月在”2005MTV日本音乐录像带大奖“中获得最佳大中华艺人奖[3]  。
2006年4月凭借第九张专辑《完美的一天》获得音乐风云榜港台地区最佳女歌手、最受欢迎女歌手奖等奖项[4]  。2008年7月凭借歌曲《逆光》获得第六届中国金唱片奖音乐录影带奖；同年8月获得“2008MTV亚洲大奖”地区最受欢迎歌手奖[5]  。
2011年发行专辑《是时候》，获得第17届新加坡金曲奖最佳专辑制作人、最受欢迎女歌手在内的六个奖项[6]  。2014年2月发行第12张专辑《克卜勒》并开展一连28场的“克卜勒”巡回演唱会[7]  ，凭借该作品获得香港十大中文金曲颁奖礼全国最佳女歌手奖[8]  。`
  },
  type: 'pop',
  detail: '《绿光》是孙燕姿演唱的一首歌曲，由天天、孙燕姿作词，李偲菘作曲并担任制作，Kenn C编曲[1]  ，收录在2001年7月9日孙燕姿发行的第3张个人专辑《风筝》中。'
}, ...makeMockListData(40)]


Mock.mock(urls.list, ({ url, body }) => {
  // 拿查询条件
  var { where, pager, order } = JSON.parse(body)
  var total
  var res
  if (where.name !== '' || where.singer !== '' || where.type !== '') {
    total = Mock.mock('@integer(0, 20)')
    res = makeMockListData(total)
  } else {
    res = songList
    total = res.length
  }
  var start = (pager.current - 1) * pager.limit
  var end = start + pager.limit
  var data = res.slice(start, end)
  // 模拟排序
  if(order && order.type) {
    data.sort((a, b) => Math.random() - 0.5)
  }
  return {
    data,
    pager: {
      current: pager.current,
      total: Math.ceil(total / pager.limit),
      limit: pager.limit
    }
  }
})

Mock.mock(new RegExp(`${urls.detail}\\?id=\\d+`), ({ url }) => {
  let id = /id=(\d+)/.exec(url)[1]
  return songList.filter((each) => each.id == id)[0] || {
    errorCode: 8
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
