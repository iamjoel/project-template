module.exports = (app, resourceName, opts = { isJoinTable: false, isMainTable: true }) => {
  let fields = [ 'id' ].concat(require(`@/service/${app.modelMap[resourceName]}`).viewFields);
  if (opts && opts.isJoinTable) {
    fields = fields.map(key => {
      if (opts.isMainTable) {
        return `${resourceName}.${key}`;
      }
      return `${resourceName}.${key} as ${resourceName}__${key}`;

    });
  }

  return fields;
};
