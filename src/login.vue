<template>
  <div class="container">
    <h1>登录</h1>
    <div class="col-md-4 col-md-offset-4">
      <form action="" method="POST" class="form-horizontal" role="form">
        <div class="form-group">
          <label for="user">用户名</label>
          <input type="email" class="form-control" id="user" v-model.trim="userName">
        </div>
        <div class="form-group">
          <label for="password">密码</label>
          <input type="password" class="form-control" id="password" v-model.trim="password">
        </div>
      
        <div class="form-group">
          <div class="col-sm-10 col-sm-offset-2">
              <button type="submit" class="btn btn-primary" @click.prevent="login">登录</button>
          </div>
        </div>
        <p>测试帐号(用户名：1，密码：1)</p>
        <div v-show="errMsg" class="text-danger">{{errMsg}}</div>
      </form>
    </div>
    
  </div>
  
</template>

<script>
  export default {
    data() {
      return {
        userName: '',
        password: '',
        errMsg: false
      }
    },
    methods: {
      login() {
        if(!this.userName || !this.password) {
          this.errMsg = '用户名和密码不能为空'
          return
        }
        if(this.userName === '1' && this.password=== '1') {
          location.href = './'
        } else {
          this.errMsg = '错误的用户名或密码'
        }
      }
    }
  }
</script>
<style src="bootstrap/dist/css/bootstrap.min.css"></style>
