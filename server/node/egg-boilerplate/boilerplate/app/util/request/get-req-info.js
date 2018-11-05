module.exports = {
  getListInfo(req) {
    const { ctx, service, config } = req;
    const query = ctx.query;

    const resourceName = ctx.request.path.split('/')[2];

    let pager;
    if (query.pageAt) {
      pager = {
        at: ctx.helper.escape(query.pageAt),
        limit: query.pageLimit ? ctx.helper.escape(query.pageLimit) : config.PAGE_LIMIT,
      };
    }

    let where
    let order

    try {
      where = query.where ? JSON.parse(query.where) : undefined;
    } catch(e) {
      throw '搜索条件不是合法的 JSON'
    }

    try {
      order = query.order ? JSON.parse(query.order) : undefined;
    } catch(e) {
      throw '排序不是合法的 JSON'
    }

    return {
      resourceName,
      pager,
      where,
      order,
    };

  },
};
