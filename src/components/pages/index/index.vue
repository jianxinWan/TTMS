<template>
  <div class="all">
    <header>
      <div class="headerLeft">
        <div class="leftLogo">
          <img src="../../../../static/img/ttmsLogo.png" width="auto" height="200%">
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
        <div class="myDoc">
          <div class="userInfoLink">
            <div class="userImg">
              <i class="w-icon-user"></i>
            </div>
            <p v-if="!this.$store.state.user.name">
              <router-link to="/login" tag="a">
                登录
              </router-link>
              <span>/</span>
              <router-link to="/register" tag="a">
                注册
              </router-link>
            </p>
            <p v-else>
              <router-link to="/mydoc" tag="a">
                个人中心
              </router-link>
            </p>
          </div>
        </div>
      </div>
    </header>
    <content>
      <div class="Allcontent-area">
        <router-view></router-view>
      </div>
    </content>
  </div>
</template>
<script>

  export default {
    data () {
      return {
        msg: '',
        logined:false
      }
    },
    computed:{

    },
    mounted:function(){
      this.getLocalStorage();
    },
    methods: {
      isActive:function (e) {
        $(".navLink li").removeClass('navActive');
        let target  =e.currentTarget;
        target.classList.add('navActive');
      },
      getLocalStorage:function(){
        let userStr = localStorage.login;
        if(userStr){
          let userInfo  = JSON.parse(userStr);
          this.$store.commit('setUserStatus',userInfo.status);
          this.$store.commit('setUserName',userInfo.name);
        }
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
    overflow: hidden;
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
    width: 13rem;
    height:100%;
    line-height: 5rem;
  }
  .myDoc{
    width: 200px;
    height:5rem;
  }
  .userInfoLink{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }
  .userInfoLink p{
    margin-left: 0.6rem;
    letter-spacing: 2px;
  }
  .userImg{
    width: 2.5rem;
    height:2.5rem;
    border: 1px solid;
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
  .userImg:hover{
    color:rgba(80,191,255,1);
    cursor: pointer;
  }
  .userImg i{
    font-size: 2.5rem;
    line-height: 2.5rem;
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
</style>
