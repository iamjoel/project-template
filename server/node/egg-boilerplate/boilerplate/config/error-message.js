'use strict';
// 1~100系统级错误 200~899业务及错误 900~框架中间件级错误

module.exports = {
  1: {
    message: '没有对应的实体',
  },
  2: {
    message: '未找到关联实体',
  },
  10: {
    message: '输入的账户或密码错误',
  },
  20: {
    message: '获取列表数据失败',
  },
  30: {
    message: '获取详情数据失败',
  },
  31: {
    message: '没有该ID对应的数据',
  },
  32: {
    message: '没有该ID对应的查询语句',
  },
  40: {
    message: '新增数据失败',
  },
  50: {
    message: '编辑数据失败',
  },
  60: {
    message: '删除数据失败',
  },
  70: {
    message: '不支持该后缀的文件上传',
  },
  80: {
    message: '账户名不可以重复',
  },
  81: {
    message: '账户名不可以修改',
  },
  90: {
    message: '上传图片文件失败',
  },
  91: {
    message: '上传音频文件失败',
  },
  92: {
    message: '上传视频文件失败',
  },
  93: {
    message: '上传文件失败',
  },
  94: {
    message: '不支持上传该类型后缀的文件',
  },
  95: {
    message: '云端储存文件失败',
  },
  96: {
    message: '云端储存文件成功，本地保存文件失败',
  },
  100: {
    message: '参数验证错误',
  },
  101: {
    message: '配置特殊SQL缺失',
  },
  110: {
    message: '获取用户信息失败[snsapi_base]',
  },
  111: {
    message: '请关注本公众号',
  },
  112: {
    message: 'OAuth接口错误',
  },
  113: {
    message: '该订单号无法生成支付信息',
  },
  114: {
    message: '获取预支付ID失败',
  },
  115: {
    message: '请输入账号',
  },
  116: {
    message: '请输入密码',
  },
  117: {
    message: '您输入的账号或密码不正确',
  },
  118: {
    message: '该账号已被使用',
  },
  998: {
    message: '没有权限访问该数据',
  },
  999: {
    message: 'token错误，请重新获取token',
  },
};

