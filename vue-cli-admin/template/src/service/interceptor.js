import axios from 'axios'
import {Message} from 'element-ui'

// 请求加token
// var token = localStorage.getItem('j-token')
// axios.interceptors.request.use(function (config) {
//   return new Promise((resolve, reject)=>{
//     if(config.url.indexOf('login') === -1) {
//       config.params = config.params || {}
//       config.params['token'] = token;
//     }
//     return resolve(config);
//   })
// }, function (error) {
//   return Promise.reject(error);
// })

axios.interceptors.response.use(function (response) {
  var data = response.data
  var config = response.config
  var errorCode = data.errorCode
  if(errorCode) {
    if(errorCode == 1) {
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
  return response;
}, function (error) {
  return Promise.reject(error);
});

