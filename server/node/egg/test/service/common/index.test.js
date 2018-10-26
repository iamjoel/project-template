const { app, mock, assert } = require('egg-mock/bootstrap');

describe('public API list',() => {
  it('nomal',  async () => {
    const res = await app.httpRequest().get('/publicApi/category/list')
    const body = res.body

    assert(res.status === 200)
    assert(body.errorCode == 0)
    assert(Array.isArray(body.data))
  })
  
  it('search conditon',  async () => {
    var where = `where=${JSON.stringify({
      name: 'tes'
    })}`
    const res = await app.httpRequest().get(`/publicApi/category/list?${where}`)
    const body = res.body

    assert(res.status === 200)
    assert(body.errorCode == 0)
    assert(body.data[0].name === 'tes')
  })


  it('pager',  async () => {
    var pageLimit = 5
    const res = await app.httpRequest().get(`/publicApi/category/list?pageAt=1&pageLimit=${pageLimit}`)
    const body = res.body

    assert(res.status === 200)
    assert(body.errorCode == 0)
    assert(body.data.length === pageLimit)
  })
});
