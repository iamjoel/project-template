module.exports = {
  getListInfo(req) {
    const { ctx, service, config } = req
    var query = ctx.query
    
    var resourceName = ctx.request.path.split('/')[2]

    var pager
    if(query.pageAt){
      pager = {
        at: ctx.helper.escape(query.pageAt),
        limit: query.pageLimit ? ctx.helper.escape(query.pageLimit) : config.PAGE_LIMIT
      }
    }

    var where = query.where ? JSON.parse(query.where) : undefined

    var order = query.order ? JSON.parse(query.order) : undefined

    return {
      resourceName,
      pager,
      where,
      order,
    }

  }
}