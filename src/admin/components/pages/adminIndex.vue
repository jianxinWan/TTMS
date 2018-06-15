<template>
  <div class="all">
    <header>
      <div class="headerLeft">
        <div class="leftLogo">
          <img src="../../../../static/img/ttmsLogo.png" width="auto" height="200%">
        </div>
        <div class="navLink">
        </div>
      </div>
      <div class="logOrReg">
        <div class="myDoc">
          <div class="userInfoLink">
            <div class="userImg" v-if="this.$store.state.user.name">
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
              <router-link to="/mydoc/indent" tag="a">
                个人中心
              </router-link>
              <span class="status-distory" @click="destoryStatus">注销</span>
            </p>
          </div>
        </div>
      </div>
    </header>
    <content>
      <div class="Allcontent-area">
        <div class="leftMenu">
          <ul class="funMenu">
            <li class="play">
              <router-link to="/ttms/TTT/admin/plays" tag="div">
                管理剧目
              </router-link>
            </li>
            <li class="hall">
              <router-link to="/ttms/TTT/admin/halls" tag="div">
                管理演出厅
              </router-link>
            </li>
            <li class="plan">
              <router-link to="/ttms/TTT/admin/plans" tag="div">
                管理演出计划
              </router-link>
            </li>
            <li class="order">
              <router-link to="/ttms/TTT/admin/orders" tag="div">
                处理订单
              </router-link>
            </li>
            <li class="collect">
              <router-link to="/ttms/TTT/admin/collect" tag="div">
                剧目汇总
              </router-link>
            </li>
          </ul>
        </div>
        <div class="rightCont">
          <router-view></router-view>
        </div>
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
        $(".funMenu li").removeClass('navActive');
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
      },
      destoryStatus:function(){
        $.ajax({
          type : "GET",
          url : "http://119.27.174.87:8080/ttms2.0/userServlet",
          dataType : "json",
          data : {
            "method" : "destroy"
          },
          xhrFields: {
            withCredentials: true
          },
          crossDomain: true,
          success : function(result) {
            this.$store.commit('setUserStatus',false);
            this.$store.commit('setUserName',"");
            localStorage.removeItem('login');
          }.bind(this),
          error:function () {
            alert("注销错误！");
          }
        })
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
    width: auto;
    padding:0 1rem;
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
  .status-distory{
    color: #878787;
  }
  .status-distory:hover{
    cursor: pointer;
    color: rgba(80,191,255,1);
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
    padding-top: 5rem;
    display: flex;
    flex-direction:row;
    justify-content: flex-start;
  }
  .leftMenu{
    position: fixed;
    width: 300px;
    height:100%;
    border: 1px solid #ccc;
  }
  .funMenu{
    width: 100%;
    height:100%;
  }
  .funMenu li{
    width: 100%;
    height:3rem;
    line-height: 3rem;
    border-bottom: 1px solid #ccc;
  }
  .funMenu li:hover{
    background-color:rgba(80,191,255,1);
    color: white;
    cursor: pointer;
  }
  .rightCont{
    padding: 2rem 2rem;
    text-align: left;
    width: 100%;
    height: 700px;
    margin-left: 300px;
  }
</style>
