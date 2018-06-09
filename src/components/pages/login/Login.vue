<template>
  <div class="loginAll">
    <div class="login-left">
      <img src="https://s0.meituan.net/bs/file/?f=fe-sso-fs:build/page/static/banner/maoyan.png">
    </div>
    <div class="login-right">
      <div class="login-form">
        <div class="loginHeader">
          <span><a>账户登录</a></span>
          <span><a>手机验证码登录</a></span>
        </div>
        <hr/>
        <div>
          <w-input label="Name" check="number">
            <i class="w-icon-my" slot="labelIcon"></i>
          </w-input>
          <w-input label="Pass" type="password">
            <i class="w-icon-edit" slot="labelIcon"></i>
          </w-input>
          <w-input label="Email" check="email" v-model="email">
            <i class="w-icon-feedback" slot="labelIcon"></i>
          </w-input>
          <div class="loginBtn">
            <w-button type="info">登录</w-button>
            <router-link to="/register">
              <w-button type="primary">注册</w-button>
            </router-link>
          </div>
          <div class="forgetPass">
            <span><a href="#">忘记密码？</a></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
    export default {
        name: 'login',
    }
</script>
<style lang="less">
  @import "../../../assets/style/login.less";
</style>
