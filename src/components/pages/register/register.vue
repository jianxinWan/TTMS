<template>
  <div>
    <div class="register-warp">
      <div class="register-banner">
        <div class="register-swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="item in bannerInfoList">
              <img :src="item.imgSrc">
            </div>
          </div>
        </div>
      </div>
      <div class="regist-form-warp">
      <div class="form-center-warp">
        <div class="form-header">
          <img src="http://139.199.104.60/ttms/img/register-header.png" height="100%" width="auto">
        </div>
        <hr/>
        <w-input label="Name" v-model="registInfo.name">
          <i class="w-icon-my" slot="labelIcon"></i>
        </w-input>
        <w-input label="Phone" check="phone" v-model="registInfo.phone">
          <i class="w-icon-mobile" slot="labelIcon"></i>
        </w-input>
        <w-input label="address" v-model="registInfo.address">
          <i class="w-icon-lbs" slot="labelIcon"></i>
        </w-input>
        <w-input label="email" check="email" v-model="registInfo.email">
          <i class="w-icon-plane" slot="labelIcon"></i>
        </w-input>
        <w-input label="pass-1" v-model="registInfo.password1" type="password">
          <i class="w-icon-edit" slot="labelIcon"></i>
        </w-input>
        <w-input label="pass-2" v-model="registInfo.password2" type="password">
          <i class="w-icon-edit" slot="labelIcon"></i>
        </w-input>
        <w-button type="info" @click="singUp">同意以下协议并注册</w-button>
      </div>
    </div>
    </div>
    <ttms-footer></ttms-footer>
  </div>
</template>
<script>
  import Swiper from 'swiper';
  import axios from 'axios';
  export default {
  name: 'register',
    data(){
      return {
        bannerInfoList:[
          {
            id:1,
            imgSrc:"http://139.199.104.60/ttms/img/register.jpg",
            aboutInfo:''
          },
          {
            id:2,
            imgSrc:"http://139.199.104.60/ttms/img/register2.jpg",
            aboutInfo:''
          },
          {
            id:3,
            imgSrc:"http://139.199.104.60/ttms/img/register3.jpg",
            aboutInfo:''
          }
        ],
        registInfo:{
          name:"",
          phone:"",
          address:"",
          email:"",
          password1:"",
          password2:""
        }
      }
    },
    methods:{
      registSwiper:function(){
        let mySwiper = new Swiper('.register-swiper-container', {
          effect : 'coverflow',
          slidesPerView: 3,
          centeredSlides: true,
          coverflowEffect: {
            rotate: 30,
            stretch: 10,
            depth: 60,
            modifier: 2,
            slideShadows : true
          },
          autoplay: true,//可选选项，自动滑动
          loop : true,
          pagination: {
            el: '.swiper-pagination'
          }
        })
      },
      singUp:function(){
        if((this.registInfo.password1===this.registInfo.password2)&&(this.registInfo.password1&&this.registInfo.password2&&this.registInfo.name&&this.registInfo.address&&this.registInfo.email&&this.registInfo.phone)){
          $.ajax({
            type: "POST",
            url: "http://119.27.174.87:8080/ttms2.0/userServlet",
            data: {
              "name":this.registInfo.name,
              "password":this.registInfo.password1,
              "address":this.registInfo.address,
              "email":this.registInfo.email,
              "phoneNumber":this.registInfo.phone,
              "method":"regist"
            },
            xhrFields: {
              withCredentials: true
            },
            crossDomain: true,
            success:function(res){
              let json = JSON.parse(res);
              if(json.fail){
                alert(json.fail);
              }else{
                alert(json.success);
                this.$router.push({path: '/login'});
//                window.location.href="http://localhost:8080/#/login";
              }
            }.bind(this),
            error:function(err){
              alert("错误");
              console.log(err);
            }
          })
        }
        else{
          alert("两次密码不一致或信息不全，请重新书写");
          this.registInfo.password1 = this.registInfo.password2 = "";
        }
      }
    },
    mounted:function(){
      this.registSwiper();
    }
  }
</script>

<style>
.register-warp{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: auto;
  margin-bottom: 120px;
}
.register-banner{
  width:100%;
  height:auto;
  overflow: hidden;
}
.register-banner img{
  width:100%;
  height:auto;
}
.regist-form-warp{
  margin-top: 80px;
  margin-right: 90px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.form-center-warp{
  width: auto;
  height:500px;
  border: 1px solid #ccc;
}
.form-header{
  width: 100%;
  height: 3rem;
}
</style>
