export default {
  'song': {
    list: {
      basic: {
        label: '歌曲',
        entity: 'song'
      },
      table: [{
        label: '歌曲名称',
        key: 'name'
      },{
        label: '歌手',
        key: 'singer.name',
      },{
        label: '类型',
        key: 'type',
        formatFn: 'formatType'
        // isShow: 'fnName'
      }],
      operate: {
        add: {
          isShow: true,
        },
        edit: {
          isShow: true
        },
        detail: {
          isShow: false
        },
        delete: {
          isShow: ['admin']
        }
      },
      searchCondition: [{
        label: '歌曲名称',
        key: 'name'
      },{
        label: '歌曲类型',
        key: 'type',
        dataType: 'select',
        dataSource: {
          type: '',
          key: ''
        }
      }],
      fn: [{
        name: 'formatType',
        args: ['row'],
        body: 'return this.config.urlKey + row.type'
      }, {
        name: 'isShowEdit',
        args: [],
        body: 'return this.$store.state.role == "admin"'
      }]
    },
    detail: {
      model: [{
        name: '',
        key: '',
        dataType: 'string'
      }]
    }
  }
}
