<template>
  <div class="login">
    <div class="login-logo"><img src="../assets/images/icons/logo_card_red.png" alt="广州银行信用卡中心"></div>
    <div class="login-title"><img src="../assets/images/icons/title_black.png" alt="腾讯简卡管理平台"></div>
    <div class="login-box">
      <div class="login-text"><img src="../assets/images/icons/txt_login.png" alt="登录"> </div>
      <div class="login-form">
        <el-form
          ref="loginForm"
          :model="loginForm"
          :rules="rules"
        >
          <el-form-item prop="userName">
            <el-input
              class="login-input"
              placeholder="请输入用户名"
              v-model="loginForm.userName"></el-input>
          </el-form-item>
          <el-form-item prop="passKey">
            <el-input
            class="login-input"
            placeholder="请输入密码"
            type="password"
            v-model="loginForm.passKey" 
            @keyup.enter.native="onLogin('loginForm')"></el-input>
          </el-form-item>
          <el-form-item class="login-form-btn">
            <el-button
              type="primary"
              class="login-btn"
              :loading="btnLoading"
              @click="onLogin('loginForm')">登&nbsp;录</el-button>
          </el-form-item>
          <!-- <el-row>
            <el-col :span="14"><el-input class="login-input" placeholder="验证码"></el-input></el-col>
            <el-col :span="10" class="sec-code"><img src="../assets/images/1.png" alt=""></el-col>
          </el-row> -->
        </el-form>
      </div>
    </div>
    <div class="copy-right">&copy;2017广州银行信用卡中心</div>
  </div>
</template>

<script>
import { REQUEST_SUCCESS } from '../utils/constant'
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      loginForm: {
        userName: '',
        passKey: ''
      },
      rules: {
        userName: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
        passKey: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
      },
      btnLoading: false
    }
  },
  methods: {
    ...mapActions([
      'fetchLogin'
    ]),
    onLogin (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.handleLoginRequest()
        } else {
          return false
        }
      })
    },

    handleLoginRequest () {
      const { userName, passKey } = this.loginForm

      this.btnLoading = true
      this.fetchLogin({ userName, passKey }).then(res => {
        this.btnLoading = false

        const { code, data } = res
        if ((code + '') === REQUEST_SUCCESS) {
          const { token, user } = data
          const { userName, userId } = user

          if (sessionStorage) {
            sessionStorage.setItem('x-access-token', token)
            sessionStorage.setItem('x-access-name', userName)
            sessionStorage.setItem('x-access-id', userId)
            this.$router.push({ name: 'HOME' })
          }
        }
      }).catch(err => {
        this.btnLoading = false
        throw err
      })
    }
  }
}
</script>

<style lang="scss">
@import '../assets/css/common.scss';

.login {
  background: url('../assets/images/web_login_bg.jpg') no-repeat;
  background-size: cover;
  position: fixed;
  top: 0;
  bottom: 0;
  right:0;
  left: 0;
}

.login-logo {
  position: absolute;
  top: 20px;
  left: 20px;
}

.login-title {
  position: absolute;
  top: 32px;
  left: 280px;
}

.login-title > img {
  height: 26px;
}

.login-logo > img {
  height: 40px;
}

.login-box {
  position: absolute;
  top: 24%;
  left: 50%;
  transform: translateX(-50%);
}

.login-text {
  font-size: 22px;
  color: #FFFAF8;
  margin-bottom: 20px;
  text-align: center;
  font-family: $theme-font-family;
}

.login-text > img {
  height: 28px;
}

.login-form {
  background-color: #fff;
  width: 350px;
  margin: 0 auto;
  padding: 40px 30px;
  box-shadow:0px 0px 15px #676767;
}

.login-input {
  // margin-bottom: 10px;
}

.login-input > input{
  height: 45px;
  border-radius: 0;
}

.sec-code {
  padding-left: 10px;
}

.sec-code img {
  width: 100%;
  height: 45px;
}

.login-form-btn {
  margin: 20px 0 0 0;
}

.login-btn {
  width: 100%;
  height: 45px;
  line-height: 26px;
  border-radius: 0;
}

.copy-right {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  color: #ffffff;
}
</style>
