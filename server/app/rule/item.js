var Tools = require('../util/tools.js');

var base = Tools.generatorRule([
    //name,type,max,required,allowEmpty
    ['name','varchar',40,true,true],
    ['detail','varchar',400,false,true],
    ['img','varchar',1000,false,true],
    ['categoryId','varchar',36,true,true]
]);

module.exports = {
  add: base,
  edit:Object.assign(Tools.generatorRule([['id','varchar',36,true,false]]),base)
};