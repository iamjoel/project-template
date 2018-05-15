import axios from 'axios'
import { Toast } from 'vant'

axios.interceptors.request.use(function (config) {
  return new Promise((resolve, reject)=>{
    var openid = localStorage.getItem('j-openid')
    config.headers['openid'] = openid
    return resolve(config);
  })
}, function (error) {
  return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
  var data = response.data
  var config = response.config
  var errorCode = data.errorCode
  if(errorCode) { 
    Toast(data.errorMessage || '未知错误')
    return Promise.reject()
  }
  return response;
}, function (error) {
  return Promise.reject(error);
});
