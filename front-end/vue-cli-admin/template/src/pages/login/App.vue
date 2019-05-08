<template>
  <div id="app">
    <el-card class="login">
      <div slot="header" class="clearfix">
        <div class="login__title">登录</div>
      </div>
      <el-form
        :model="model"
        :rules="rules"
        ref="form"
        label-position="right"
        label-width="80px"
      >
        <el-form-item label="用户名" prop="account">
          <el-input v-model="model.account"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="model.password"
            type="password"
            @keyup.enter.native="login"
          ></el-input>
        </el-form-item>
      </el-form>
      <div class="login__btn-wrap">
        <el-button @click="login" type="primary">登录</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import { urls } from '@/setting'
import * as types from '@/store/mutation-types'

export default {
  name: 'app',
  components: {},
  data () {
    return {
      model: {
        account: null,
        password: null
      },
      rules: {
        account: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    login () {
      this.$refs.form.validate(valid => {
        this.$http.post(urls.login, this.model).then(({ data }) => {
          data = data.data
          localStorage.setItem('j-role', data.role)
          localStorage.setItem('j-token', data.token)
          location.href = 'index.html'
        })
      })
    }
  },
  mounted () {
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
.login {
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
