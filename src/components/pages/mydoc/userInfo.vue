<template>
  <div>我是用户信息界面</div>
</template>
<script>
export default {
  name: 'userInfo',
  data(){
    return {

    }
  },
  mounted:function(){
    this.getUserInfo();
  },
  methods:{
    getUserInfo:function(){
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
      });
    }
  }
}
</script>
<style>
</style>
