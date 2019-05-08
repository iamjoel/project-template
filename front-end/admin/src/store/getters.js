export const dictObj = state => {
  var res = {}
  state.dict.forEach(item => {
    res[item.key] = item.value
  })
  return res
}
