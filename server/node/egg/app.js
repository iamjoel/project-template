module.exports = app => {
  app.beforeStart(async () => {
      await require('module-alias/register')
      console.log('before module register')
  });
}