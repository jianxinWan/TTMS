<template>
  <div class="all">
    <header>
      <div class="headerLeft">
        <div class="leftLogo">
          <img src="../../static/img/ttmsLogo.png" width="auto" height="200%">
        </div>
        <div class="navLink">
          <ul>
            <router-link to="/index" tag="a">
              <li @click="isActive" class="navActive">首页</li>
            </router-link>
            <router-link to="/film" tag="a">
              <li @click="isActive">电影</li>
            </router-link>
            <router-link to="theater" tag="a">
              <li @click="isActive">影院</li>
            </router-link>
          </ul>
        </div>
      </div>
      <div class="logOrReg">
        <router-link to="/login" tag="a">
          登录
        </router-link>
        <span>/</span>
        <router-link to="/register" tag="a">
          注册
        </router-link>
      </div>
    </header>
    <content>
      <div class="Allcontent-area">
        <router-view></router-view>
      </div>
    </content>
    <!--<footer>-->
      <!--<div class="footer-content">-->
        <!--<div class="footer-top-info">-->
          <!--<div class="left-logo">-->
            <!--<img src="../../static/img/logoFont.png">-->
            <!--<p>由烫烫烫提供技术支持</p>-->
          <!--</div>-->
        <!--</div>-->
        <!--<div class="footer-bottom-info">-->
        <!--</div>-->
      <!--</div>-->
    <!--</footer>-->
  </div>
</template>
<script>
  export default {
    name: 'HelloWorld',
    data () {
      return {

        msg: 'Welcome to Your Vue.js App'
      }
    },
    computed:{
    },
    methods: {
      showAlert(e){
        let alertType = e.currentTarget.getAttribute("alert");
        switch(alertType){
          case 'info':
            this.$refs.info.show();
            break;
          case 'warning':
            this.$refs.warning.show();
            break;
          case 'comfirm':
            this.$refs.comfirm.show();
            break;
        }
      },
      isActive:function (e) {
        $(".navLink li").removeClass('navActive');
        let target  =e.currentTarget;
        target.classList.add('navActive');
      }
    },
    components: {
      'login': {
        path:"/login/",
        template: '<div>This is the second component!</div>'
      },
      "sign-up": {
        path:"/signUp",
        template: '<div>This is the third component!</div>'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  a{
    color:rgb(128,128,128);
    text-decoration: none;
  }
  a:hover{
    color:rgba(80,191,255,1);
  }
  .all{
    width: 100%;
    height:100%;
  }
  header{
    position: fixed;
    width: 100%;
    height:5rem;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    border-bottom: 1px solid rgb(128,128,128);
    background-color: white;
    z-index:99;
  }
  header .headerLeft{
    width:55rem;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }
  header .leftLogo{
    width: 15rem;
    height:100%;
  }
  header .leftLogo img{
    width: 20rem;
    height:20rem;
    overflow: hidden;
    margin-top: -8rem;
    margin-left: -3rem;
  }
  header .navLink{
    width: 30rem;
    height:100%;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  header .navLink ul{
    width: 100%;
    height:80%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-end;
  }
  .navLink ul li{
    width: 5rem;
    padding:0 0.5rem;
    line-height: 4rem;
    text-align: center;
    list-style: none;
    font-size: 1.2rem;
  }
  .navActive{
    color: rgba(80,191,255,1);
    font-size:1.3rem;
    border-bottom:2px solid rgba(80,191,255,1);
  }
  .navLink ul li:hover{
    border-bottom:2px solid rgba(80,191,255,1);
    color:rgba(80,191,255,1);
    cursor: pointer;
  }
  header .logOrReg{
    width: 10rem;
    height:100%;
    line-height: 5rem;
  }
  content{
    width: 100%;
    height:auto;
  }
  .Allcontent-area{
    width: 100%;
    height:100%;
    padding: 5rem 0;
  }
  footer{
    width: 100%;
    height:12rem;
    background-color: #2b2b2b;
    border-top: 2px solid red;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .footer-content{
    width:1100px;
    height:12rem;
  }
  .footer-top-info{
    width: 100%;
    height:8rem;
    border:1px solid;
  }
  .footer-top-info .left-logo{
    height:100%;
    width: 15rem;
    color:#cccccc;
    text-align: center;
    letter-spacing: 0.2rem;
    font-size: 0.8rem;
  }
  .left-logo img{
    width: 70%;
    height:auto;
    margin: 0 auto;
  }
</style>
