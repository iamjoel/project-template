const Service = require('egg').Service
const jwt = require('jwt-simple')
const moment = require('moment')

class MainService extends Service {
  async login(data) {
    const {account, password} = data
    if(!account) {
      return {
        error: '请输入帐号'
      }
    } else if(!password) {
      return {
        error: '请输入帐号'
      }
    }
    // 查询一条
    const userInfo = await this.app.mysql.get('account', {
      account,
      password
    })

    if(!userInfo) {
      return {
        error: '帐号或密码错误'
      }
    } else {// 登录成功
      var expires = moment().add('8','Hour').valueOf() // 过期时间
      var token = jwt.encode({
          account: userInfo.account,
          name:userInfo.name,
          role:userInfo.role,
          exp: expires
      }, this.config.jwtTokenSecret);

      return {
        account: userInfo.account,
        name: userInfo.name,
        role: userInfo.role,
        token: token
      }
    }
  }
}

module.exports = MainService
