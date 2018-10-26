module.exports = app => {
  app.beforeStart(async () => {
    await require('module-alias/register');
  });
};
