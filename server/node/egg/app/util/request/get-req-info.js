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

    const where = query.where ? JSON.parse(query.where) : undefined;

    const order = query.order ? JSON.parse(query.order) : undefined;

    return {
      resourceName,
      pager,
      where,
      order,
    };

  },
};
