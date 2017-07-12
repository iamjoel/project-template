import axios from 'axios'
// localStorage.setItem('sc-sessionid', Math.random()) // 测试
import {Message} from 'element-ui'
import {ERROR_CODE_MAP, oauth2, urls} from '@/setting'
import router from '@/router'

axios.interceptors.request.use(function (config) {
  return new Promise((resolve, reject)=>{
    var sessionid = localStorage.getItem('sc-sessionid')
    if(config.url.indexOf(urls.getUserInfoByCode) !== -1) {
      getToken(function(token) {
        config.headers['Authorization'] = "token " + token;
        config.headers['Content-Type'] = "application/json";
        return resolve(config);
      })
    } else {
      if(config.method === 'get') {
        config.params = config.params || {}
        config.params.sessionid = sessionid
      } else { // PUT，POST，PATCH
        config.data = config.data || {} 
        config.data.sessionid = sessionid
      }
      // 加登录的 session
      return resolve(config);
    }
  })
}, function (error) {
  return Promise.reject(error);
});

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

var getToken = function(successCallback) {
  var now = new Date().getTime()
  var token = localStorage.getItem("authInfo");
  if (token) {
    token = JSON.parse(token)
    if (!token.expireTime || now > token.expireTime) { // token 过期
      token = false
    }
  }
  if (token) {
    successCallback(token.token);
  } else {
    var auth = {
      "app_id": oauth2.appid,
      "app_secret": oauth2.appsecret
    }
    axios.post(oauth2.url, auth, {
      headers: {
        "Content-Type": 'application/x-www-form-urlencoded'
      }
    }).then(function(res) {
      var data = res.data;
      var authInfo = {
        token: data.token,
        time: new Date().getTime(),
        expireTime: now + (data.expire - 100) * 1000// 过期时间 data.expire 的单位是秒
      }
      localStorage.setItem("authInfo", JSON.stringify(authInfo));
      successCallback(data.token);
    }, function(err) {
      console.error("error occur when getToken " + err);
    })
  }
}

