module.exports = app => {
  if(process.env.NODE_ENV !== 'development'){
    console.log = function(str){
      app.logger.debug(str)
    }
  }
  console.log(process.env.NODE_ENV)
  // app.beforeStart(async () => {
  //   await console.log(app);
  // });
};