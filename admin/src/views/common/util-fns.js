export default [{
  name: 'toNumber',
  args: ['model', 'key'],
  body: 'return parseFloat(model[key])'
},{
  name: 'toString',
  args: ['model', 'key'],
  body: 'return model[key] + ""'
}]