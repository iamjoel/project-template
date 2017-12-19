<template>
  <div id="app">
    <el-card class="login">
      <div slot="header" class="clearfix">
        <div class="login__title">登录</div>
      </div>
      <el-form :model="model" :rules="rules" ref="form" label-position="right" label-width="80px">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="model.password" type="password" @keyup.enter.native="login"></el-input>
            <p style="font-size:12px;color: #666">
              超级管理员: admin 密码: 1<br>
              普通用户: user 密码: 1
            </p>
          </el-form-item>
      </el-form>
      <div class="login__btn-wrap">
        <el-button @click="login" type="primary">登录</el-button>
      </div>
    </el-card>
    
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {
    
  },
  data() {
    return {
      model: {
        name: 'admin',
        password: '1',
      },
      rules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    login() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          localStorage.setItem('j-sessionid', Math.random())
          // 仅供测试
          var role = this.model.name === 'admin' ? 'admin' : 'user'
          localStorage.setItem('j-role', role)
          location.href= "index.html"
        } else {
          return false;
        }
      });
      
    }
  },
  mounted() {
    localStorage.clear()
  }
}
</script>
<style src="@/assets/reset.css"></style>
<style src="@/assets/common.css"></style>
<style>
  body {
    padding-top: 100px;
    background: url(./bg.jpg) center top no-repeat #324157;
    background-size: cover;
  }
  .login{
    width: 300px;
    margin: 0 auto;
  }
  .login__title {
    line-height: 36px;
    text-align: center;
  }
  .login__btn-wrap {
    display: flex;
    justify-content: center;
  }
</style>