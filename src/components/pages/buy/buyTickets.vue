<template>
  <div>
    <div class="buy-cont-warp">
      <div class="buy-center-warp">
        <div class="buy-bar-warp">
          <ul class="buy-bar-list">
            <li class="finish-status"><i class="w-icon-favfill"></i>1.选择影片，场次</li>
            <li class="now-status">2.选座，填手机号</li>
            <li class="after-finish-status">3.确认订单，支付</li>
            <li class="after-finish-status">4.支付成功，影院取票观影</li>
          </ul>
        </div>
        <div class="buy-ticket-warp">
          <div class="left-Seat-show">
            <ttms-seat v-if="this.seatFlag" @selectedTicket="selectTicketCallback" :seatArray="seatArray" ></ttms-seat>
          </div>
          <div class="right-info-buy">
            <div class="sessionInfo"></div>
            <p class="filmInfo-p"><h3>影院：格瓦拉影城</h3></p>
            <p class="filmInfo-p"><h3>影厅：{{otherInfo.studio.name}}</h3></p>
            <p><h3>场次:{{otherInfo.startTime.month}}月{{otherInfo.startTime.day}}日</h3></p>
            <div class="slectedSeat">
              <ul v-for="item in selectedTicketList">
                <li>{{item.inFactRow}}排{{item.inFactCol}}列</li>
              </ul>
            </div>
            <div class="priceInfo"></div>
            <div class="bugInfo"></div>
            <div class="submitBtn">
              <w-button type="info">确认信息，下单</w-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ttms-footer></ttms-footer>
  </div>
</template>
<script>
  import axios from 'axios';
  export default {
    name: 'buyTickets',
    data(){
      return{
        seatArray:[],
        selectedTicketList:[],
        seatFlag:false,
        otherInfo:{}
      }
    },
    mounted:function(){
      this.getScheduleInfo();
      console.log(this.$route.params.sid,this.$route.params.pid);
    },
    methods:{
      selectTicketCallback(ticketsList){
        this.selectedTicketList = ticketsList;
      },
      getScheduleInfo:function(){
        let vm = this;
        axios.get("http://119.27.174.87:8080/ttms2.0/scheduleServlet?method=selectScheduleById&sid=3B6E8E7ADDC3475CAE16074C34EE0F63")
          .then(res=> {
            console.log(res.data);
            vm.seatArray = res.data.seatArray;
            vm.seatFlag = true;
            vm.otherInfo = res.data;
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  }
</script>
<style>
  .buy-cont-warp{
    width:100%;
    height:690px;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .buy-center-warp{
    width: 990px;
    margin: 10px 0;
    height:670px;
  }
  .buy-bar-warp{
    width: 100%;
    padding: 0 5px;
    height:3rem;
  }
  .buy-bar-list{
    width: 100%;
    height:100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
  .buy-bar-list li{
    width: 24.8%;
    height:100%;
    text-align: center;
    line-height: 3rem;
  }
  .buy-ticket-warp{
    width: 100%;
    height:610px;
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    border: 1px solid #ccc;
  }
  .right-info-buy{
    width: 310px;
    height: 100%;
    border-left: 1px solid #ccc;
    background-color: rgba(80,191,255,0.1);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
  .sessionInfo{
    width: 100%;
    height:120px;
  }
  .slectedSeat{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  .slectedSeat li{
    height:1rem;
    line-height: 1rem;
    background-color: rgba(80,191,255,1);
    color: white;
    border-radius: 0.3rem;
    margin: 1rem 1rem;
    padding: 0.5rem 0.3rem;
  }
  .left-Seat-show{
    width: 680px;
    height:610px;
  }
  .finish-status {
    color: rgba(80, 191, 255, 1);
    border-bottom: 2px solid rgba(80, 191, 255, 1);
  }
  .now-status{
    color: red;
    border-bottom: 2px solid red;
  }
  .after-finish-status{
    color:#ccc;
    border-bottom: 2px solid #ccc;
  }
</style>
