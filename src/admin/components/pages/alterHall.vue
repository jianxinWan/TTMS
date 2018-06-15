<template>
  <div class="alter-hall-warp">
    <div class="alter-hall-cont">
      <div class="left-seat-alter" v-if="getSeatFlag">
        <ttms-seat :seatLimit="200" :seat-array="getSeatArray" @selectedTicket="selectTicketCallback" ></ttms-seat>
      </div>
      <div class="right-option-info">
        <w-button type="info" @click="alterSeatAjax">确认修改</w-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'alterHall',
  data(){
    return {
      hallId:"",
      getSeatArray:[],
      getSeatFlag:false,
      selectedSeat:[],
      returnSeat:[]
    }
  },
  mounted:function(){
    this.getArrayAjax();
  },
  methods:{
    getArrayAjax:function(){
      $.ajax({
        type: "GET",
        dataType:"json",
        url: "http://119.27.174.87:8080/ttms2.0/seatServlet",
        data:{
          "studioid":this.$route.params.sid,
          "row":this.$route.params.row,
          "col":this.$route.params.col,
          "method":"showAll"
        },
        success:function (res) {
          this.getSeatFlag = true;
          this.getSeatArray = res;
        }.bind(this),
        error: function (err) {
          alert("通信错误");
        }
      });
    },
    selectTicketCallback:function(seatList){
      this.returnSeat = seatList;
    },
    getRoeAndCol:function(){
      this.selectedSeat = [];
      for(let i=0;i<this.returnSeat.length;i++){
        let item  = new Array();
        item[0] = this.returnSeat[i].row+1;
        item[1] = this.returnSeat[i].col+1;
        this.selectedSeat.push(item);
      }
      console.log(this.selectedSeat);
    },
    alterSeatAjax:function(){
      this.getRoeAndCol();
      $.ajax({
        type: "POST",
        dataType:"json",
        url: "http://119.27.174.87:8080/ttms2.0/seatServlet",
        traditional:true,
        data:{
          "studioid":this.$route.params.sid,
          "seatArray":this.selectedSeat,
          "status":"0",
          "method":"modifySeat"
        },
        success:function (res) {
          alert("修改成功");
        }.bind(this),
        error: function (err) {
          alert("通信错误");
        }
      });
    }
  }
}
</script>

<style>
  .alter-hall-warp{
    width: 100%;
    min-height:500px;
    padding: 10px;
  }
  .header-search{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }
  .alter-hall-cont{
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    border: 1px solid #ccc;
  }
  .left-seat-alter{
    margin-left: 50px;
    border-right: 1px solid #ccc;
  }
  .right-option-info{
    width: 100%;
    height:100%;
    padding: 3rem;
  }
</style>
