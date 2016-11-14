Vue.http.interceptors.push(function(request, next) {
  var data = request.body;
  var url = request.url;
  var notShowError = data.notShowError
  delete data.notShowError
  var timeout;
  if (url.indexOf('xxx') > -1) {
    // 不需要带 Token 的
    next()
  } else {
    getToken(function(token) {
      request.headers['Authorization'] = "token " + token;
      request.headers['Content-Type'] = "application/json";
      request.timeout = setting.httpTimeout || 6000;
      url = url.replace(/^\//, '');

      var sessionid = localStorage.getItem("sessionid");
      if (url != setting.urls.LOGIN) {
        if (sessionid) {
          data.session_id = localStorage.getItem('sessionid');
        } else {
          this.$root.logout();
        }
      }

      next(function(response) {
        if (response.status === 401 || (response.data && response.data.errcode === setting.serverCode.sessionout.code)) {
          setTimeout(function() {
            this.$root.logout();
          }.bind(this));
        } else if (response.data.errcode) {
          if (!notShowError) {
            var errmsg = window.errCodeMap[response.data.errcode] || '未知错误'
            toastr.error(errmsg);
          }
        }
      });
    }.bind(this))
  }

})

// JSON Web Tokens are an open, industry standard RFC 7519 method for representing claims securely between two parties. 
// https://jwt.io/
var getToken = function(successCallback) {
  var token = localStorage.getItem("authInfo");
  if (token) {
    successCallback(JSON.parse(token).token);
  } else {
    var auth = {
      "app_id": 'xxx',
      "app_secret": 'xxx'
    }
    Vue.http.post(oauth2.url, auth, {
      headers: {
        "Content-Type": 'application/x-www-form-urlencoded'
      }
    }).then(function(res) {
      var data = res.data;
      var authInfo = {
        token: data.token,
        time: new Date().getTime()
      }
      localStorage.setItem("authInfo", JSON.stringify(authInfo));
      successCallback(data.token);
    }, function(err) {
      console.error("error occur when getToken " + err);
    })
  }
}
