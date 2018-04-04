export default {
  'song': {
    list: {
      basic: {
        label: '歌曲',
        entity: 'song'
      },
      cols: [{
        label: '歌曲名称',
        key: 'name'
      },{
        label: '歌手',
        key: 'singer.name',
      },{
        label: '类型',
        key: 'type',
        formatFn: 'formatType'
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
        label: '歌名',
        key: 'name'
      },{
        label: '歌曲类型',
        key: 'type',
        dataType: 'select',
        dataSource: {
          type: 'dict',
          key: 'musicType'
        }
      },{
        label: '歌手',
        key: 'singer',
        dataType: 'select',
        dataSource: {
          type: 'entity',
          key: 'singer'
        }
      }],
      fn: [{
        name: 'formatType',
        args: ['row'],
        body: 'return this.getDictName("musicType", row.type)'
      }]
    },
    detail: {
      cols: [{
        label: '名称',
        key: 'name',
        dataType: 'string',
        formatFn: 'testFormat',
        saveFormatFn: 'testAfterFormat',

      }, {
        label: '歌曲类型',
        key: 'type',
        dataType: 'select',
        dataSource: {
          type: 'dict',
          key: 'musicType'
        }
      },{
        label: '歌手',
        key: 'singer',
        dataType: 'select',
        dataSource: {
          type: 'entity',
          key: 'singer'
        }
      }, {
        label: '图片',
        key: 'img',
        dataType: 'img',
        imgConfig: {
          tip: '建议尺寸 750 * 300'
        }
      }, ],
      fn: [{
        name: 'testFormat',
        args: ['model'],
        body: 'console.log(`before ${model.name}`); return model.name'
      },{
        name: 'testAfterFormat',
        args: ['model'],
        body: 'console.log(`after ${model.name}`); return model.name'
      }]
    }
  },
  'singer': {
    list: {
      basic: {
        label: '歌手',
        entity: 'singer'
      },
      cols: [{
        label: '名称',
        key: 'name'
      }],
      operate: {
        add: {
          isShow: true,
        },
        edit: {
          isShow: true
        },
        detail: {
          isShow: true
        },
        delete: {
          isShow: true
        }
      },
      searchCondition: [{
        label: '名称',
        key: 'name'
      }],
      fn: []
    },
    detail: {}
  }
}
