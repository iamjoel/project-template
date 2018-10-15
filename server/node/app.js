module.exports = app => {
  if(process.env.NODE_ENV !== 'development'){
    console.log = function(str){
      app.logger.info(str)
    }
  }
  
  app.beforeStart(async () => {
    console.log(`Node 环境: ${process.env.NODE_ENV}`)
    await apiCount(app)
    console.log(
    `
    ******************************************************************************
    * service is running now!   ${new Date()} *
    ******************************************************************************
    `)
  });

};

const apiCount = function(app){
  console.log(`API共计${app.router.stack.length}个,内容如下`)
  app.router.stack.forEach(item => {
    console.log(JSON.stringify({
      path:item.path,
      methods:item.methods
    }))
  })
}