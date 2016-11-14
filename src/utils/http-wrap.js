import Vue from 'vue'
import toastr from 'toastr'
import setting from 'setting'
import store from 'store'

/*
vue-resource 的api
get(url, [options])
head(url, [options])
delete(url, [options])
jsonp(url, [options])
post(url, [body], [options])
put(url, [body], [options])
patch(url, [body], [options]
*/
export default {
  get(){
    return handler('get', ...arguments)
  },
  head(){
    return handler('head', ...arguments)
  },
  delete(){
    return handler('delete', ...arguments)
  },
  jsonp(){
    return handler('jsonp', ...arguments)
  },
  post(){
    return handler('post', ...arguments)
  },
  put(){
    return handler('put', ...arguments)
  },
  patch(){
    return handler('patch', ...arguments)
  }
}

// 为了减少复杂度，body参数要放在 options，不支持单独的参数
function handler(method, url, options, otherOptions) {
  var sessionid = store.get('sessionid')
  if(!sessionid) {
    location.href = './login.html'
    return
  }
  options.body.sessionid = sessionid
  return new Promise((resolve, reject) => {
    if(['get', 'head', 'delete', 'jsonp', 'post', 'put', 'patch'].indexOf(method) === -1) {
      reject('unsuport methods')
      return
    }
    Vue.http[method](url, options).then(
        response => successHander(resolve, reject, response, otherOptions),
        () => errorHandler(reject)
    )
  })
}

function successHander(resolve, reject, response, otherOptions) {
  otherOptions = Object.assign({}, {showError: true}, otherOptions)
  var body = JSON.parse(response.body)
  resolve(body, response)
  if(body.errorCode && otherOptions.showError) {
    let errMsg = setting.errorCode[body.errorCode] || '未知错误'
    toastr.error(errMsg)
  }
}

function errorHandler(reject) {
  reject()
}