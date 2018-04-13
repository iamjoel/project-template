export default [{
  name: 'sysToNumber',
  args: ['model', 'key'],
  body: 'return parseFloat(model[key])'
},{
  name: 'sysToString',
  args: ['model', 'key'],
  body: 'return model[key] + ""'
}]