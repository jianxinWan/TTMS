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
        <div class="login-form-warp">
          <w-input label="Name"  v-model="loginInfo.name">
            <i class="w-icon-my" slot="labelIcon"></i>
          </w-input>
          <w-input label="Pass" type="password" v-model="loginInfo.password">
            <i class="w-icon-edit" slot="labelIcon"></i>
          </w-input>
          <div class="loginBtn">
            <w-button type="info" @click="loginAjax">登录</w-button>
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
    data(){
      return {
        loginInfo:{
          name:"origin",
          password:"123456"
        }
      }
    },
    methods:{
      loginAjax:function(){
        $.ajax({
          type: "POST",
          url: "http://119.27.174.87:8080/ttms2.0/userServlet",
          data: {
            "name":this.loginInfo.name,
            "password":this.loginInfo.password,
            "method":"login"
          },
          xhrFields: {
            withCredentials: true
          },
          crossDomain: true,
          success:function(res){
            let json = JSON.parse(res);
            if(json.success){
              let userInfo={};
              userInfo.name =this.loginInfo.name;
              userInfo.status = true;
              let userStr = JSON.stringify(userInfo);
              localStorage.setItem("login", userStr);
              alert("登录成功！");
              this.$store.commit('setUserStatus',true);
              this.$store.commit('setUserName',this.loginInfo.name);
              window.location.href="http://localhost:8080/#/film/";
            }else{
              alert(json.fail);
            }
          }.bind(this),
          error:function(err){
            console.log(err);
          }
        })
      }
    }
  }
</script>
<style lang="less">
  @import "../../../assets/style/login.less";
</style>
