export default [
  {
    name: 'sysToNumber',
    args: ['model', 'key'],
    body: 'return parseFloat(model[key])'
  },
  {
    name: 'sysToString',
    args: ['model', 'key'],
    body: 'return model[key] + ""'
  },
  {
    name: 'sysToBooleanText',
    args: ['model', 'key'],
    body: 'return model[key] == 0 ? "否" : "是"'
  }
]
