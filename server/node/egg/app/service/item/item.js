const Service = require('egg').Service;

class CommonService extends Service {
  async list(resourceName, pager = {at: 1} , where = {}, orders = []) {

  var listSql = tools.getListSql(....)
            .where()
            .leftJoin()
            .toStirng()}

  async list_abc(resourceName, pager = {at: 1} , where = {}, orders = []) {

}