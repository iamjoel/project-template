export default {
  'song': {
    list: {
      urlKey: 'song',
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
          isShow: 'isShowEdit'
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
      }],
      fn: [{
        name: 'formatType',
        fn: new Function('row', 'return this.config.urlKey + row.type')
      }, {
        name: 'isShowEdit',
        fn: new Function('return this.$store.state.role == "admin"')
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
