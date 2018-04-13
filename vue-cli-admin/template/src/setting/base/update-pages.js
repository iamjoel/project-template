export default [{
  basic: {
    entity: 'song',
  },
  cols: [{
    label: '名称',
    key: 'name',
    dataType: 'string',
    formatFn: 'testFormat',
    saveFormatFn: 'testAfterFormat',
    validRules: [{ name: 'required', errMsg: '请输入歌曲名称' }],
  }, {
    label: '歌曲类型',
    key: 'type',
    dataType: 'select',
    dataSource: {
      type: 'dict',
      key: 'musicType'
    },
    validRules: [{ name: 'required', errMsg: '请选择歌曲类型' }],
  }, {
    label: '歌手',
    key: 'singerId',
    dataType: 'select',
    formatFn: 'sysToString',
    dataSource: {
      type: 'entity',
      key: 'singer'
    },
    validRules: [{ name: 'required', errMsg: '请选择歌手' }],
  }, {
    label: '创作时间',
    key: 'time',
    dataType: 'date',
  }, {
    label: '图片',
    key: 'img',
    dataType: 'img',
    imgConfig: {
      tip: '建议尺寸 750 * 300'
    }
  }, {
    label: '排序值',
    key: 'sort',
    dataType: 'number',
    validRules: [{ name: 'required', errMsg: '请输入排序值' }],
  }, {
    label: '是否原创歌曲',
    key: 'isOriginal',
    dataType: 'bool',
  }, {
    label: '描述',
    key: 'describe',
    dataType: 'strings',
  }, ],
  fn: [{
    name: 'testFormat',
    args: ['model'],
    body: 'console.log(`before ${model.name}`); return model.name'
  }, {
    name: 'testAfterFormat',
    args: ['model'],
    body: 'console.log(`after ${model.name}`); return model.name'
  }]
}, {
  basic: {
    entity: 'singer',
  },
  cols: [{
    label: '名称',
    key: 'name',
    dataType: 'string',
  },]
}]
