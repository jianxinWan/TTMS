<template>
  <div class="pay-all-warp">
    <div class="pay-cen-warp">
      <ttms-buybar progress="3"></ttms-buybar>
      <div  class="pay-indent" v-if="indentFlag">
        <div class="pay-top-info">
          <h3>请您确认您的订单信息，并请在10分钟内完成付款，如超时系统将自动释放已选座位。</h3>
        </div>
        <ttms-indent :payIndentInfo="payIndent"></ttms-indent>
        <div class="payBtn-warp">
          <w-button type="info" @click="payAjax">确认订单，立即支付</w-button>
        </div>
      </div>
      <div v-else style="display: flex;flex-direction: row;justify-content: center;width: 100%">
        <ttms-loading></ttms-loading>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'pay',
    data(){
      return {
        payIndent:{},
        indentFlag:false
      }
    },
    mounted:function(){
      let indentInfo =JSON.parse(localStorage.indent);
      console.log(indentInfo);
      this.payIndent = indentInfo;
      this.indentFlag = true;
    },
    methods:{
      payAjax:function(){
        $.ajax({
          type: "GET",
          dataType:"json",
          url: "http://119.27.174.87:8080/ttms2.0/saleServlet",
          data: {
            "method": "payment",
            "sid":this.payIndent.sid,
            "totalPrice":this.payIndent.ticketList[0].price * this.payIndent.ticketList.length,
            "isPay":"true"
          },
          xhrFields: {
            withCredentials: true
          },
          crossDomain: true,
          success: function (res) {
            alert("交易成功");
            this.$router.push({path:'/pay/finish'});
          }.bind(this),
          error: function (err) {
            alert("通信错误");
          },
          traditional:true
        })
      }
    }
  }
</script>

<style>
  .pay-all-warp{
    width: 100%;
    height:auto;
    min-height: 600px;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .pay-cen-warp{
    width: 1100px;
    min-height:600px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
  .pay-indent{
    margin-top: 50px;
    width: 100%;
    height:400px;
    border: 1px solid #ccc;
  }
  .pay-top-info{
    width: 100%;
    height:5rem;
    line-height: 5rem;
    background-color: rgba(80,191,255,0.4);
  }
  .payBtn-warp{
    padding: 1rem 3rem;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
</style>
