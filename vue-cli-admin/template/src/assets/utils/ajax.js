import axios from 'axios'
// localStorage.setItem('sc-sessionid', Math.random()) // 测试
import {Message} from 'element-ui'
import {ERROR_CODE_MAP, oauth2, urls} from '@/setting'
import router from '@/router'

axios.interceptors.response.use(function (response) {
  var data = response.data
  var config = response.config
  var errcode = data.errcode
  if(errcode == 13) { // session 超时，跳登录页
    router.push('/login')
  } else if(errcode != undefined && errcode != 0) {
    if(!config.notShowError) { // 调用的时候设置的
      var errmsg = ERROR_CODE_MAP[errcode] || data.errmsg
      Message({
        showClose: true,
        message: errmsg,
        type: 'error'
      })
    }
  }
  return response;
}, function (error) {
  return Promise.reject(error);
});

