<template>
  <div class="finishedPay">
    <div class="finish-center-warp">
      <ttms-buybar progress="4"></ttms-buybar>
      <div class="indentList">
        <div class="qrCode">
          <div class="leftCode">
            <img src="http://139.199.104.60/ttms/img/code.png" width="150px" height="150px">
          </div>
          <div class="right-codeNum">
            <h3>请及时通过二维码取票，格瓦拉影城祝您观影愉快！</h3>
            <h2>取票码:2321 4355 6745 3397</h2>
          </div>
        </div>
        <ttms-indent :payIndentInfo="payIndent"></ttms-indent>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'finishPay',
    data(){
      return{
        payIndent:JSON.parse(localStorage.indent)
      }
    },
    mounted:function(){
      this.getIndentAjax();
    },
    methods:{
      getIndentAjax:function(){
        if(this.$store.state.user.name){
          $.ajax({
            type: "GET",
            dataType:"json",
            url: "http://119.27.174.87:8080/ttms2.0/saleServlet",
            data: {
              "method": "showAllSaleItem",
              "name":this.$store.state.user.name
            },
            xhrFields: {
              withCredentials: true
            },
            crossDomain: true,
            success: function (res) {
              console.log(res);
            }.bind(this),
            error: function (err) {
              alert("通信错误");
            },
            traditional:true
          })
        }else{
          alert("用户验证失效，请重新登录");
          this.$router.push({path:'/login'});
        }

      }
    }
  }
</script>
<style>
  .finishedPay{
    width: 100%;
    min-height: 600px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .finish-center-warp{
    width: 1100px;
    min-height: 600px;
    border: 1px solid #ccc;
  }
  .indentList{
    width: 100%;
    min-height: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .qrCode{
    width: 100%;
    height:200px;
    border: 1px solid #ccc;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .right-codeNum{
    margin-left: 80px;
    line-height: 2rem;
    text-align: left;
  }
  .right-codeNum h2{
    color:rgba(80,191,255,1);
  }
</style>
