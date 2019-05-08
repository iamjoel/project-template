import axios from 'axios'
import { Message } from 'element-ui'

// 请求加token
// var token = localStorage.getItem('j-token')
// axios.interceptors.request.use(config => {
//   return new Promise((resolve, reject)=>{
//     if(config.url.indexOf('login') === -1) {
//       config.params = config.params || {}
//       config.headers['token'] = token;
//     }
//     return resolve(config);
//   })
// }, function (error) {
//   return Promise.reject(error);
// })

axios.interceptors.response.use(
  response => {
    var data = response.data
    var config = response.config
    var errorCode = data.errorCode
    if (errorCode) {
      if (errorCode == 999) {
        // 登录超时
        location.href = 'login.html'
        return
      }
      // 通用错误处理
      Message({
        message: data.errorMessage || '未知错误',
        type: 'error'
      })
      return Promise.reject()
    }
    return response
  },
  error => {
    let errorMessage
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          errorMessage = '错误请求'
          break
        case 401:
          errorMessage = '未授权，请重新登录'
          break
        case 403:
          errorMessage = '拒绝访问'
          break
        case 404:
          errorMessage = '请求错误,未找到该资源'
          break
        case 405:
          errorMessage = '请求方法未允许'
          break
        case 408:
          errorMessage = '请求超时'
          break
        case 500:
          errorMessage = '服务器端出错'
          break
        case 501:
          errorMessage = '网络未实现'
          break
        case 502:
          errorMessage = '网络错误'
          break
        case 503:
          errorMessage = '服务不可用'
          break
        case 504:
          errorMessage = '网络超时'
          break
        case 505:
          errorMessage = 'http版本不支持该请求'
          break
        default:
          errorMessage = `连接错误${error.response.status}`
      }
    } else {
      errorMessage = '连接到服务器失败'
    }

    Message(errorMessage || '服务器端未知错误')
    return Promise.reject(error)
  }
)
